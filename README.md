# 🧠 Intelligent Data Room

A sophisticated web application that allows users to upload CSV/XLSX files and interact with their data using natural language. Built with a **Multi-Agent System** architecture where tasks are intelligently split between a **Planner Agent** (thinking) and an **Executor Agent** (doing).

## 🌟 Features

### Core Functionality
- **📊 Data Upload**: Support for CSV and XLSX files (up to 10MB)
- **🤖 Multi-Agent System**:
  - **Agent 1 (The Planner)**: Analyzes user questions and creates step-by-step execution plans
  - **Agent 2 (The Executor)**: Executes plans using PandasAI and Google Gemini API
- **📈 Automatic Visualization**: Generates charts (Plotly) based on user queries
- **💬 Context Retention**: Remembers last 3-5 messages for follow-up questions
- **🎯 Smart Analysis**: Understands natural language queries about data

### Technical Highlights
- **Backend**: Python, Flask, PandasAI, Google Gemini API
- **Frontend**: React with TypeScript
- **Visualization**: Plotly for interactive charts
- **Architecture**: Clean separation of concerns with modular design

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface (React)                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Flask REST API                          │
└─────┬──────────────┬──────────────────┬─────────────────┘
      │              │                  │
      ▼              ▼                  ▼
┌──────────┐  ┌──────────┐      ┌──────────────┐
│  Data    │  │ Context  │      │   Agents     │
│ Manager  │  │ Manager  │      │              │
└──────────┘  └──────────┘      └──────┬───────┘
                                       │
                        ┌──────────────┴──────────────┐
                        │                             │
                        ▼                             ▼
                ┌───────────────┐           ┌─────────────────┐
                │ Planner Agent │           │ Executor Agent  │
                │   (Gemini)    │──────────▶│   (PandasAI)    │
                └───────────────┘           └─────────────────┘
```

## 🚀 Setup Instructions

### Prerequisites
- **Python 3.8+**
- **Node.js 16+** and npm
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### Backend Setup

1. **Clone the repository**:
```bash
cd d:\LLM
```

2. **Create a virtual environment**:
```bash
python -m venv .venv
.venv\Scripts\activate  # On Windows
# source .venv/bin/activate  # On macOS/Linux
```

3. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**:
```bash
# Copy the example file
copy .env.example .env  # On Windows
# cp .env.example .env  # On macOS/Linux

# Edit .env and add your Google Gemini API key
GEMINI_API_KEY=your_actual_api_key_here
```

5. **Run the Flask backend**:
```bash
python backend/app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📖 Usage Guide

### 1. Upload Data
- Click "Browse Files" or drag & drop a CSV/XLSX file
- Maximum file size: 10MB
- View dataset information in the side panel

### 2. Ask Questions
Use natural language to query your data:

**Easy Queries**:
- "Show me the top 5 customers by sales"
- "Create a bar chart of sales by category"
- "What is the total profit?"

**Medium Queries**:
- "Which products are unprofitable? Show with a chart"
- "Compare sales trends across regions over time"
- "Is there a correlation between discount and profit?"

**Follow-up Questions**:
- "Now show only the top 3"
- "Add a trend line to that chart"
- "What about last year?"

### 3. View Results
- **Text Results**: Displayed in a clean table or summary
- **Visualizations**: Interactive Plotly charts
- **Execution Plan**: View how the AI analyzed your question

## 🎯 Sample Prompts

### Easy Prompts
1. "Create a bar chart showing total Sales and Profit for each Category"
2. "Visualize the distribution of Sales across Regions using a pie chart"
3. "Which Customer Segment places the most orders?"
4. "Top 5 States by total Sales using a horizontal bar chart"
5. "How has total Profit changed over Years (2018–2021)?"

### Medium Prompts
1. "Which Sub-Categories are unprofitable on average? Visualize with a bar chart"
2. "Compare Sales Trend of different Ship Modes over time"
3. "Top 10 Customers by total Profit displayed in a bar chart"
4. "Is there a correlation between Discount and Profit? Create a scatter plot"
5. "Calculate and chart the Return Rate for each Region"

## 🧩 Project Structure

