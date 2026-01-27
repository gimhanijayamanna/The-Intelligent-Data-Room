/**
 * Visualization Component using Plotly
 */

import React from 'react';
import Plot from 'react-plotly.js';
import '../styles/Visualization.css';

interface VisualizationProps {
    visualizationData: string | null;
}

const Visualization: React.FC<VisualizationProps> = ({ visualizationData }) => {
    if (!visualizationData) {
        return null;
    }

    try {
        const plotData = JSON.parse(visualizationData);

        return (
            <div className="visualization-container">
                <div className="visualization-header">
                    <h3>📊 Visualization</h3>
                </div>
                <div className="plot-container">
                    <Plot
                        data={plotData.data}
                        layout={{
                            ...plotData.layout,
                            autosize: true,
                            margin: { l: 60, r: 40, t: 40, b: 60 },
                        }}
                        config={{
                            responsive: true,
                            displayModeBar: true,
                            displaylogo: false,
                        }}
                        style={{ width: '100%', height: '100%' }}
                        useResizeHandler={true}
                    />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error rendering visualization:', error);
        return (
            <div className="visualization-container error">
                <p>Error rendering visualization</p>
            </div>
        );
    }
};

export default Visualization;
