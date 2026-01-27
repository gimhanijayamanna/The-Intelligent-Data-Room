/**
 * Result Display Component
 */

import React from 'react';
import '../styles/ResultDisplay.css';

interface ResultDisplayProps {
    result: any;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    if (!result) {
        return null;
    }

    const renderResult = () => {
        // If result is an array of objects (table data)
        if (Array.isArray(result) && result.length > 0) {
            return (
                <div className="table-container">
                    <table className="result-table">
                        <thead>
                            <tr>
                                {Object.keys(result[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((row, idx) => (
                                <tr key={idx}>
                                    {Object.values(row).map((value: any, colIdx) => (
                                        <td key={colIdx}>
                                            {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // If result is a simple object
        if (typeof result === 'object' && !Array.isArray(result)) {
            return (
                <div className="object-result">
                    {Object.entries(result).map(([key, value]) => (
                        <div key={key} className="result-row">
                            <span className="result-key">{key}:</span>
                            <span className="result-value">
                                {typeof value === 'number' ? value.toLocaleString() : String(value)}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }

        // If result is a primitive value
        return (
            <div className="simple-result">
                <span className="result-value">
                    {typeof result === 'number' ? result.toLocaleString() : String(result)}
                </span>
            </div>
        );
    };

    return (
        <div className="result-display">
            <div className="result-header">
                <h3>📋 Results</h3>
            </div>
            <div className="result-content">
                {renderResult()}
            </div>
        </div>
    );
};

export default ResultDisplay;
