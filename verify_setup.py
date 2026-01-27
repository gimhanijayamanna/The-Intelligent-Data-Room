"""
Setup Verification Script
Checks if everything is properly configured
"""

import os
import sys

def check_python_version():
    """Check Python version"""
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"✅ Python version: {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print(f"❌ Python version: {version.major}.{version.minor}.{version.micro} (Need 3.8+)")
        return False

def check_dependencies():
    """Check if required packages are installed"""
    required = [
        'flask',
        'flask_cors',
        'pandas',
        'openpyxl',
        'google.generativeai',
        'dotenv',
        'plotly',
        'werkzeug'
    ]
    
    missing = []
    for package in required:
        try:
            __import__(package.replace('-', '_'))
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} (missing)")
            missing.append(package)
    
    return len(missing) == 0

def check_env_file():
    """Check if .env file exists and has API key"""
    if not os.path.exists('.env'):
        print("❌ .env file not found")
        print("   Create .env from .env.example and add your GEMINI_API_KEY")
        return False
    
    with open('.env', 'r') as f:
        content = f.read()
        if 'GEMINI_API_KEY' in content and 'your_gemini_api_key_here' not in content:
            print("✅ .env file exists with API key")
            return True
        else:
            print("⚠️  .env exists but GEMINI_API_KEY may not be set")
            return False

def check_folders():
    """Check if required folders exist"""
    folders = [
        'agents',
        'backend',
        'utils',
        'frontend',
        'frontend/src',
        'frontend/public'
    ]
    
    all_exist = True
    for folder in folders:
        if os.path.exists(folder):
            print(f"✅ {folder}/")
        else:
            print(f"❌ {folder}/ (missing)")
            all_exist = False
    
    return all_exist

def check_frontend():
    """Check if frontend is set up"""
    if not os.path.exists('frontend/package.json'):
        print("❌ frontend/package.json not found")
        return False
    
    if os.path.exists('frontend/node_modules'):
        print("✅ Frontend dependencies installed")
        return True
    else:
        print("⚠️  Frontend dependencies not installed (run: cd frontend && npm install)")
        return False

def main():
    print("=" * 60)
    print("  Intelligent Data Room - Setup Verification")
    print("=" * 60)
    print()
    
    print("📌 Checking Python version...")
    py_ok = check_python_version()
    print()
    
    print("📦 Checking Python dependencies...")
    deps_ok = check_dependencies()
    print()
    
    print("🔑 Checking environment configuration...")
    env_ok = check_env_file()
    print()
    
    print("📁 Checking folder structure...")
    folders_ok = check_folders()
    print()
    
    print("⚛️  Checking frontend setup...")
    frontend_ok = check_frontend()
    print()
    
    print("=" * 60)
    if all([py_ok, deps_ok, folders_ok]):
        print("✅ Backend is ready to run!")
        print()
        print("To start the backend:")
        print("  python backend/app.py")
        print()
        if frontend_ok:
            print("✅ Frontend is ready to run!")
            print()
            print("To start the frontend:")
            print("  cd frontend")
            print("  npm start")
        else:
            print("⚠️  Frontend needs setup:")
            print("  cd frontend")
            print("  npm install")
        
        if not env_ok:
            print()
            print("⚠️  Don't forget to set your GEMINI_API_KEY in .env!")
    else:
        print("❌ Setup incomplete. Please fix the issues above.")
        print()
        if not deps_ok:
            print("To install Python dependencies:")
            print("  pip install -r requirements.txt")
    
    print("=" * 60)

if __name__ == "__main__":
    main()
