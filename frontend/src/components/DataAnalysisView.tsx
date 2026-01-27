/**
 * Data Analysis View Component
 * Shows welcome screen initially, then splits to show agent flow on left and results on right
 */

import React, { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';
import AgentFlow from './AgentFlow';
import Visualization from './Visualization';
import ResultDisplay from './ResultDisplay';
import { Message } from '../types';
import '../styles/DataAnalysisView.css';

interface DataAnalysisViewProps {
    dataInfo: {
        filename: string;
        rows: number;
        columns: number;
        size: string;
    };
    messages: Message[];
    onSendMessage: (message: string) => void;
    onClearSession: () => void;
    isLoading: boolean;
}

const DataAnalysisView: React.FC<DataAnalysisViewProps> = ({
    dataInfo,
    messages,
    onSendMessage,
    onClearSession,
    isLoading
}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !isLoading) {
            onSendMessage(query.trim());
            setQuery('');
        }
    };

    const hasMessages = messages.length > 0;

    return (
        <div className="data-analysis-view">
            {/* Header */}
            <header className="analysis-header">
                <div className="header-container">
                    {/* Left - Title */}
                    <div className="header-left">
                        <h1 className="header-title">
                            Intelligent Data Room
                        </h1>
                        <p className="header-subtitle">
                            <span className="file-label">File:</span> {dataInfo.filename}
                        </p>
                    </div>

                    {/* Center - Stats Pills */}
                    <div className="header-center">
                        <div className="stat-pill">
                            <p className="stat-label">ROWS</p>
                            <p className="stat-value">{dataInfo.rows.toLocaleString()}</p>
                        </div>

                        <div className="stat-pill">
                            <p className="stat-label">COLUMNS</p>
                            <p className="stat-value">{dataInfo.columns.toLocaleString()}</p>
                        </div>

                        <div className="stat-pill">
                            <p className="stat-label">SIZE</p>
                            <p className="stat-value">{dataInfo.size}</p>
                        </div>
                    </div>

                    {/* Right - Clear Session Button */}
                    <div className="header-right">
                        <button
                            onClick={onClearSession}
                            className="clear-session-btn"
                        >
                            <Trash2 className="clear-icon" strokeWidth={2} />
                            Clear Session
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="analysis-main">
                {!hasMessages ? (
                    /* Initial Welcome Screen */
                    <div className="welcome-container">
                        <div className="glass-content">
                            <div className="welcome-content">
                                {/* Welcome Text */}
                                <div className="welcome-text">
                                    <h2 className="welcome-title">
                                        Welcome to Intelligent Data Room
                                    </h2>
                                    <p className="welcome-description">
                                        Ask questions about your data in natural language
                                    </p>
                                </div>

                                {/* Search Input */}
                                <form onSubmit={handleSubmit} className="search-form">
                                    <div className="search-input-container">
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Ask a question about your data..."
                                            className="search-input"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="submit"
                                            className="send-btn"
                                            disabled={isLoading || !query.trim()}
                                        >
                                            <Send className="send-icon" strokeWidth={2} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Split View: Agent Flow Left + Chat Right */
                    <div className="split-view">
                        {/* Left Side - Agent Communication Flow */}
                        <aside className="agent-flow-sidebar">
                            <div className="agent-flow-wrapper">
                                <h3 className="sidebar-title">Agent Communication</h3>
                                <div className="agent-flow-content">
                                    {messages
                                        .filter((msg) => msg.role === 'assistant' && msg.metadata?.plan)
                                        .map((msg, index) => (
                                            <AgentFlow
                                                key={index}
                                                plan={msg.metadata?.plan}
                                                isLoading={false}
                                            />
                                        ))}
                                    {isLoading && <AgentFlow isLoading={true} />}
                                </div>
                            </div>
                        </aside>

                        {/* Right Side - Chat and Results */}
                        <div className="chat-results-area">
                            <div className="chat-messages-container">
                                {messages.map((message, index) => (
                                    <div key={index} className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                                        <div className="message-avatar">
                                            {message.role === 'user' ? '👤' : '🤖'}
                                        </div>
                                        <div className="message-bubble">
                                            <p className="message-text">{message.content}</p>

                                            {/* Display Result Data */}
                                            {message.metadata?.result && message.role === 'assistant' && (
                                                <div className="message-result">
                                                    <ResultDisplay result={message.metadata.result} />
                                                </div>
                                            )}

                                            {/* Display Visualization */}
                                            {message.metadata?.visualization && message.role === 'assistant' && (
                                                <div className="message-visualization">
                                                    <Visualization visualizationData={message.metadata.visualization} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="chat-message assistant">
                                        <div className="message-avatar">🤖</div>
                                        <div className="message-bubble loading">
                                            <div className="typing-indicator">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input at Bottom */}
                            <form onSubmit={handleSubmit} className="chat-input-form">
                                <div className="chat-input-container">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Ask another question..."
                                        className="chat-input"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        className="send-btn-chat"
                                        disabled={isLoading || !query.trim()}
                                    >
                                        <Send className="send-icon-chat" strokeWidth={2} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataAnalysisView;