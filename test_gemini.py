"""Quick test of Gemini API"""
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
print(f"API Key loaded: {api_key[:20]}..." if api_key else "No API key found")

try:
    client = genai.Client(api_key=api_key)
    
    # List available models
    print("\nAvailable models:")
    models = client.models.list()
    for model in models:
        if 'gemini' in model.name.lower():
            print(f"  - {model.name}")
    
    # Test with correct model
    response = client.models.generate_content(
        model='gemini-flash-latest',
        contents="Say hello in 3 words"
    )
    print(f"\nSuccess! Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
