"""
Flask Backend API for Intelligent Data Room
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import traceback

from agents import PlannerAgent, ExecutorAgent
from utils import ContextManager, DataManager

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'

# Get API key from environment
GEMINI_API_KEY = os.getenv('AIzaSyB6HQUM_w1LoVLjcZ3AzGsZByXUi_W4-LU')

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment variables!")

# Initialize managers and agents
data_manager = DataManager(upload_folder=app.config['UPLOAD_FOLDER'])
context_manager = ContextManager(max_history=5)
planner_agent = PlannerAgent(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None
executor_agent = ExecutorAgent(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    """
    return jsonify({
        "status": "healthy",
        "api_key_configured": GEMINI_API_KEY is not None
    })


@app.route('/api/upload', methods=['POST'])
def upload_file():
    """
    Handle file upload (CSV/XLSX).
    """
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({
                "success": False,
                "error": "No file provided"
            }), 400
        
        file = request.files['file']
        
        # Check if file has a name
        if file.filename == '':
            return jsonify({
                "success": False,
                "error": "No file selected"
            }), 400
        
        # Load the file
        success, message, data_info = data_manager.load_file(file, file.filename)
        
        if success:
            # Load data into executor agent
            if executor_agent:
                executor_agent.load_data(data_manager.get_dataframe())
            
            # Clear conversation history on new upload
            context_manager.clear()
            
            return jsonify({
                "success": True,
                "message": message,
                "data_info": data_info
            })
        else:
            return jsonify({
                "success": False,
                "error": message
            }), 400
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Upload failed: {str(e)}",
            "traceback": traceback.format_exc()
        }), 500


@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handle chat messages and execute multi-agent workflow.
    """
    try:
        # Check if data is loaded
        if data_manager.get_dataframe() is None:
            return jsonify({
                "success": False,
                "error": "Please upload a dataset first"
            }), 400
        
        # Check if agents are initialized
        if not planner_agent or not executor_agent:
            return jsonify({
                "success": False,
                "error": "API key not configured. Please set GEMINI_API_KEY environment variable."
            }), 500
        
        # Get user message
        data = request.json
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                "success": False,
                "error": "Empty message"
            }), 400
        
        # Add user message to context
        context_manager.add_message("user", user_message)
        
        # Step 1: Planner Agent creates execution plan
        data_schema = data_manager.get_schema()
        conversation_history = context_manager.get_history()
        
        plan = planner_agent.create_plan(
            user_question=user_message,
            data_schema=data_schema,
            conversation_history=conversation_history
        )
        
        # Check if planning succeeded
        if plan.get("status") == "error":
            return jsonify({
                "success": False,
                "error": "Planning failed",
                "plan": plan
            }), 500
        
        # Step 2: Executor Agent executes the plan
        execution_result = executor_agent.execute_plan(plan, user_message)
        
        # Check if execution succeeded
        if execution_result.get("status") == "error":
            response_message = f"I encountered an error: {execution_result.get('error', 'Unknown error')}"
            context_manager.add_message("assistant", response_message, {
                "error": True,
                "plan": plan,
                "execution_result": execution_result
            })
            
            return jsonify({
                "success": False,
                "error": execution_result.get("error"),
                "message": response_message,
                "plan": plan,
                "code": execution_result.get("code")
            }), 500
        
        # Format the response
        result = execution_result.get("result")
        visualization = execution_result.get("visualization")
        explanation = execution_result.get("explanation", "")
        
        # Create response message
        response_message = explanation
        
        # Add assistant message to context
        context_manager.add_message("assistant", response_message, {
            "has_visualization": visualization is not None,
            "plan": plan
        })
        
        return jsonify({
            "success": True,
            "message": response_message,
            "result": result,
            "visualization": visualization,
            "plan": plan,
            "code": execution_result.get("code"),
            "conversation_history": context_manager.get_history()
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Chat failed: {str(e)}",
            "traceback": traceback.format_exc()
        }), 500


@app.route('/api/data-info', methods=['GET'])
def get_data_info():
    """
    Get information about the currently loaded dataset.
    """
    try:
        data_info = data_manager.get_data_info()
        
        if data_info:
            return jsonify({
                "success": True,
                "data_info": data_info
            })
        else:
            return jsonify({
                "success": False,
                "error": "No data loaded"
            }), 404
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/history', methods=['GET'])
def get_history():
    """
    Get conversation history.
    """
    try:
        return jsonify({
            "success": True,
            "history": context_manager.get_history()
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/clear', methods=['POST'])
def clear_session():
    """
    Clear the current session (data and conversation history).
    """
    try:
        data_manager.clear_data()
        context_manager.clear()
        
        return jsonify({
            "success": True,
            "message": "Session cleared"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == '__main__':
    # Create uploads folder if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Run the app
    app.run(debug=True, host='0.0.0.0', port=5000)
