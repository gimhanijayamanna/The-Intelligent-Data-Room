# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to project directory
cd d:\LLM

# Create virtual environment
python -m venv .venv

# Activate virtual environment
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file and add your API key
copy .env.example .env
# Edit .env file and replace 'your_gemini_api_key_here' with your actual API key
```

### Step 2: Frontend Setup (2 minutes)

```bash
# Open a new terminal
cd d:\LLM\frontend

# Install dependencies
npm install
```

### Step 3: Run the Application (1 minute)

**Terminal 1 - Backend:**
```bash
cd d:\LLM
.venv\Scripts\activate
python backend/app.py
```

**Terminal 2 - Frontend:**
```bash
cd d:\LLM\frontend
npm start
```

### Step 4: Test It!

1. Open browser at `http://localhost:3000`
2. Upload a CSV file (use sample dataset or your own)
3. Ask questions like:
   - "Show me the top 5 rows"
   - "Create a bar chart of sales by category"
   - "What is the total profit?"

## 🔑 Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key"
4. Copy the key and paste it in your `.env` file

## 📊 Sample Dataset

Download the sample sales dataset: https://drive.google.com/file/d/1na63aBcSPm2q3-t1TxUlO9lMKElmr_YY/view

## ❓ Troubleshooting

### "Module not found" error
```bash
pip install -r requirements.txt
```

### Port already in use
- Backend: Change port in `backend/app.py` (line: `app.run(port=5000)`)
- Frontend: Set `PORT=3001` in terminal before running `npm start`

### API key not working
- Make sure `.env` file is in the root directory (`d:\LLM\`)
- No quotes around the API key in `.env`
- Restart the backend server after updating `.env`

## 🎯 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Try the sample prompts
- Explore the multi-agent architecture
- Deploy to production (Vercel + Render)

Happy coding! 🎉
