import React, { useState, useRef, useMemo } from 'react';
import {
    UploadCloud, FileText, CheckCircle, AlertCircle,
    History, X, Download, Eye, Trash2, Database,
    User, Calendar, Clock, ArrowRight, Table as TableIcon,
    Search
} from 'lucide-react';

// --- MOCK DATA ---
const EXPECTED_HEADERS = ['Student Name', 'Roll Number', 'Class', 'Section', 'Date of Birth', 'Gender', 'Contact Number', 'Email'];

const mockHistory = [
    { id: 'UB-101', fileName: 'students_grade_5_2024.xlsx', uploadDate: '2024-03-15', uploadTime: '10:30 AM', uploadedBy: 'Admin User', recordsCount: 45, status: 'Success' },
    { id: 'UB-102', fileName: 'new_admissions_term2.csv', uploadDate: '2024-03-10', uploadTime: '02:15 PM', uploadedBy: 'Vipin Suthar', recordsCount: 12, status: 'Success' },
    { id: 'UB-103', fileName: 'partial_import_grade_8.xlsx', uploadDate: '2024-03-05', uploadTime: '09:45 AM', uploadedBy: 'Admin User', recordsCount: 30, status: 'Success' },
];

const mockParsedData = [
    { name: 'Aarav Sharma', roll: '01', grade: '5', section: 'A', dob: '14/05/2012', gender: 'Male', contact: '9876543210', email: 'aarav@example.com' },
    { name: 'Priya Verma', roll: '02', grade: '5', section: 'A', dob: '22/08/2012', gender: 'Female', contact: '9876543211', email: 'priya@example.com' },
    { name: 'Rohan Gupta', roll: '03', grade: '5', section: 'A', dob: '10/11/2012', gender: 'Male', contact: '9876543212', email: 'rohan@example.com' },
    { name: 'Sneha Patel', roll: '04', grade: '5', section: 'A', dob: '05/02/2012', gender: 'Female', contact: '9876543213', email: 'sneha@example.com' },
    { name: 'Kabir Singh', roll: '05', grade: '5', section: 'A', dob: '18/09/2012', gender: 'Male', contact: '9876543214', email: 'kabir@example.com' },
];

// --- COMPONENTS ---

const Header = () => (
    <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Bulk Upload</h1>
        <p className="text-sm text-gray-500 mt-1">Upload student records via Excel or CSV sheets directly into the database.</p>
    </div>
);

