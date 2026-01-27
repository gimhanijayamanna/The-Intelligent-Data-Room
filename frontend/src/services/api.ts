/**
 * API Service for communicating with the backend
 */

import axios from 'axios';
import { ChatResponse, UploadResponse, DataInfo } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    /**
     * Upload a CSV or Excel file
     */
    uploadFile: async (file: File): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },

    /**
     * Send a chat message
     */
    sendMessage: async (message: string): Promise<ChatResponse> => {
        const response = await api.post('/api/chat', { message });
        return response.data;
    },

    /**
     * Get data information
     */
    getDataInfo: async (): Promise<{ success: boolean; data_info?: DataInfo; error?: string }> => {
        const response = await api.get('/api/data-info');
        return response.data;
    },

    /**
     * Get conversation history
     */
    getHistory: async (): Promise<{ success: boolean; history?: any[]; error?: string }> => {
        const response = await api.get('/api/history');
        return response.data;
    },

    /**
     * Clear session
     */
    clearSession: async (): Promise<{ success: boolean; message?: string; error?: string }> => {
        const response = await api.post('/api/clear');
        return response.data;
    },

    /**
     * Health check
     */
    healthCheck: async (): Promise<{ status: string; api_key_configured: boolean }> => {
        const response = await api.get('/api/health');
        return response.data;
    },
};
