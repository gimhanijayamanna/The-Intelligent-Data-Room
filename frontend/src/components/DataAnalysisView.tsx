/**
 * Data Analysis View Component
 * Shows welcome screen initially, then chat view with execution plan
 */

import React, { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';
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
                    /* Full Width Chat View */
                    <div className="chat-view">
                        <div className="chat-results-area">
                            <div className="chat-messages-container">
                                {messages.map((message, index) => (
                                    <div key={index} className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                                        <div className="message-avatar">
                                            {message.role === 'user' ? '👤' : '🤖'}
                                        </div>
                                        <div className="message-bubble">
                                            {/* Execution Plan - Collapsible */}
                                            {message.metadata?.plan && message.role === 'assistant' && (
                                                <details className="execution-plan">
                                                    <summary className="plan-summary">
                                                        🧠 View Execution Plan
                                                    </summary>
                                                    <div className="plan-details">
                                                        <div className="plan-section">
                                                            <span className="plan-label">Analysis:</span>
                                                            <span className="plan-value">{message.metadata.plan.question_analysis}</span>
                                                        </div>
                                                        <div className="plan-section">
                                                            <span className="plan-label">Steps:</span>
                                                            <ol className="plan-steps">
                                                                {message.metadata.plan.steps?.map((step: string, i: number) => (
                                                                    <li key={i}>{step}</li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                        {message.metadata.plan.reasoning && (
                                                            <div className="plan-section">
                                                                <span className="plan-label">Reasoning:</span>
                                                                <span className="plan-value">{message.metadata.plan.reasoning}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </details>
                                            )}

                                            {/* Answer Text */}
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
                                    <div className="chat-message assistant-message">
                                        <div className="message-avatar">🤖</div>
                                        <div className="message-bubble loading">
                                            <div className="typing-indicator">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                            <p className="loading-text">Multi-agent system thinking...</p>
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