```
d:\LLM/
├── agents/                      # Multi-agent system
│   ├── planner_agent.py        # Agent 1: Creates execution plans
│   ├── executor_agent.py       # Agent 2: Executes plans
│   └── __init__.py
├── backend/                     # Flask REST API
│   ├── app.py                  # Main Flask application
│   └── __init__.py
├── utils/                       # Utility modules
│   ├── context_manager.py      # Conversation history management
│   ├── data_manager.py         # Data upload and processing
│   └── __init__.py
├── frontend/                    # React TypeScript frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── DataInfoPanel.tsx
│   │   │   ├── Visualization.tsx
│   │   │   └── ResultDisplay.tsx
│   │   ├── services/           # API services
│   │   │   └── api.ts
│   │   ├── styles/             # CSS files
│   │   ├── types/              # TypeScript types
│   │   ├── App.tsx             # Main App component
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── requirements.txt             # Python dependencies
├── .env.example                # Environment variables template
├── .gitignore
└── README.md
```

## 🔧 API Endpoints

### Backend API (Flask)

- **POST /api/upload**: Upload CSV/XLSX file
- **POST /api/chat**: Send a message and get AI response
- **GET /api/data-info**: Get information about loaded dataset
- **GET /api/history**: Get conversation history
- **POST /api/clear**: Clear session data
- **GET /api/health**: Health check endpoint

## 🎨 Key Technologies

### Backend
- **Flask**: Web framework
- **Google Gemini API**: LLM for intelligent planning and code generation
- **Pandas**: Data manipulation
- **Plotly**: Chart generation
- **OpenPyXL**: Excel file support

### Frontend
- **React 18**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Axios**: HTTP client
- **React-Plotly.js**: Interactive visualizations
- **CSS3**: Modern styling

## 🧠 How the Multi-Agent System Works

### Agent Communication Flow

1. **User asks a question** → Sent to Flask backend
2. **Planner Agent (Agent 1)**:
   - Analyzes the question
   - Examines the data schema
   - Reviews conversation history (last 5 messages)
   - Creates a structured execution plan
   - Determines if visualization is needed
3. **Executor Agent (Agent 2)**:
   - Receives the plan
   - Generates Python code using Gemini
   - Executes code safely with Pandas
   - Generates Plotly visualizations if needed
   - Returns results
4. **Frontend displays**:
   - Formatted results (tables/text)
   - Interactive charts
   - Execution plan details

### Context Management
- Stores last 5 conversation messages
- Provides context for follow-up questions
- Enables natural conversation flow

## 📊 Sample Dataset

The application works best with structured data. You can use the provided sample sales dataset or any CSV/XLSX file with the following characteristics:
- Multiple columns with different data types
- Numerical columns for aggregations
- Categorical columns for grouping
- Date/time columns for trend analysis

Sample dataset: [Download here](https://drive.google.com/file/d/1na63aBcSPm2q3-t1TxUlO9lMKElmr_YY/view)

## 🔒 Security Considerations

- File size limited to 10MB
- Only CSV and XLSX formats accepted
- Code execution happens in isolated namespace
- No direct database access
- Environment variables for sensitive data

## 🐛 Troubleshooting

### Backend Issues
- **"GEMINI_API_KEY not configured"**: Ensure `.env` file exists with valid API key
- **Import errors**: Run `pip install -r requirements.txt` again
- **Port 5000 in use**: Change port in `backend/app.py`

### Frontend Issues
- **npm install fails**: Try `npm install --legacy-peer-deps`
- **Plotly not rendering**: Check browser console for errors
- **API connection fails**: Verify backend is running on port 5000

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables in platform dashboard
2. Use `Procfile` or platform-specific configuration
3. Ensure requirements.txt is up to date

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Set `REACT_APP_API_URL` environment variable to backend URL
3. Deploy the `build/` folder

## 🎓 Learning Outcomes

This project demonstrates:
- **Multi-agent AI systems** with specialized roles
- **LLM integration** for natural language understanding
- **Dynamic code generation** and safe execution
- **Context-aware conversations** with memory
- **Modern full-stack development** (React + Flask)
- **Data visualization** with Plotly
- **RESTful API design**

## 📝 License

This project is created for educational purposes as part of a technical challenge.

## 👥 Contributing

This is a challenge submission project. For suggestions or improvements, feel free to open an issue or submit a pull request.

## 🙏 Acknowledgments

- Google Gemini API for powerful LLM capabilities
- PandasAI for inspiration
- Plotly for excellent visualization library
- React and Flask communities

---

**Built with ❤️ for the GenAI & Full Stack Engineering Internship Challenge**
