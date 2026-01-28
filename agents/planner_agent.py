"""
Agent 1: The Planner
Analyzes user questions and data schema to create step-by-step execution plans.
"""

from google import genai
from google.genai import types
from typing import Dict, List, Optional
import json


class PlannerAgent:
    """
    The Planner Agent analyzes user questions and creates execution plans.
    It understands the data schema and breaks down complex questions into actionable steps.
    """
    
    def __init__(self, api_key: str):
        """
        Initialize the Planner Agent with Google Gemini API.
        
        Args:
            api_key: Google Gemini API key
        """
        self.client = genai.Client(api_key=api_key)
        self.model_name = 'gemini-flash-latest'
        
    def create_plan(
        self, 
        user_question: str, 
        data_schema: Dict, 
        conversation_history: Optional[List[Dict]] = None
    ) -> Dict:
        """
        Analyze the user's question and create an execution plan.
        
        Args:
            user_question: The user's natural language question
            data_schema: Schema information about the uploaded dataset
            conversation_history: Previous conversation context
            
        Returns:
            Dict containing the execution plan with steps and reasoning
        """
        
        # Build context from conversation history
        context = ""
        if conversation_history:
            for msg in conversation_history[-2:]:
                context += f"{msg['role']}: {msg['content'][:60]}\n"
        
        # Create the planning prompt
        prompt = f"""Analyze user question and create execution plan.

{context}Data Schema: {json.dumps(data_schema)}
Question: {user_question}

Return JSON only:
{{
    "question_analysis": "what user wants",
    "requires_visualization": true/false,
    "visualization_type": "bar/line/pie/scatter/none",
    "steps": ["step 1", "step 2"],
    "data_operations": ["operation"],
    "expected_output": "output description",
    "reasoning": "why this plan"
}}"""

        try:
            # Generate the plan using Gemini
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt
            )
            plan_text = response.text.strip()
            
            # Extract JSON from potential markdown code blocks
            if "```json" in plan_text:
                plan_text = plan_text.split("```json")[1].split("```")[0].strip()
            elif "```" in plan_text:
                plan_text = plan_text.split("```")[1].split("```")[0].strip()
            
            # Parse the JSON response
            plan = json.loads(plan_text)
            
            # Validate the plan structure
            required_keys = [
                "question_analysis", 
                "requires_visualization", 
                "steps", 
                "expected_output"
            ]
            
            if not all(key in plan for key in required_keys):
                raise ValueError("Plan missing required keys")
            
            # Add metadata
            plan["status"] = "success"
            plan["original_question"] = user_question
            
            return plan
            
        except json.JSONDecodeError as e:
            # Fallback plan if JSON parsing fails
            return {
                "status": "error",
                "error_type": "json_parsing",
                "question_analysis": "Unable to parse plan",
                "requires_visualization": False,
                "visualization_type": "none",
                "steps": [
                    "Analyze the data",
                    "Extract relevant information",
                    "Format the result"
                ],
                "data_operations": ["basic query"],
                "expected_output": "Data analysis result",
                "reasoning": f"Fallback plan due to parsing error: {str(e)}",
                "original_question": user_question,
                "raw_response": response.text if 'response' in locals() else ""
            }
        
        except Exception as e:
            return {
                "status": "error",
                "error_type": "general",
                "error_message": str(e),
                "question_analysis": "Error creating plan",
                "requires_visualization": False,
                "steps": [],
                "expected_output": "Error occurred",
                "original_question": user_question
            }
    
    def refine_plan(self, original_plan: Dict, execution_result: Dict) -> Dict:
        """
        Refine the plan based on execution results (optional for advanced scenarios).
        
        Args:
            original_plan: The original execution plan
            execution_result: Results from the executor
            
        Returns:
            Refined plan if needed, or original plan
        """
        # For now, return original plan
        # This can be extended for iterative refinement
        return original_plan
