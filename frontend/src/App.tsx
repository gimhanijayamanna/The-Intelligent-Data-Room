/**
 * Main App Component for Intelligent Data Room
 */

import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataAnalysisView from './components/DataAnalysisView';
import { apiService } from './services/api';
import { DataInfo, Message } from './types';
import './App.css';

function App() {
    const [dataInfo, setDataInfo] = useState<DataInfo | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = async (file: File) => {
        setIsUploading(true);
        try {
            const response = await apiService.uploadFile(file);

            if (response.success && response.data_info) {
                setDataInfo(response.data_info);
                setMessages([]);

                // Show success message
                alert(`File uploaded successfully! ${response.data_info.rows} rows, ${response.data_info.columns} columns.`);
            } else {
                alert(`Upload failed: ${response.error || 'Unknown error'}`);
            }
        } catch (error: any) {
            alert(`Upload error: ${error.response?.data?.error || error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSendMessage = async (message: string) => {
        // Add user message to chat
        const userMessage: Message = {
            role: 'user',
            content: message,
        };
        setMessages((prev: Message[]) => [...prev, userMessage]);

        setIsLoading(true);

        try {
            const response = await apiService.sendMessage(message);

            if (response.success) {
                // Add assistant message with inline visualization and result
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: response.message,
                    metadata: {
                        has_visualization: !!response.visualization,
                        plan: response.plan,
                        visualization: response.visualization,
                        result: response.result,
                    },
                };

                setMessages((prev: Message[]) => [...prev, assistantMessage]);
            } else {
                // Add error message
                const errorMessage: Message = {
                    role: 'assistant',
                    content: `Sorry, I encountered an error: ${response.error || 'Unknown error'}`,
                    metadata: {
                        error: true,
                    },
                };

                setMessages((prev: Message[]) => [...prev, errorMessage]);
            }
        } catch (error: any) {
            const errorMessage: Message = {
                role: 'assistant',
                content: `Sorry, something went wrong: ${error.response?.data?.error || error.message}`,
                metadata: {
                    error: true,
                },
            };

            setMessages((prev: Message[]) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearSession = async () => {
        if (window.confirm('Are you sure you want to clear the session? This will remove all data and conversation history.')) {
            try {
                await apiService.clearSession();
                setDataInfo(null);
                setMessages([]);
            } catch (error: any) {
                alert(`Error clearing session: ${error.message}`);
            }
        }
    };

    return (
        <div className="app">
            {!dataInfo ? (
                /* Upload Section */
                <FileUpload
                    onUpload={handleFileUpload}
                    isUploading={isUploading}
                    hasData={!!dataInfo}
                />
            ) : (
                /* Data Analysis View */
                <DataAnalysisView
                    dataInfo={dataInfo}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onClearSession={handleClearSession}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}

export default App;
