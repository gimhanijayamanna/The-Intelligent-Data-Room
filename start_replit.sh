#!/bin/bash

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install
npm run build
cd ..

# Start backend in background
python -m gunicorn backend.app:app --bind 0.0.0.0:5000 --timeout 120 &

# Serve frontend build
cd frontend/build
python -m http.server 3000
