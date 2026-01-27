/**
 * Chat Interface Component
 */

import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import Visualization from './Visualization';
import ResultDisplay from './ResultDisplay';
import AgentFlow from './AgentFlow';
import '../styles/ChatInterface.css';

interface ChatInterfaceProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && !isLoading) {
            onSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    const samplePrompts = [
        "Show me the top 5 customers by sales",
        "Create a bar chart of sales by category",
        "What is the average profit by region?",
        "Which products have negative profit?",
        "Show the sales trend over time"
    ];

    return (
        <div className="chat-interface">
            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="welcome-message">
                        <h2>👋 Welcome to Intelligent Data Room</h2>
                        <p>Ask questions about your data in natural language!</p>
                        <div className="sample-prompts">
                            <p className="prompts-title">Try asking:</p>
                            {samplePrompts.map((prompt: string, index: number) => (
                                <button
                                    key={index}
                                    className="sample-prompt"
                                    onClick={() => !isLoading && onSendMessage(prompt)}
                                    disabled={isLoading}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message: Message, index: number) => (
                            <div key={index} className={`message ${message.role}`}>
                                <div className="message-avatar">
                                    {message.role === 'user' ? '👤' : '🤖'}
                                </div>
                                <div className="message-content">
                                    <div className="message-text">{message.content}</div>

                                    {/* Display Agent Flow for assistant messages with plan */}
                                    {message.metadata?.plan && message.role === 'assistant' && (
                                        <AgentFlow plan={message.metadata.plan} isLoading={false} />
                                    )}

                                    {/* Display Result Data inline */}
                                    {message.metadata?.result && message.role === 'assistant' && (
                                        <div className="inline-result">
                                            <ResultDisplay result={message.metadata.result} />
                                        </div>
                                    )}

                                    {/* Display Visualization inline */}
                                    {message.metadata?.visualization && message.role === 'assistant' && (
                                        <div className="inline-visualization">
                                            <Visualization visualizationData={message.metadata.visualization} />
                                        </div>
                                    )}

                                    {message.metadata?.plan && message.role === 'assistant' && (
                                        <div className="message-plan">
                                            <details>
                                                <summary>🧠 Execution Plan</summary>
                                                <div className="plan-content">
                                                    <p><strong>Analysis:</strong> {message.metadata.plan.question_analysis}</p>
                                                    <p><strong>Steps:</strong></p>
                                                    <ol>
                                                        {message.metadata.plan.steps.map((step: string, i: number) => (
                                                            <li key={i}>{step}</li>
                                                        ))}
                                                    </ol>
                                                    {message.metadata.plan.reasoning && (
                                                        <p><strong>Reasoning:</strong> {message.metadata.plan.reasoning}</p>
                                                    )}
                                                </div>
                                            </details>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message assistant loading">
                                <div className="message-avatar">🤖</div>
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <p className="loading-text">Multi-agent system working...</p>
                                    {/* Show agent flow while loading */}
                                    <AgentFlow isLoading={true} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <form className="chat-input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask a question about your data..."
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="send-button"
                    disabled={isLoading || !inputValue.trim()}
                >
                    {isLoading ? '⏳' : '➤'}
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
