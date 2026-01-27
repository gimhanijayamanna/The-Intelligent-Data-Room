/**
 * Type definitions for the Intelligent Data Room application
 */

export interface DataInfo {
    filename: string;
    rows: number;
    columns: number;
    size: string;
    column_details: ColumnDetail[];
    memory_usage: string;
    preview: Record<string, any>[];
}

export interface ColumnDetail {
    name: string;
    type: string;
    null_count: number;
    unique_count: number;
    sample_values?: any[];
}

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    metadata?: {
        has_visualization?: boolean;
        plan?: ExecutionPlan;
        error?: boolean;
        visualization?: string;
        result?: any;
    };
}

export interface ExecutionPlan {
    question_analysis: string;
    requires_visualization: boolean;
    visualization_type?: string;
    steps: string[];
    data_operations?: string[];
    expected_output: string;
    reasoning: string;
    status?: string;
}

export interface ChatResponse {
    success: boolean;
    message: string;
    result?: any;
    visualization?: string;
    plan?: ExecutionPlan;
    code?: string;
    error?: string;
    conversation_history?: Message[];
}

export interface UploadResponse {
    success: boolean;
    message?: string;
    error?: string;
    data_info?: DataInfo;
}
