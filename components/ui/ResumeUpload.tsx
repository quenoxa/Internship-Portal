"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { UploadCloud, FileText, Eye, RefreshCw, Trash2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ResumeUploadProps {
  value?: string;
  onChange: (url: string) => void;
  error?: string;
}

export function ResumeUpload({ value, onChange, error }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Local state to store file details for UI
  const [fileDetails, setFileDetails] = useState<{name: string, size: number, url: string} | null>(
    value ? { name: "Uploaded Resume", size: 0, url: value } : null
  );

  // Synchronize local fileDetails state with the value prop (e.g., when form is reset)
  useEffect(() => {
    if (!value) {
      setFileDetails(null);
      setUploadError(null);
    }
  }, [value]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File) => {
    const validTypes = [
      "application/pdf", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!validTypes.includes(file.type)) {
      return "Invalid file type. Only PDF, DOC, or DOCX allowed.";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "File is too large. Max size is 5MB.";
    }
    return null;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "";
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + " MB";
  };

  const uploadFile = async (file: File) => {
    const errorMsg = validateFile(file);
    if (errorMsg) {
      setUploadError(errorMsg);
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setProgress(10); // Start progress

    // Simulated progress interval
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      clearInterval(progressInterval);
      setProgress(100);

      if (res.ok && data.success) {
        setFileDetails({
          name: data.name || file.name,
          size: data.size || file.size,
          url: data.url
        });
        onChange(data.url);
        
        // Reset progress after a short delay
        setTimeout(() => {
          setIsUploading(false);
          setProgress(0);
        }, 500);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      setIsUploading(false);
      setProgress(0);
      setUploadError(err.message || "Network error while uploading.");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFileDetails(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReplace = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full relative">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
      />
      
      {!fileDetails && !isUploading && (
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[140px] relative
            ${isDragging ? 'border-[#6DFF33] bg-[#6DFF33]/10 scale-[1.02]' : 'border-zinc-400 bg-white/50 hover:bg-white hover:border-zinc-500'}
            ${error || uploadError ? 'border-red-400 bg-red-50/50' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload Resume"
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        >
          {/* Paperclip Doodle */}
          <div className="absolute -top-3 right-4 w-6 h-6 text-zinc-500 transform rotate-45 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
          </div>
          
          <UploadCloud className={`mx-auto mb-3 transition-transform ${isDragging ? 'text-[#6DFF33] scale-110' : 'text-zinc-700'}`} size={28} />
          <p className="text-sm font-sans text-brand-black leading-relaxed">
            Drag & drop your resume here <br/>
            <span className="text-zinc-500">or </span>
            <span className="font-bold text-brand-black hover:text-[#5ce62b] transition-colors">click to browse</span>
          </p>
          <p className="text-xs text-zinc-400 mt-2">PDF, DOC, DOCX (Max. 5MB)</p>
          
          {(uploadError || error) && (
            <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-xs text-red-500 font-medium whitespace-nowrap">
              <XCircle size={14} />
              <span>{uploadError || error}</span>
            </div>
          )}
        </div>
      )}

      {isUploading && (
        <div className="border border-zinc-200 bg-white rounded-lg p-6 flex flex-col items-center justify-center relative shadow-sm min-h-[140px]">
          <p className="text-sm font-bold text-brand-black mb-4">Uploading Resume...</p>
          <div className="w-full max-w-[200px] h-2 bg-zinc-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#6DFF33]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-zinc-400 mt-2 font-medium">{progress}%</span>
        </div>
      )}

      {fileDetails && !isUploading && (
        <div className="border border-zinc-200 bg-white rounded-lg p-4 flex flex-col gap-4 relative shadow-sm group hover:border-[#6DFF33]/50 transition-colors min-h-[140px] justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center border border-zinc-100 shrink-0">
              <FileText className="text-brand-black" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-brand-black truncate" title={fileDetails.name}>{fileDetails.name}</p>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">{formatFileSize(fileDetails.size)}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 pb-1 border-t border-zinc-100 mt-1 flex-wrap gap-x-2 gap-y-2">
            <a 
              href={fileDetails.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-brand-black transition-colors"
            >
              <Eye size={14} /> Preview
            </a>
            <button 
              type="button"
              onClick={handleReplace}
              className="flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-brand-black transition-colors"
            >
              <RefreshCw size={14} /> Replace
            </button>
            <button 
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
