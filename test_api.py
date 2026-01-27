from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')

print(f"API Key loaded: {api_key[:10]}...")

try:
    client = genai.Client(api_key=api_key)
    print("Client created successfully\n")
    
    print("Listing available models:")
    models = client.models.list()
    for model in models:
        print(f"  - {model.name}")
    
except Exception as e:
    print(f"Error: {type(e).__name__}: {str(e)}")
