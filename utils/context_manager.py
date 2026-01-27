"""
Context Manager for conversation history and memory
"""

from typing import List, Dict, Optional
from collections import deque


class ContextManager:
    """
    Manages conversation context and history.
    Keeps track of the last N messages for context-aware responses.
    """
    
    def __init__(self, max_history: int = 5):
        """
        Initialize the Context Manager.
        
        Args:
            max_history: Maximum number of messages to keep in history
        """
        self.max_history = max_history
        self.history: deque = deque(maxlen=max_history)
        
    def add_message(self, role: str, content: str, metadata: Optional[Dict] = None):
        """
        Add a message to the conversation history.
        
        Args:
            role: Role of the message sender (user/assistant)
            content: Message content
            metadata: Optional metadata about the message
        """
        message = {
            "role": role,
            "content": content,
            "metadata": metadata or {}
        }
        self.history.append(message)
    
    def get_history(self) -> List[Dict]:
        """
        Get the conversation history.
        
        Returns:
            List of messages in chronological order
        """
        return list(self.history)
    
    def get_last_n(self, n: int) -> List[Dict]:
        """
        Get the last N messages.
        
        Args:
            n: Number of messages to retrieve
            
        Returns:
            List of last N messages
        """
        history = list(self.history)
        return history[-n:] if len(history) >= n else history
    
    def clear(self):
        """
        Clear the conversation history.
        """
        self.history.clear()
    
    def get_context_summary(self) -> str:
        """
        Get a summary of the current context.
        
        Returns:
            String summary of the conversation
        """
        if not self.history:
            return "No conversation history"
        
        summary = []
        for msg in self.history:
            summary.append(f"{msg['role'].capitalize()}: {msg['content'][:100]}")
        
        return "\n".join(summary)
