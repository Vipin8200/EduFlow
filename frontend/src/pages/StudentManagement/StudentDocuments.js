import React, { useState, useRef } from 'react';
import {
    FileText, UploadCloud, Search, CheckCircle,
    Trash2, Eye, Download, FileType, AlertCircle, X
} from 'lucide-react';

// --- MOCK DATA ---
const mockStudents = [
    { id: 'ADM-2023-001', name: 'Aarav Sharma', class: 'Grade 5', section: 'A', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 'ADM-2023-002', name: 'Priya Verma', class: 'Grade 5', section: 'A', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 'ADM-2023-003', name: 'Rohan Gupta', class: 'Grade 8', section: 'B', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 'ADM-2023-004', name: 'Sneha Patel', class: 'Grade 10', section: 'C', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 'ADM-2023-005', name: 'Kabir Singh', class: 'Grade 5', section: 'B', avatar: 'https://i.pravatar.cc/150?u=5' }
];

const mockDocuments = [
    { id: 1, studentId: 'ADM-2023-001', type: 'Aadhar Card', name: 'aarav_aadhar.pdf', size: '1.2 MB', uploadDate: '10/05/2023', status: 'Verified' },
    { id: 2, studentId: 'ADM-2023-001', type: 'Transfer Certificate', name: 'tc_previous_school.pdf', size: '2.5 MB', uploadDate: '12/05/2023', status: 'Verified' },
    { id: 3, studentId: 'ADM-2023-002', type: 'Birth Certificate', name: 'priya_birth_cert.jpg', size: '800 KB', uploadDate: '15/06/2023', status: 'Pending Verification' },
];

const documentTypes = [
    { label: 'Aadhar Card', req: true },
    { label: 'Birth Certificate', req: true },
    { label: 'Transfer Certificate (TC)', req: false },
    { label: 'Previous Marksheet', req: false },
    { label: 'Passport Size Photo', req: true },
    { label: 'Medical Certificate', req: false },
    { label: 'Category/Caste Certificate', req: false },
];

const MAX_FILE_SIZE_MB = 5;

