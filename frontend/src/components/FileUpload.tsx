/**
 * File Upload Component
 */

import React, { useRef, useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import '../styles/FileUpload.css';

interface FileUploadProps {
    onUpload: (file: File) => void;
    isUploading: boolean;
    hasData: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, isUploading, hasData }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Validate file type
        const allowedTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];

        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
            alert('Please upload a CSV or Excel file');
            return;
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        onUpload(file);
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    if (hasData) {
        return null; // Hide component when data is loaded
    }

    return (
        <div className="file-upload-container">
            <div className="upload-content-wrapper">
                {/* Title */}
                <div className="upload-header">
                    <h1 className="upload-title">
                        Intelligent Data Room
                    </h1>
                    <p className="upload-subtitle">
                        Multi-Agent System for Data Analysis
                    </p>
                </div>

                {/* Upload Card */}
                <div
                    className={`glass-card ${dragActive ? 'drag-active' : ''}`}
                    onDrop={handleDrop}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                >
                    <div className="upload-area">
                        {/* File Icon */}
                        <div className="icon-container">
                            <div className="icon-wrapper">
                                <FileText
                                    className="file-icon"
                                    strokeWidth={1.5}
                                />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="text-section">
                            <p className="drag-text">
                                {dragActive ? 'Drop your file here' : 'Drag & drop your CSV/XLSX file here'}
                            </p>
                            <p className="or-separator">
                                or
                            </p>
                        </div>

                        {/* Browse Button */}
                        <div className="button-container">
                            <input
                                ref={inputRef}
                                type="file"
                                id="file-upload"
                                className="file-input-hidden"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleChange}
                                disabled={isUploading}
                            />
                            <button
                                type="button"
                                className="browse-button"
                                onClick={onButtonClick}
                                disabled={isUploading}
                            >
                                <Upload className="upload-icon" strokeWidth={2} />
                                {isUploading ? 'Uploading...' : 'Browse Files'}
                            </button>
                        </div>

                        {/* File Size Info */}
                        <p className="file-limit">
                            Max file size: 10MB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
