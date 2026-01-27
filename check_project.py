"""
Project Status Check - Verify all files are in place
"""

import os

def check_structure():
    """Check if all required files and folders exist"""
    
    required_structure = {
        'Root Files': [
            'README.md',
            'QUICKSTART.md',
            'DEPLOYMENT.md',
            'PROJECT_SUMMARY.md',
            'VIDEO_SCRIPT.md',
            'CHECKLIST.md',
            'START_HERE.md',
            'requirements.txt',
            '.env',
            '.env.example',
            '.gitignore',
            'Procfile',
            'runtime.txt',
            'test_agents.py',
            'verify_setup.py',
            'run_backend.py',
            'start_backend.bat',
            'start_frontend.bat',
            'setup.bat'
        ],
        'agents/': [
            '__init__.py',
            'planner_agent.py',
            'executor_agent.py'
        ],
        'backend/': [
            '__init__.py',
            'app.py'
        ],
        'utils/': [
            '__init__.py',
            'context_manager.py',
            'data_manager.py'
        ],
        'frontend/': [
            'package.json',
            'tsconfig.json',
            '.env',
            '.env.example'
        ],
        'frontend/public/': [
            'index.html'
        ],
        'frontend/src/': [
            'App.tsx',
            'App.css',
            'index.tsx',
            'index.css'
        ],
        'frontend/src/components/': [
            'FileUpload.tsx',
            'ChatInterface.tsx',
            'DataInfoPanel.tsx',
            'Visualization.tsx',
            'ResultDisplay.tsx'
        ],
        'frontend/src/services/': [
            'api.ts'
        ],
        'frontend/src/types/': [
            'index.ts'
        ],
        'frontend/src/styles/': [
            'FileUpload.css',
            'ChatInterface.css',
            'DataInfoPanel.css',
            'Visualization.css',
            'ResultDisplay.css'
        ]
    }
    
    print("=" * 70)
    print("PROJECT STRUCTURE VERIFICATION")
    print("=" * 70)
    print()
    
    all_good = True
    total_files = 0
    found_files = 0
    
    for folder, files in required_structure.items():
        print(f"📁 {folder}")
        for file in files:
            total_files += 1
            filepath = os.path.join(folder, file) if folder != 'Root Files' else file
            exists = os.path.exists(filepath)
            
            if exists:
                print(f"  ✅ {file}")
                found_files += 1
            else:
                print(f"  ❌ {file} (MISSING)")
                all_good = False
        print()
    
    print("=" * 70)
    print(f"Status: {found_files}/{total_files} files found")
    
    if all_good:
        print("✅ PROJECT STRUCTURE COMPLETE!")
        print()
        print("Next steps:")
        print("  1. Set your GEMINI_API_KEY in .env file")
        print("  2. Run: pip install -r requirements.txt")
        print("  3. Run: cd frontend && npm install")
        print("  4. Start backend: python backend/app.py")
        print("  5. Start frontend: cd frontend && npm start")
    else:
        print("⚠️  Some files are missing. Please check above.")
    
    print("=" * 70)

if __name__ == "__main__":
    check_structure()
