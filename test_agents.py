"""
Test script to verify the multi-agent system works correctly
"""

import os
from dotenv import load_dotenv
from agents import PlannerAgent, ExecutorAgent
import pandas as pd

# Load environment variables
load_dotenv()

def test_agents():
    """Test the multi-agent system with a sample dataset"""
    
    print("🧪 Testing Multi-Agent System\n")
    
    # Check API key
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("❌ ERROR: GEMINI_API_KEY not found in .env file")
        return
    
    print("✅ API Key loaded")
    
    # Create sample data
    print("\n📊 Creating sample dataset...")
    df = pd.DataFrame({
        'Product': ['A', 'B', 'C', 'D', 'E'],
        'Sales': [1000, 1500, 800, 2000, 1200],
        'Profit': [200, 300, -50, 400, 150],
        'Region': ['North', 'South', 'North', 'East', 'West']
    })
    print(df)
    
    # Initialize agents
    print("\n🤖 Initializing agents...")
    planner = PlannerAgent(api_key=api_key)
    executor = ExecutorAgent(api_key=api_key)
    executor.load_data(df)
    print("✅ Agents initialized")
    
    # Test query
    test_query = "What is the total sales by region?"
    print(f"\n❓ Test Query: {test_query}")
    
    # Step 1: Planner creates plan
    print("\n🧠 Planner Agent creating execution plan...")
    data_schema = {col: str(dtype) for col, dtype in df.dtypes.items()}
    plan = planner.create_plan(test_query, data_schema)
    
    if plan.get('status') == 'error':
        print(f"❌ Planning failed: {plan.get('error_message', 'Unknown error')}")
        return
    
    print("✅ Plan created:")
    print(f"   Analysis: {plan.get('question_analysis', 'N/A')}")
    print(f"   Steps: {len(plan.get('steps', []))} steps")
    print(f"   Visualization needed: {plan.get('requires_visualization', False)}")
    
    # Step 2: Executor executes plan
    print("\n⚡ Executor Agent executing plan...")
    result = executor.execute_plan(plan, test_query)
    
    if result.get('status') == 'error':
        print(f"❌ Execution failed: {result.get('error', 'Unknown error')}")
        return
    
    print("✅ Execution successful:")
    print(f"   Result: {result.get('result', 'N/A')}")
    print(f"   Has visualization: {result.get('visualization') is not None}")
    
    print("\n🎉 Multi-Agent System Test Complete!")

if __name__ == "__main__":
    test_agents()
