# 🎬 Video Demonstration Script

## Video Title
**"Intelligent Data Room: Multi-Agent AI System for Data Analysis"**

## Duration: 2 Minutes

---

## 🎥 Scene Breakdown

### Scene 1: Introduction (0:00 - 0:15)
**Visual**: Screen showing the application homepage

**Script**:
> "Hi! I'm demonstrating the Intelligent Data Room - a web application that lets you talk to your data using a multi-agent AI system. Instead of a single chatbot, we have two specialized agents working together: a Planner and an Executor."

**On Screen**:
- Show the landing page
- Highlight the title "Intelligent Data Room"
- Show subtitle: "Multi-Agent System for Data Analysis"

---

### Scene 2: Multi-Agent Architecture (0:15 - 0:45)
**Visual**: Architecture diagram or split-screen showing agent flow

**Script**:
> "Here's how it works: When you ask a question, Agent 1 - the Planner - analyzes your question and the data structure. It creates a detailed execution plan with step-by-step instructions. This plan is then passed to Agent 2 - the Executor - which generates and runs Python code using PandasAI and the Google Gemini API. The agents communicate through structured JSON, ensuring clear task division."

**On Screen**:
- Show architecture diagram from README
- Animate the flow: Question → Planner → Plan → Executor → Results
- Highlight JSON communication between agents

**Key Points to Mention**:
- ✅ Two specialized agents
- ✅ Planner creates strategy
- ✅ Executor implements strategy
- ✅ Structured communication

---

### Scene 3: Context & Memory (0:45 - 1:15)
**Visual**: Live demo of the application

**Script**:
> "The system maintains context by remembering your last 5 messages. Watch this: I'll upload a sales dataset and ask 'Show me the top 5 customers by sales.' [pause for response] Now I'll ask a follow-up: 'Now show only the top 3.' Notice how it understands the context from our previous conversation without me having to repeat the full question."

**On Screen**:
- Upload the sample sales CSV file
- Show data info panel appearing
- Type first question: "Show me the top 5 customers by sales"
- Wait for response with results
- Type follow-up: "Now show only the top 3"
- Show how it understands the context

**Demonstrate**:
- ✅ File upload
- ✅ Context retention
- ✅ Follow-up understanding
- ✅ Results displayed

---

### Scene 4: Execution Plan Visibility (1:15 - 1:45)
**Visual**: Chat interface with execution plan expanded

**Script**:
> "One of the coolest features is transparency. For every response, you can see exactly how the Planner Agent broke down your question. Let me ask: 'Create a bar chart comparing sales by region.' [expand execution plan] You can see the plan includes: analysis of what I asked, the steps to execute, data operations needed, and reasoning for why this approach was chosen. This makes the AI's decision-making process completely transparent."

**On Screen**:
- Type: "Create a bar chart comparing sales by region"
- Wait for chart to render
- Click to expand the "Execution Plan" section
- Slowly scroll through:
  - Question Analysis
  - Steps
  - Data Operations
  - Reasoning
- Show the resulting bar chart

**Highlight**:
- ✅ Transparent reasoning
- ✅ Step-by-step breakdown
- ✅ Automatic visualization
- ✅ Interactive charts

---

### Scene 5: Closing (1:45 - 2:00)
**Visual**: Split screen showing code structure and live app

**Script**:
> "The entire system is built with React and TypeScript on the frontend, Python and Flask on the backend, and powered by Google Gemini. The code is fully modular, type-safe, and production-ready. You can find the complete source code, documentation, and deployment guides in the GitHub repository. Thanks for watching!"

**On Screen**:
- Show quick glimpse of code structure
- Show README.md
- Display GitHub repository URL
- End screen with key features:
  - ✅ Multi-Agent Architecture
  - ✅ Context-Aware
  - ✅ Auto Visualization
  - ✅ Production Ready

---

## 📝 Alternative Demo Flow (If time permits)

### Extended Demo (3 minutes)
Add these sections:

**Visualization Showcase** (30s):
- Show different chart types:
  - Bar chart: "Sales by category"
  - Pie chart: "Distribution by region"
  - Line chart: "Profit trend over time"
  - Scatter plot: "Discount vs Profit correlation"

