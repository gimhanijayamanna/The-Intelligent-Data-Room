@echo off
echo ========================================
echo   Intelligent Data Room - Frontend
echo ========================================
echo.

REM Navigate to frontend directory
cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo.
)

REM Start the frontend
echo Starting React frontend...
echo Frontend will run on http://localhost:3000
echo.
npm start
