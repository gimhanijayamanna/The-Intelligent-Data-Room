"""
Run the Flask backend server
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.app import app

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