**Error Handling** (15s):
- Ask an ambiguous question
- Show how the system handles it gracefully

**Sample Prompts** (15s):
- Click on sample prompts to show ease of use
- Demonstrate quick interaction

---

## 🎤 Key Talking Points

### Must Cover:
1. ✅ **Multi-Agent Architecture**: Two specialized agents
2. ✅ **Context Memory**: Remembers 3-5 messages
3. ✅ **Execution Plans**: Transparent reasoning
4. ✅ **Agent Communication**: Structured JSON

### Nice to Have:
- Type-safe TypeScript implementation
- Modular Python backend
- Production deployment ready
- Comprehensive documentation

---

## 🎬 Recording Tips

### Before Recording:
1. ✅ Clear browser cache
2. ✅ Close unnecessary tabs
3. ✅ Prepare sample dataset
4. ✅ Test all demo queries
5. ✅ Set browser zoom to 100%
6. ✅ Hide bookmarks bar
7. ✅ Enable full screen

### During Recording:
- Speak clearly and at moderate pace
- Pause briefly after asking questions (let AI respond)
- Don't rush through execution plans
- Show enthusiasm about the features
- Use cursor to guide attention

### Tools:
- **Screen Recorder**: Loom, OBS, or QuickTime
- **Resolution**: 1080p minimum
- **Audio**: Use good microphone
- **Editing**: Trim any dead time

---

## 🎯 Sample Questions for Demo

### Good Demo Questions:
1. ✅ "Show me the top 5 customers by sales"
2. ✅ "Create a bar chart comparing sales by region"
3. ✅ "What is the correlation between discount and profit?"
4. ✅ "Which products are unprofitable?"
5. ✅ "Show the sales trend over time"

### Follow-up Questions:
1. ✅ "Now show only the top 3"
2. ✅ "Add profit to that chart"
3. ✅ "What about last year?"
4. ✅ "Show this as a pie chart instead"

### Avoid:
- ❌ Very long questions (hard to read on screen)
- ❌ Ambiguous questions (may fail)
- ❌ Questions requiring data not in sample dataset

---

## 📊 Dataset to Use

**Recommended**: Sample Sales Dataset (from challenge)
- Has multiple dimensions: Category, Region, Customer, Date
- Includes numerical columns: Sales, Profit, Discount
- Perfect for demonstrating various chart types
- Recognizable business context

**Download Link**: https://drive.google.com/file/d/1na63aBcSPm2q3-t1TxUlO9lMKElmr_YY/view

---

## 🎨 Visual Checklist

Before recording, ensure:
- ✅ Backend running (port 5000)
- ✅ Frontend running (port 3000)
- ✅ Browser window clean (no clutter)
- ✅ Data already uploaded OR quick upload demo
- ✅ Architecture diagram available to show
- ✅ Code structure visible (optional)
- ✅ README visible for GitHub reference

---

## 📤 Video Publishing

### Title Ideas:
1. "Intelligent Data Room: Multi-Agent AI for Data Analysis"
2. "Building a Multi-Agent System with Google Gemini"
3. "How Two AI Agents Work Together to Analyze Data"

### Description Template:
```
Demonstration of the Intelligent Data Room - a web application that uses a multi-agent AI system to analyze data through natural language queries.

Key Features:
✅ Multi-Agent Architecture (Planner + Executor)
✅ Context-Aware Conversations
✅ Automatic Visualizations
✅ Transparent Reasoning

Tech Stack:
- Backend: Python, Flask, Google Gemini API
- Frontend: React, TypeScript
- Visualization: Plotly

GitHub: [Your Repository URL]

Built for the GenAI & Full Stack Engineering Internship Challenge
```

### Tags:
- AI
- Machine Learning
- Multi-Agent Systems
- Data Analysis
- React
- Python
- Google Gemini
- Full Stack Development

---

## ✅ Pre-Upload Checklist

Before submitting video:
- ✅ Video is 2 minutes or close
- ✅ Audio is clear
- ✅ Shows multi-agent communication
- ✅ Demonstrates context/memory
- ✅ Explains execution plans
- ✅ Includes GitHub repository link
- ✅ Looks professional

---

**Good luck with your recording! 🎬🚀**