const TabButton = ({ active, icon: Icon, label, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all duration-200 ${active
            ? 'border-[#C29543] text-[#C29543] bg-orange-50/30'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
    >
        <Icon size={16} />
        {label}
    </button>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm, recordsCount }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#C29543]">
                        <Database size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Push to Database?</h3>
                    <p className="text-gray-500 mt-2">
                        You are about to upload <span className="font-bold text-gray-900">{recordsCount} student records</span> to the main database.
                        This action will update your student master list.
                    </p>
                </div>
                <div className="flex bg-gray-50 p-4 gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                        Review Again
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 bg-[#C29543] text-white rounded-xl font-bold text-sm hover:bg-[#A67D35] transition-all shadow-md shadow-orange-200"
                    >
                        Yes, Upload Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const StudentBulkUpload = () => {
    const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'history'
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [uploadHistory, setUploadHistory] = useState(mockHistory);
    const [searchHistory, setSearchHistory] = useState('');
    const fileInputRef = useRef(null);

    const handleFileDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        processFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        processFile(selectedFile);
    };

    const processFile = (file) => {
        if (!file) return;

        // Mocking file extension check
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext !== 'xlsx' && ext !== 'xls' && ext !== 'csv') {
            alert('Please upload a valid Excel or CSV file.');
            return;
        }

        setFile(file);
        setIsProcessing(true);

        // Simulate reading and validation time
        setTimeout(() => {
            setPreviewData(mockParsedData);
            setIsProcessing(false);
        }, 1500);
    };

    const resetUpload = () => {
        setFile(null);
        setPreviewData([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFinalUpload = () => {
        setIsConfirmOpen(false);

        // Mock successful upload
        const newRecord = {
            id: `UB-${Math.floor(100 + Math.random() * 900)}`,
            fileName: file.name,
            uploadDate: new Date().toISOString().split('T')[0],
            uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            uploadedBy: 'Vipin Suthar',
            recordsCount: previewData.length,
            status: 'Success'
        };

        setUploadHistory([newRecord, ...uploadHistory]);
        alert('Data uploaded successfully to the database!');
        resetUpload();
        setActiveTab('history');
    };

    return (
        <div className="p-4 sm:p-6 max-w-[1400px] mx-auto w-full min-h-screen bg-gray-200/20 font-sans">
            <Header />

            {/* Tabs */}
            <div className="flex bg-white rounded-t-2xl border-x border-t border-gray-100 overflow-hidden">
                <TabButton
                    active={activeTab === 'upload'}
                    icon={UploadCloud}
                    label="Bulk Upload"
                    onClick={() => setActiveTab('upload')}
                />
                <TabButton
                    active={activeTab === 'history'}
                    icon={History}
                    label="Upload History"
                    onClick={() => setActiveTab('history')}
                />
            </div>

            <div className="bg-white rounded-b-2xl border border-gray-100 shadow-sm p-6 min-h-[600px]">
                {activeTab === 'upload' ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* 1. Requirements Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-3">
                                <section className="p-6 bg-orange-50/50 border border-orange-100 rounded-2xl">
                                    <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                                        <AlertCircle size={18} className="text-[#C29543]" />
                                        Before you upload
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                                        {EXPECTED_HEADERS.map(header => (
                                            <div key={header} className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle size={14} className="text-green-500 shrink-0" />
                                                <span>Your sheet must include column: <b className="text-gray-800">{header}</b></span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                            <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-2xl group hover:border-[#C29543]/40 cursor-pointer transition-all">
                                <div className="text-center">
                                    <Download size={24} className="mx-auto text-gray-400 group-hover:text-[#C29543] mb-2" />
                                    <p className="text-xs font-bold text-gray-900">Download Template</p>
                                    <p className="text-[10px] text-gray-400 mt-1">Get blank sample sheet</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Upload Area */}
                        {!file ? (
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleFileDrop}
                                onClick={() => fileInputRef.current.click()}
                                className="relative py-20 border-3 border-dashed border-gray-100 rounded-3xl bg-gray-50/50 flex flex-col items-center justify-center hover:bg-orange-50/30 hover:border-[#C29543]/20 transition-all cursor-pointer group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={handleFileSelect}
                                />
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud size={32} className="text-[#C29543]" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900">Select file to upload</h4>
                                <p className="text-sm text-gray-500 mt-1">Drag and drop your Excel or CSV file here</p>
                                <div className="mt-6 flex items-center gap-4 text-xs font-bold text-gray-400">
                                    <span className="px-2 py-1 bg-white rounded border border-gray-100 shadow-sm">XLSX</span>
                                    <span className="px-2 py-1 bg-white rounded border border-gray-100 shadow-sm">CSV</span>
                                    <span className="px-2 py-1 bg-white rounded border border-gray-100 shadow-sm">XLS</span>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* File Progress / Status */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{file.name}</p>
                                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB • Ready for validation</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetUpload}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Processing State */}
                                {isProcessing ? (
                                    <div className="py-20 flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 border-4 border-[#C29543]/20 border-t-[#C29543] rounded-full animate-spin mb-4" />
                                        <p className="font-bold text-gray-900 tracking-tight">Validating records...</p>
                                        <p className="text-sm text-gray-400 mt-1">Checking column headers and data constraints.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Preview Table */}
                                        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                            <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                                                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                                    <Eye size={16} className="text-gray-400" />
                                                    Data Preview ({previewData.length} records found)
                                                </h4>
                                                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                                                    <CheckCircle size={10} /> Formatting Valid
                                                </span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-sm">
                                                    <thead>
                                                        <tr className="bg-white border-b border-gray-50">
                                                            <th className="px-5 py-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Student Name</th>
                                                            <th className="px-5 py-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Roll No</th>
                                                            <th className="px-5 py-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Class/Sec</th>
                                                            <th className="px-5 py-3 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {previewData.map((row, idx) => (
                                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                                <td className="px-5 py-3 font-bold text-gray-900">{row.name}</td>
                                                                <td className="px-5 py-3 text-gray-600">{row.roll}</td>
                                                                <td className="px-5 py-3 text-gray-600">{row.grade}-{row.section}</td>
                                                                <td className="px-5 py-3">
                                                                    <span className="text-[10px] font-bold py-1 px-2 rounded-lg bg-green-50 text-green-600">Valid</span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-end gap-3 pt-4">
                                            <button
                                                onClick={resetUpload}
                                                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                Discard
                                            </button>
                                            <button
                                                onClick={() => setIsConfirmOpen(true)}
                                                className="px-8 py-2.5 bg-[#C29543] text-white rounded-xl font-bold text-sm hover:bg-[#A67D35] transition-all flex items-center gap-2 shadow-lg shadow-orange-100"
                                            >
                                                Next <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* History Table */}
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <History size={18} className="text-[#C29543]" />
                                    Import Logs
                                </h3>
                                <div className="relative w-full sm:w-64">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search logs..."
                                        value={searchHistory}
                                        onChange={(e) => setSearchHistory(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C29543]"
                                    />
                                </div>
                            </div>

                            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                <th className="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">File & ID</th>
                                                <th className="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">DateTime</th>
                                                <th className="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Uploader</th>
                                                <th className="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Records</th>
                                                <th className="px-5 py-4 font-bold text-gray-400 uppercase tracking-widest text-[10px] text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 bg-white">
                                            {uploadHistory.filter(log =>
                                                log.id.toLowerCase().includes(searchHistory.toLowerCase()) ||
                                                log.fileName.toLowerCase().includes(searchHistory.toLowerCase()) ||
                                                log.uploadedBy.toLowerCase().includes(searchHistory.toLowerCase())
                                            ).map((log) => (
                                                <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center text-[#C29543]">
                                                                <TableIcon size={16} />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 line-clamp-1">{log.fileName}</p>
                                                                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{log.id}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                                                            <Calendar size={12} className="text-gray-400" />
                                                            {log.uploadDate}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mt-1">
                                                            <Clock size={10} />
                                                            {log.uploadTime}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2 font-medium text-gray-700">
                                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                                                <User size={12} className="text-gray-500" />
                                                            </div>
                                                            {log.uploadedBy}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className="font-bold text-gray-900">{log.recordsCount}</span>
                                                        <span className="text-gray-400 ml-1 text-xs">Students</span>
                                                    </td>
                                                    <td className="px-5 py-4 text-right">
                                                        <button className="p-2 text-gray-400 hover:text-[#C29543] hover:bg-orange-50 rounded-lg transition-all" title="View details">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete log">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleFinalUpload}
                recordsCount={previewData.length}
            />
        </div>
    );
};

export default StudentBulkUpload;
