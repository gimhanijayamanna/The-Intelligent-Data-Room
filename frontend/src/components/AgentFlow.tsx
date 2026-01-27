/**
 * Agent Flow Component - Displays the communication between Planner and Executor agents
 */

import React from 'react';
import '../styles/AgentFlow.css';

interface AgentFlowProps {
    plan?: any;
    isLoading?: boolean;
}

const AgentFlow: React.FC<AgentFlowProps> = ({ plan, isLoading }) => {
    if (!plan && !isLoading) return null;

    return (
        <div className="agent-flow-container">
            <div className="agent-flow-header">
                <h4>🤝 Multi-Agent Collaboration</h4>
            </div>

            <div className="agent-flow-timeline">
                {/* Planner Agent */}
                <div className={`agent-step ${isLoading ? 'active' : 'completed'}`}>
                    <div className="agent-icon planner">
                        <span>🧠</span>
                    </div>
                    <div className="agent-details">
                        <div className="agent-name">Planner Agent</div>
                        <div className="agent-description">
                            {isLoading ? 'Analyzing question & creating execution plan...' : 'Plan created'}
                        </div>
                        {plan && (
                            <div className="agent-output">
                                <div className="output-item">
                                    <span className="output-label">Analysis:</span>
                                    <span className="output-value">{plan.question_analysis}</span>
                                </div>
                                {plan.requires_visualization && (
                                    <div className="output-item">
                                        <span className="output-label">Visualization:</span>
                                        <span className="output-value">{plan.visualization_type}</span>
                                    </div>
                                )}
                                <div className="output-item">
                                    <span className="output-label">Steps:</span>
                                    <span className="output-value">{plan.steps?.length || 0} steps planned</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Transfer Arrow */}
                <div className={`message-transfer ${plan ? 'active' : ''}`}>
                    <div className="transfer-line"></div>
                    <div className="transfer-label">
                        📋 Plan & Instructions
                    </div>
                    <div className="transfer-arrow">→</div>
                </div>

                {/* Executor Agent */}
                <div className={`agent-step ${plan && isLoading ? 'active' : plan ? 'completed' : ''}`}>
                    <div className="agent-icon executor">
                        <span>⚡</span>
                    </div>
                    <div className="agent-details">
                        <div className="agent-name">Executor Agent</div>
                        <div className="agent-description">
                            {!plan ? 'Waiting for plan...' : isLoading ? 'Executing plan & generating code...' : 'Execution complete'}
                        </div>
                        {plan && !isLoading && (
                            <div className="agent-output">
                                <div className="output-item">
                                    <span className="output-label">Status:</span>
                                    <span className="output-value success">✓ Executed successfully</span>
                                </div>
                                <div className="output-item">
                                    <span className="output-label">Operations:</span>
                                    <span className="output-value">{plan.data_operations?.join(', ')}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentFlow;
