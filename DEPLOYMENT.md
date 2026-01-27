# Deployment Guide

## 🚀 Deploy to Production

This guide covers deploying the Intelligent Data Room to production using free/affordable services.

## Backend Deployment (Render.com)

### Option 1: Render (Recommended - Free Tier Available)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Select the repository
   - Configure the service:
     - **Name**: intelligent-data-room-backend
     - **Environment**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn backend.app:app`
     - **Instance Type**: Free

3. **Add Environment Variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `FLASK_ENV`: production

4. **Add gunicorn to requirements.txt**:
```txt
gunicorn==21.2.0
```

5. **Deploy**: Render will automatically deploy your app

6. **Get your backend URL**: e.g., `https://intelligent-data-room-backend.onrender.com`

### Option 2: Railway (Alternative)

1. Sign up at [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Add environment variables
4. Deploy automatically

## Frontend Deployment (Vercel)

### Deploying React Frontend

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your GitHub repository**:
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect it's a React app

3. **Configure the project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Environment Variables**:
   - `REACT_APP_API_URL`: Your Render backend URL (from step above)
   
   Example:
   ```
   REACT_APP_API_URL=https://intelligent-data-room-backend.onrender.com
   ```

5. **Deploy**: Vercel will build and deploy automatically

6. **Get your frontend URL**: e.g., `https://intelligent-data-room.vercel.app`

## Alternative Frontend Hosting

### Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
4. Add environment variables
5. Deploy

## Post-Deployment Checklist

### Backend
- [ ] GEMINI_API_KEY is set
- [ ] CORS is configured for your frontend domain
- [ ] `/api/health` endpoint returns 200
- [ ] File upload works (test with small CSV)

### Frontend
- [ ] API connection works
- [ ] Can upload files
- [ ] Can send chat messages
- [ ] Visualizations render correctly

### Testing
- [ ] Test with sample dataset
- [ ] Try all sample prompts
- [ ] Test on mobile devices
- [ ] Check browser console for errors

## Production Optimizations

### Backend (app.py)

Update CORS settings:
```python
# Production CORS
CORS(app, origins=[
    "https://your-frontend-domain.vercel.app",
    "http://localhost:3000"  # For local development
])
```

Disable debug mode:
```python
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
```

### Frontend

Update API URL in production:
```typescript
// frontend/src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## Cost Estimates (Free Tiers)

| Service | Free Tier | Cost After |
|---------|-----------|------------|
| Render | 750 hours/month | $7/month |
| Vercel | 100GB bandwidth | $20/month |
| Railway | $5 credit | $5/month |
| Netlify | 100GB bandwidth | $19/month |

**Total for Free Tier**: $0/month (limited usage)
**Total for Paid**: ~$12-27/month

## Environment Variables Summary

### Backend (.env)
```bash
GEMINI_API_KEY=your_api_key_here
FLASK_ENV=production
PORT=5000
```

### Frontend (.env)
```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Continuous Deployment

Both Render and Vercel support automatic deployments:
- Push to `main` branch → Automatic deployment
- Pull requests get preview deployments
- Rollback to previous versions available

## Monitoring

### Render
- Built-in logs and metrics
- Email alerts for downtime
- Free SSL certificates

### Vercel
- Real-time logs
- Analytics (paid)
- Automatic HTTPS

## Troubleshooting Deployment

### Backend Issues
- **500 errors**: Check Render logs for Python errors
- **CORS errors**: Update CORS origins in app.py
- **API key issues**: Verify environment variables in Render dashboard

### Frontend Issues
- **API connection failed**: Check REACT_APP_API_URL
- **Build failed**: Check npm version compatibility
- **Blank page**: Check browser console for errors

## Custom Domain (Optional)

### Render
1. Go to Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

### Vercel
1. Go to Settings → Domains
2. Add your domain
3. Vercel provides DNS configuration

## Security Best Practices

1. **Never commit API keys** to Git
2. **Use environment variables** for all secrets
3. **Enable HTTPS** (automatic on Render/Vercel)
4. **Set CORS origins** to specific domains
5. **Monitor API usage** to prevent abuse

## Scaling Considerations

When your app grows:
1. **Upgrade to paid tiers** for better performance
2. **Add Redis** for caching (Render Redis addon)
3. **Use CDN** for static assets (Vercel Edge Network)
4. **Database**: Consider PostgreSQL for persistent storage
5. **Queue system**: For long-running analysis jobs

## Support

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

---

**Ready to deploy?** Start with the free tiers and scale as needed! 🚀
