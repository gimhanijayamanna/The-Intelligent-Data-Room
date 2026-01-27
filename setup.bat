@echo off
echo.
echo ================================================================================
echo                     INTELLIGENT DATA ROOM
echo                  Complete Setup and Verification
echo ================================================================================
echo.

REM Check Python
echo [1/5] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)
python --version
echo.

REM Check Node.js
echo [2/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)
node --version
npm --version
echo.

REM Setup Backend
echo [3/5] Setting up Python backend...
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)

echo Activating virtual environment...
call .venv\Scripts\activate

echo Installing Python dependencies...
pip install -q -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Failed to install Python dependencies
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

REM Check .env
echo [4/5] Checking environment configuration...
if not exist ".env" (
    echo [WARNING] .env file not found!
    echo Creating .env from template...
    copy .env.example .env >nul
    echo.
    echo *** IMPORTANT ***
    echo Please edit .env file and add your GEMINI_API_KEY
    echo Get your API key from: https://makersuite.google.com/app/apikey
    echo.
    notepad .env
) else (
    echo .env file found
)
echo.

REM Setup Frontend
echo [5/5] Setting up React frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies (this may take a few minutes)...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies
        cd ..
        pause
        exit /b 1
    )
    echo Frontend dependencies installed successfully!
) else (
    echo Frontend dependencies already installed
)

if not exist ".env" (
    echo Creating frontend .env file...
    copy .env.example .env >nul
)

cd ..
echo.

REM Verify Setup
echo ================================================================================
echo Running setup verification...
echo ================================================================================
python verify_setup.py
echo.

REM Instructions
echo ================================================================================
echo                         SETUP COMPLETE!
echo ================================================================================
echo.
echo To start the application, you need TWO terminal windows:
echo.
echo Terminal 1 - Backend:
echo   start_backend.bat
echo   (or manually: python backend\app.py)
echo.
echo Terminal 2 - Frontend:
echo   start_frontend.bat
echo   (or manually: cd frontend ^&^& npm start)
echo.
echo The application will open at: http://localhost:3000
echo Backend API runs at: http://localhost:5000
echo.
echo ================================================================================
echo Next Steps:
echo   1. Make sure your GEMINI_API_KEY is set in .env
echo   2. Run start_backend.bat in one terminal
echo   3. Run start_frontend.bat in another terminal
echo   4. Upload a CSV file and start chatting!
echo.
echo Sample dataset: https://drive.google.com/file/d/1na63aBcSPm2q3-t1TxUlO9lMKElmr_YY/view
echo.
echo For help, see:
echo   - README.md (comprehensive guide)
echo   - QUICKSTART.md (fast setup)
echo   - CHECKLIST.md (testing guide)
echo ================================================================================
echo.
pause
