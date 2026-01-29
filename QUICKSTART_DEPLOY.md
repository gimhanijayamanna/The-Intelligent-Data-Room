# 🚀 Quick Deployment Checklist

Follow these steps to deploy your app for free in ~15 minutes!

## ✅ Pre-Deployment Checklist

- [ ] Have GitHub account
- [ ] Have Google Gemini API key ([Get one](https://makersuite.google.com/app/apikey))
- [ ] Code is pushed to GitHub
- [ ] All files are committed

---

## 🎯 Fastest Way to Deploy (Render - Recommended)

### Step 1: Push to GitHub (If not done)
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Sign up for Render
1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with GitHub

### Step 3: Create Backend Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Fill in:
   ```
   Name: intelligent-data-room-backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn --bind 0.0.0.0:$PORT --timeout 120 backend.app:app
   Plan: Free
   ```
4. Add Environment Variable:
   - Click **"Advanced"**
   - Add: `GEMINI_API_KEY` = `your_actual_api_key`
5. Click **"Create Web Service"**
6. ⏰ Wait 5-10 minutes for deployment
7. 📝 Copy your backend URL (e.g., `https://intelligent-data-room-backend.onrender.com`)

### Step 4: Create Frontend Static Site
1. Click **"New +"** → **"Static Site"**
2. Select same repository
3. Fill in:
   ```
   Name: intelligent-data-room-frontend
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/build
   Plan: Free
   ```
4. Add Environment Variable:
   - Click **"Advanced"**
   - Add: `REACT_APP_API_URL` = `YOUR_BACKEND_URL_FROM_STEP_3`
   - Example: `https://intelligent-data-room-backend.onrender.com`
5. Click **"Create Static Site"**
6. ⏰ Wait 5-10 minutes for build

### Step 5: Test Your App! 🎉
1. Visit your frontend URL (shown in Render dashboard)
2. Upload a CSV file
3. Ask: "Show me the first 5 rows"
4. Verify it works!

---

## 📝 Alternative: Railway (Even Easier!)

### Option: Railway (One-Click Deploy)
1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Railway auto-detects both services!
6. Add environment variables:
   - Backend service: `GEMINI_API_KEY`
   - Frontend service: `REACT_APP_API_URL` (use backend URL)
7. Done! URLs will appear in dashboard

---

## 🔗 What You'll Get

After deployment, you'll have:
- ✅ Live frontend URL (e.g., `https://your-app.onrender.com`)
- ✅ Live backend API (e.g., `https://your-app-backend.onrender.com`)
- ✅ Both working together
- ✅ Free hosting (with limitations)

### Free Tier Limitations
- ⚠️ Backend sleeps after 15 min of inactivity (wakes up in 30-60 sec)
- ⚠️ Uploaded files are temporary (deleted on backend restart)
- ✅ Frontend is always fast (static hosting)

---

## 🎥 For Your Video Submission

Once deployed, include these in your video:
1. Show the live URL
2. Upload a sample file
3. Ask some questions
4. Show the agent flow in action

---

## 🐛 Common Issues

**Problem**: Backend won't start
- ✅ Check `GEMINI_API_KEY` is set correctly
- ✅ Check logs in Render dashboard

**Problem**: Frontend can't reach backend
- ✅ Verify `REACT_APP_API_URL` matches your backend URL
- ✅ Make sure backend URL includes `https://`

**Problem**: First request is slow
- ✅ This is normal! Free tier sleeps. Upgraded plans are always on.

---

## 📚 More Help

- Full deployment guide: See `DEPLOYMENT.md`
- Render docs: https://render.com/docs
- Railway docs: https://docs.railway.app

---

## ✨ Upgrade Your README

After deployment, add this to your README:

```markdown
## 🌐 Live Demo

**Try it now!** (No installation needed)

🔗 Frontend: https://your-app-name.onrender.com
🔗 Backend API: https://your-app-name-backend.onrender.com

Note: First load may take 30-60 seconds (free tier limitation)
```

---

Good luck! 🚀
