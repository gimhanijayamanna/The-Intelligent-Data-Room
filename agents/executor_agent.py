"""
Agent 2: The Executor
Executes the plan using PandasAI and generates code/results.
"""

import pandas as pd
from google import genai
from google.genai import types
from typing import Dict, Optional, Any
import json
import re
import io
import sys
import traceback


class ExecutorAgent:
    """
    The Executor Agent takes a plan and executes it using PandasAI and Gemini.
    It generates Python code, executes it safely, and returns results.
    """
    
    def __init__(self, api_key: str):
        """
        Initialize the Executor Agent with Google Gemini API.
        
        Args:
            api_key: Google Gemini API key
        """
        self.client = genai.Client(api_key=api_key)
        self.model_name = 'gemini-flash-latest'
        self.current_df: Optional[pd.DataFrame] = None
        
    def load_data(self, dataframe: pd.DataFrame):
        """
        Load the dataframe for execution.
        
        Args:
            dataframe: Pandas DataFrame to work with
        """
        self.current_df = dataframe.copy()
        
    def execute_plan(self, plan: Dict, user_question: str) -> Dict:
        """
        Execute the plan created by the Planner Agent.
        
        Args:
            plan: Execution plan from Planner Agent
            user_question: Original user question
            
        Returns:
            Dict containing execution results, code, and any visualizations
        """
        
        if self.current_df is None:
            return {
                "status": "error",
                "error": "No data loaded. Please upload a CSV file first."
            }
        
        # Get data info for context
        data_info = self._get_data_info()
        
        # Build the execution prompt
        prompt = f"""You are an expert Python data analyst. You need to write code to answer a user's question about a dataset.

Plan from Planner Agent:
{json.dumps(plan, indent=2)}

Original Question: {user_question}

Dataset Information:
{data_info}

Dataset Preview (first 5 rows):
{self.current_df.head().to_string()}

Your task is to write Python code that:
1. Follows the execution plan
2. Uses pandas to analyze the data (the dataframe is available as 'df')
3. Returns the result in a structured format
4. If visualization is needed, generate Plotly chart configuration

CRITICAL CODE REQUIREMENTS:
- The dataframe is already loaded as 'df'
- DO NOT use any indentation before import statements
- Use proper Python indentation (4 spaces)
- Keep all code at the base indentation level (no leading spaces on first line)
- For visualizations, use plotly.express or plotly.graph_objects
- Handle errors gracefully

Respond with valid JSON in this format:
{{
    "code": "Python code as a string with proper indentation",
    "explanation": "What the code does",
    "returns_visualization": true/false
}}

The code should assign the final result to a variable called 'result'.
If creating a visualization, assign the plotly figure to a variable called 'fig'.

Example code structure that MUST start at column 0:
```python
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Your analysis code here
result = ...  # The answer to the question

# If visualization needed:
# fig = px.bar(...)  # or other plotly chart
```

Respond ONLY with valid JSON, nothing else."""

        try:
            # Generate the code using Gemini
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt
            )
            response_text = response.text.strip()
            
            # Extract JSON from potential markdown code blocks
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0].strip()
            
            # Parse the JSON response
            code_response = json.loads(response_text)
            generated_code = code_response.get("code", "")
            explanation = code_response.get("explanation", "")
            returns_viz = code_response.get("returns_visualization", False)
            
            # Clean the code (remove markdown code blocks if present)
            generated_code = self._clean_code(generated_code)
            
            # Execute the generated code
            execution_result = self._execute_code(generated_code)
            
            if execution_result["status"] == "success":
                return {
                    "status": "success",
                    "result": execution_result["result"],
                    "visualization": execution_result.get("visualization"),
                    "code": generated_code,
                    "explanation": explanation,
                    "plan_used": plan
                }
            else:
                return {
                    "status": "error",
                    "error": execution_result.get("error", "Execution failed"),
                    "code": generated_code,
                    "explanation": explanation
                }
                
        except json.JSONDecodeError as e:
            return {
                "status": "error",
                "error": f"Failed to parse code response: {str(e)}",
                "raw_response": response_text if 'response_text' in locals() else ""
            }
        
        except Exception as e:
            return {
                "status": "error",
                "error": f"Execution error: {str(e)}",
                "traceback": traceback.format_exc()
            }
    
    def _clean_code(self, code: str) -> str:
        """
        Clean the generated code by removing markdown formatting.
        
        Args:
            code: Raw code string
            
        Returns:
            Cleaned code string
        """
        # Remove markdown code blocks
        if "```python" in code:
            code = code.split("```python")[1].split("```")[0].strip()
        elif "```" in code:
            code = code.split("```")[1].split("```")[0].strip()
        
        # Remove any leading/trailing whitespace from each line but preserve structure
        lines = code.split('\n')
        cleaned_lines = []
        for line in lines:
            # Keep the line as is, just remove trailing whitespace
            cleaned_lines.append(line.rstrip())
        
        code = '\n'.join(cleaned_lines)
        
        return code
    
    def _execute_code(self, code: str) -> Dict:
        """
        Safely execute the generated Python code.
        
        Args:
            code: Python code to execute
            
        Returns:
            Dict with execution results
        """
        try:
            # Create a namespace with necessary imports and the dataframe
            namespace = {
                'df': self.current_df.copy(),
                'pd': pd,
                'result': None,
                'fig': None
            }
            
            # Try to compile first to catch syntax errors early
            try:
                compile(code, '<string>', 'exec')
            except SyntaxError as se:
                return {
                    "status": "error",
                    "error": f"Syntax error in generated code: {str(se)}",
                    "traceback": traceback.format_exc(),
                    "code": code
                }
            
            # Execute the code
            exec(code, namespace)
            
            # Extract results
            result = namespace.get('result')
            fig = namespace.get('fig')
            
            # Convert result to JSON-serializable format
            if isinstance(result, pd.DataFrame):
                result = result.to_dict('records')
            elif isinstance(result, pd.Series):
                result = result.to_dict()
            elif hasattr(result, 'to_dict'):
                result = result.to_dict()
            
            # Convert plotly figure to JSON if present
            visualization = None
            if fig is not None:
                try:
                    visualization = fig.to_json()
                except:
                    visualization = None
            
            return {
                "status": "success",
                "result": result,
                "visualization": visualization
            }
            
        except Exception as e:
            return {
                "status": "error",
                "error": str(e),
                "traceback": traceback.format_exc()
            }
    
    def _get_data_info(self) -> str:
        """
        Get information about the current dataframe.
        
        Returns:
            String description of the dataframe
        """
        if self.current_df is None:
            return "No data loaded"
        
        info = []
        info.append(f"Shape: {self.current_df.shape[0]} rows, {self.current_df.shape[1]} columns")
        info.append(f"Columns: {', '.join(self.current_df.columns.tolist())}")
        info.append("\nColumn Types:")
        for col, dtype in self.current_df.dtypes.items():
            info.append(f"  - {col}: {dtype}")
        
        return "\n".join(info)
