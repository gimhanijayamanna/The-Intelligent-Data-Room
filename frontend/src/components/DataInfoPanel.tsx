/**
 * Data Info Panel Component
 */

import React from 'react';
import { DataInfo } from '../types';
import '../styles/DataInfoPanel.css';

interface DataInfoPanelProps {
    dataInfo: DataInfo | null;
}

const DataInfoPanel: React.FC<DataInfoPanelProps> = ({ dataInfo }) => {
    if (!dataInfo) {
        return null;
    }

    return (
        <div className="data-info-panel">
            <h3 className="panel-title">📁 {dataInfo.filename}</h3>

            <div className="info-stats">
                <div className="stat-item">
                    <span className="stat-label">Rows:</span>
                    <span className="stat-value">{dataInfo.rows.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Columns:</span>
                    <span className="stat-value">{dataInfo.columns}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Size:</span>
                    <span className="stat-value">{dataInfo.memory_usage}</span>
                </div>
            </div>

            <div className="columns-section">
                <h4 className="section-title">Columns</h4>
                <div className="columns-list">
                    {dataInfo.column_details.map((col, index) => (
                        <div key={index} className="column-item">
                            <div className="column-header">
                                <span className="column-name">{col.name}</span>
                                <span className="column-type">{col.type}</span>
                            </div>
                            <div className="column-meta">
                                <span className="column-stat">
                                    {col.unique_count} unique
                                </span>
                                {col.null_count > 0 && (
                                    <span className="column-stat null">
                                        {col.null_count} nulls
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {dataInfo.preview && dataInfo.preview.length > 0 && (
                <div className="preview-section">
                    <h4 className="section-title">Preview</h4>
                    <div className="preview-table-container">
                        <table className="preview-table">
                            <thead>
                                <tr>
                                    {Object.keys(dataInfo.preview[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataInfo.preview.slice(0, 3).map((row, idx) => (
                                    <tr key={idx}>
                                        {Object.values(row).map((value: any, colIdx) => (
                                            <td key={colIdx}>{String(value)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataInfoPanel;
