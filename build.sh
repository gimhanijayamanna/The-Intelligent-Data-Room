#!/bin/bash
set -e  # Exit on any error

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Building frontend..."
NODE_OPTIONS='--max-old-space-size=2048' GENERATE_SOURCEMAP=false CI=false npm run build

echo "Build completed successfully!"
