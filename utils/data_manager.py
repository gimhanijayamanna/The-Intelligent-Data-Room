"""
Data Manager for handling file uploads and data operations
"""

import pandas as pd
import io
from typing import Dict, Optional, Tuple
import os
from werkzeug.utils import secure_filename


class DataManager:
    """
    Manages data upload, storage, and retrieval.
    """
    
    def __init__(self, upload_folder: str = "uploads", max_size_mb: int = 10):
        """
        Initialize the Data Manager.
        
        Args:
            upload_folder: Folder to store uploaded files
            max_size_mb: Maximum file size in MB
        """
        self.upload_folder = upload_folder
        self.max_size_bytes = max_size_mb * 1024 * 1024
        self.current_df: Optional[pd.DataFrame] = None
        self.current_filename: Optional[str] = None
        
        # Create upload folder if it doesn't exist
        os.makedirs(upload_folder, exist_ok=True)
        
        # Allowed extensions
        self.allowed_extensions = {'csv', 'xlsx', 'xls'}
    
    def allowed_file(self, filename: str) -> bool:
        """
        Check if file extension is allowed.
        
        Args:
            filename: Name of the file
            
        Returns:
            True if allowed, False otherwise
        """
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in self.allowed_extensions
    
    def load_file(self, file_data, filename: str) -> Tuple[bool, str, Optional[Dict]]:
        """
        Load a CSV or Excel file into a DataFrame.
        
        Args:
            file_data: File data (bytes or file object)
            filename: Name of the file
            
        Returns:
            Tuple of (success, message, data_info)
        """
        try:
            # Check file extension
            if not self.allowed_file(filename):
                return False, "Invalid file type. Please upload CSV or Excel files.", None
            
            # Get file extension
            ext = filename.rsplit('.', 1)[1].lower()
            
            # Read file based on extension
            if ext == 'csv':
                if isinstance(file_data, bytes):
                    self.current_df = pd.read_csv(io.BytesIO(file_data))
                else:
                    self.current_df = pd.read_csv(file_data)
            elif ext in ['xlsx', 'xls']:
                if isinstance(file_data, bytes):
                    self.current_df = pd.read_excel(io.BytesIO(file_data))
                else:
                    self.current_df = pd.read_excel(file_data)
            
            self.current_filename = filename
            
            # Get data info
            data_info = self.get_data_info()
            
            return True, "File uploaded successfully", data_info
            
        except Exception as e:
            return False, f"Error loading file: {str(e)}", None
    
    def get_data_info(self) -> Optional[Dict]:
        """
        Get information about the current dataset.
        
        Returns:
            Dictionary with dataset information
        """
        if self.current_df is None:
            return None
        
        # Get column info
        columns = []
        for col in self.current_df.columns:
            col_info = {
                "name": col,
                "type": str(self.current_df[col].dtype),
                "null_count": int(self.current_df[col].isnull().sum()),
                "unique_count": int(self.current_df[col].nunique())
            }
            
            # Add sample values for categorical columns
            if self.current_df[col].dtype == 'object' or self.current_df[col].nunique() < 10:
                col_info["sample_values"] = self.current_df[col].dropna().unique()[:5].tolist()
            
            columns.append(col_info)
        
        # Calculate file size from memory usage
        memory_bytes = self.current_df.memory_usage(deep=True).sum()
        if memory_bytes < 1024:
            size_str = f"{memory_bytes:.0f} B"
        elif memory_bytes < 1024 * 1024:
            size_str = f"{memory_bytes / 1024:.2f} KB"
        else:
            size_str = f"{memory_bytes / (1024 * 1024):.2f} MB"
        
        return {
            "filename": self.current_filename,
            "rows": int(self.current_df.shape[0]),
            "columns": int(self.current_df.shape[1]),
            "size": size_str,
            "column_details": columns,
            "memory_usage": f"{self.current_df.memory_usage(deep=True).sum() / 1024:.2f} KB",
            "preview": self.current_df.head(5).to_dict('records')
        }
    
    def get_dataframe(self) -> Optional[pd.DataFrame]:
        """
        Get the current DataFrame.
        
        Returns:
            Current DataFrame or None
        """
        return self.current_df
    
    def get_schema(self) -> Dict:
        """
        Get a simple schema for the Planner Agent.
        
        Returns:
            Dictionary with column names and types
        """
        if self.current_df is None:
            return {}
        
        return {
            col: str(dtype) 
            for col, dtype in self.current_df.dtypes.items()
        }
    
    def clear_data(self):
        """
        Clear the current dataset.
        """
        self.current_df = None
        self.current_filename = None