const StudentDocuments = () => {
    // Selection state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [documents, setDocuments] = useState(mockDocuments);

    // Upload state
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadType, setUploadType] = useState('Aadhar Card');
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    // Always show students list (default first 5), filtered by query when searching
    const filteredStudents = mockStudents.filter(s =>
        searchQuery.length === 0 ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const studentDocs = selectedStudent
        ? documents.filter(d => d.studentId === selectedStudent.id)
        : [];

    const progressPercentage = selectedStudent
        ? Math.round((studentDocs.length / documentTypes.filter(dt => dt.req).length) * 100)
        : 0;

    // --- ACTIONS ---
    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setSearchQuery('');
    };

    const handleDeleteDoc = (id) => {
        if (window.confirm("Are you sure you want to delete this document permanently?")) {
            setDocuments(documents.filter(d => d.id !== id));
        }
    };

    // --- DRAG & DROP HANDLERS ---
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const processFile = (file) => {
        setUploadError('');
        if (!file) return;

        // Validate Math Size
        const sizeInMB = file.size / (1024 * 1024);
        if (sizeInMB > MAX_FILE_SIZE_MB) {
            setUploadError(`File is too large. Max size allowed is ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        // Validate Type
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            setUploadError('Invalid file format. Only JPG, PNG, and PDF are allowed.');
            return;
        }

        setUploadFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const handleUploadSubmit = () => {
        if (!uploadFile) {
            setUploadError('Please select a file to upload.');
            return;
        }

        const newDoc = {
            id: Date.now(),
            studentId: selectedStudent.id,
            type: uploadType,
            name: uploadFile.name,
            size: `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB`,
            uploadDate: new Date().toLocaleDateString('en-GB'),
            status: 'Pending Verification'
        };

        setDocuments([newDoc, ...documents]);
        setIsUploadModalOpen(false);
        setUploadFile(null);
        setUploadType('Aadhar Card');
        alert("Document uploaded successfully.");
    };


    // --- RENDERS ---
    const renderUploadModal = () => {
        if (!isUploadModalOpen) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <UploadCloud className="text-[#C29543]" size={20} /> Upload Document
                        </h3>
                        <button onClick={() => { setIsUploadModalOpen(false); setUploadFile(null); setUploadError(''); }} className="text-gray-400 hover:text-gray-600 p-2 text-xl">&times;</button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold tracking-wide text-gray-500 uppercase">Document Category</label>
                            <select
                                value={uploadType}
                                onChange={(e) => setUploadType(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]"
                            >
                                {documentTypes.map(dt => (
                                    <option key={dt.label} value={dt.label}>{dt.label} {dt.req ? '(Required)' : ''}</option>
                                ))}
                            </select>
                        </div>

                        {uploadError && (
                            <div className="flex items-start gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                <p>{uploadError}</p>
                            </div>
                        )}

                        {!uploadFile ? (
                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragActive ? 'border-[#C29543] bg-orange-50/50' : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <input ref={fileInputRef} type="file" className="hidden" onChange={handleChange} accept=".jpg,.png,.pdf" />
                                <UploadCloud size={40} className="mx-auto text-gray-300 mb-3" />
                                <p className="text-sm font-bold text-gray-700">Click or drag file to this area to upload</p>
                                <p className="text-xs text-gray-500 mt-2">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                                <div className="flex items-center justify-center gap-4 mt-4 text-[11px] font-bold text-gray-400">
                                    <span className="bg-gray-100 px-2 py-1 rounded">MAX {MAX_FILE_SIZE_MB}MB</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded">PDF, JPG, PNG</span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-white rounded-lg border border-gray-100 shrink-0">
                                        <FileType className="text-[#C29543]" size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">{uploadFile.name}</p>
                                        <p className="text-xs text-gray-500 font-medium">{(uploadFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <button onClick={() => setUploadFile(null)} className="p-2 text-gray-400 hover:text-red-500 bg-white border border-gray-200 rounded-lg shrink-0">
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button onClick={() => { setIsUploadModalOpen(false); setUploadFile(null); setUploadError(''); }} className="px-5 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">Cancel</button>
                        <button onClick={handleUploadSubmit} disabled={!uploadFile} className="px-5 py-2 text-sm font-bold text-white bg-[#C29543] rounded-lg hover:bg-[#A67D35] disabled:opacity-50 disabled:cursor-not-allowed">
                            Upload File
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Documents</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage, verify, and securely store student records & certificates.</p>
                </div>
                {selectedStudent && (
                    <button onClick={() => setIsUploadModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold shadow-sm shadow-[#C29543]/20 hover:bg-[#A67D35] transition-colors">
                        <UploadCloud size={16} /> Upload New
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Panel: Search & Profile */}
                <div className="lg:col-span-1 space-y-4">

                    {/* Search Component */}
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <label className="text-xs font-bold tracking-wide text-gray-800 uppercase mb-2 block">Find Student</label>
                        <div className="relative mb-3">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#C29543] focus:border-[#C29543] transition-all"
                            />
                        </div>
                        <div className="space-y-1.5 max-h-[280px] overflow-y-auto">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map(student => (
                                    <div
                                        key={student.id}
                                        onClick={() => handleSelectStudent(student)}
                                        className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all border ${selectedStudent?.id === student.id
                                            ? 'bg-orange-50 border-[#C29543]/30 shadow-sm'
                                            : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                                            }`}
                                    >
                                        <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full object-cover border border-gray-100 shrink-0" />
                                        <div className="min-w-0">
                                            <p className={`text-sm font-bold truncate ${selectedStudent?.id === student.id ? 'text-[#C29543]' : 'text-gray-900'}`}>{student.name}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{student.id} • {student.class}</p>
                                        </div>
                                        {selectedStudent?.id === student.id && (
                                            <div className="ml-auto shrink-0 w-2 h-2 rounded-full bg-[#C29543]"></div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg">No students match your search.</div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Right Panel: Documents View */}
                <div className="lg:col-span-3">
                    {!selectedStudent ? (
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center text-gray-500">
                            <FileText size={64} className="text-gray-200 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Student Selected</h3>
                            <p className="text-sm max-w-sm">Please use the search panel on the left to find a student and manage their submitted documents.</p>
                        </div>
                    ) : (
                        <div className="space-y-5">

                            {/* Horizontal Student Profile Banner */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <img src={selectedStudent.avatar} alt="Profile" className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100 shadow-sm shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <h2 className="text-base font-black text-gray-900">{selectedStudent.name}</h2>
                                        <span className="text-xs font-bold text-[#C29543] bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{selectedStudent.id}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs font-bold text-gray-500">Class: <span className="text-gray-800">{selectedStudent.class}</span></span>
                                        <span className="text-xs font-bold text-gray-500">Section: <span className="text-gray-800">{selectedStudent.section}</span></span>
                                        <span className="text-xs font-bold text-gray-500">Docs: <span className="text-gray-800">{studentDocs.length}</span></span>
                                    </div>
                                    <div className="mt-2.5 flex items-center gap-3">
                                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div className={`h-full rounded-full ${progressPercentage >= 100 ? 'bg-green-500' : 'bg-[#C29543]'}`} style={{ width: `${Math.min(progressPercentage, 100)}%` }}></div>
                                        </div>
                                        <span className={`text-xs font-bold shrink-0 ${progressPercentage >= 100 ? 'text-green-600' : 'text-[#C29543]'}`}>{progressPercentage}% Complete</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    className="shrink-0 px-3 py-1.5 text-xs font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors flex items-center gap-1.5"
                                    title="Change Student"
                                >
                                    <X size={13} /> Change
                                </button>
                            </div>

                            {/* Required Documents Checklist Tracker */}
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center auto">
                                    <CheckCircle size={16} className="text-[#C29543] mr-2" />
                                    Required Documents Checklist
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {documentTypes.filter(d => d.req).map(dt => {
                                        const isUploaded = studentDocs.some(doc => doc.type === dt.label);
                                        return (
                                            <span
                                                key={dt.label}
                                                className={`text-xs font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${isUploaded
                                                    ? 'bg-green-50 border-green-200 text-green-700'
                                                    : 'bg-red-50 border-red-200 text-red-600'
                                                    }`}
                                            >
                                                {isUploaded ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                                                {dt.label}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Documents Storage Table */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                    <h3 className="font-bold text-gray-900">Uploaded Records ({studentDocs.length})</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[700px] text-left">
                                        <thead>
                                            <tr className="bg-white border-b border-gray-100">
                                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Document</th>
                                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Upload Date</th>
                                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {studentDocs.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                                        <FileText size={32} className="mx-auto text-gray-300 mb-2" />
                                                        <p className="text-sm font-medium">No documents uploaded yet.</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                studentDocs.map((doc) => (
                                                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-gray-100 rounded text-gray-500 border border-gray-200">
                                                                    <FileType size={16} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#C29543] transition-colors cursor-pointer">{doc.name}</p>
                                                                    <p className="text-xs text-gray-500 font-medium mt-0.5">{doc.size}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded">
                                                                {doc.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                                                            {doc.uploadDate}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${doc.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'
                                                                }`}>
                                                                {doc.status === 'Verified' ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                                                                {doc.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2 isolate">
                                                                <button className="p-1.5 text-gray-400 hover:text-[#C29543] bg-white border border-gray-200 rounded shadow-sm" title="View Document"><Eye size={14} /></button>
                                                                <button className="p-1.5 text-gray-400 hover:text-blue-500 bg-white border border-gray-200 rounded shadow-sm" title="Download"><Download size={14} /></button>
                                                                <button onClick={() => handleDeleteDoc(doc.id)} className="p-1.5 text-gray-400 hover:text-red-500 bg-white border border-gray-200 rounded shadow-sm" title="Delete"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {renderUploadModal()}

        </div>
    );
};

export default StudentDocuments;
