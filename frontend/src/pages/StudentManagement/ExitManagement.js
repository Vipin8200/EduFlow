import React, { useState, useMemo, useRef } from 'react';
import {
    Search, CheckCircle, Clock, FileText, Upload,
    LogOut, AlertTriangle, ShieldCheck, X, Image as ImageIcon,
    ChevronLeft, ChevronRight
} from 'lucide-react';

// ---- MOCK DATA ----
// Generate 50 active students for pagination example
const mockActiveStudents = Array.from({ length: 50 }, (_, i) => ({
    id: `ADM-2023-${(i + 1).toString().padStart(3, '0')}`,
    name: ['Arjun Mehta', 'Sia Khandelwal', 'Rahul Chahar', 'Priya Singh', 'Amit Kumar', 'Rohan Gupta', 'Sneha Sharma', 'Vikram Bose', 'Neha Khanna', 'Kabir Das'][i % 10] + (i > 9 ? ` ${i}` : ''),
    class: `Grade ${(i % 10) + 1}`,
    section: ['A', 'B', 'C'][i % 3],
    rollNo: (i + 1).toString().padStart(2, '0'),
    dues: i % 5 === 0 ? 500 : 0, // Every 5th student has dues
    libraryCleared: i % 7 !== 0, // Every 7th student has uncleared books
}));

const mockExitedStudents = [
    { id: 'ADM-2022-045', name: 'Neha Khanna', class: 'Grade 10', section: 'A', exitDate: '2024-03-15', reason: 'Graduated', remarks: 'Completed 10th standard.', tcImage: 'https://placehold.co/600x800/eeeeee/999999?text=TC+Document+1' },
    { id: 'ADM-2021-022', name: 'Vikram Bose', class: 'Grade 7', section: 'B', exitDate: '2024-02-10', reason: 'Transferred', remarks: 'Relocated to another city.', tcImage: 'https://placehold.co/600x800/eeeeee/999999?text=TC+Document+2' },
];

// ---- MAIN COMPONENT ----
const ExitManagement = () => {
    const [activeTab, setActiveTab] = useState('process'); // 'process', 'history'

    // Process Tab States
    const [activeStudents, setActiveStudents] = useState(mockActiveStudents);
    const [searchActive, setSearchActive] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [exitForm, setExitForm] = useState({ date: '', reason: 'Graduated', remarks: '', tcFile: null });

    // File input ref
    const fileInputRef = useRef(null);

    // History Tab States
    const [exitedStudents, setExitedStudents] = useState(mockExitedStudents);
    const [searchHistory, setSearchHistory] = useState('');
    const [previewTC, setPreviewTC] = useState(null);

    const ITEMS = 20; // 20 items per page as requested
    const [pageActive, setPageActive] = useState(1);
    const [pageHistory, setPageHistory] = useState(1);

    // Filter Active
    const filteredActive = useMemo(() => {
        if (!searchActive.trim()) return activeStudents;
        const lowSearch = searchActive.toLowerCase();
        return activeStudents.filter(s => s.name.toLowerCase().includes(lowSearch) || s.id.toLowerCase().includes(lowSearch));
    }, [activeStudents, searchActive]);

    // Filter History
    const filteredHistory = useMemo(() => {
        if (!searchHistory.trim()) return exitedStudents;
        const lowSearch = searchHistory.toLowerCase();
        return exitedStudents.filter(s => s.name.toLowerCase().includes(lowSearch) || s.id.toLowerCase().includes(lowSearch));
    }, [exitedStudents, searchHistory]);

    // Pagination
    const totalActivePages = Math.ceil(filteredActive.length / ITEMS);
    const paginatedActive = filteredActive.slice((pageActive - 1) * ITEMS, pageActive * ITEMS);

    const totalHistoryPages = Math.ceil(filteredHistory.length / ITEMS);
    const paginatedHistory = filteredHistory.slice((pageHistory - 1) * ITEMS, pageHistory * ITEMS);

    // Handle File Pick
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // In a real app, you would upload this file to a server.
            // Here we just create a local object URL to preview it.
            setExitForm(prev => ({ ...prev, tcFile: URL.createObjectURL(file) }));
        }
    };

    const handleProcessExit = (e) => {
        e.preventDefault();
        if (!selectedStudent) return;
        if (selectedStudent.dues > 0 || !selectedStudent.libraryCleared) {
            alert('Cannot process exit. Student has pending dues or uncleared library books.');
            return;
        }
        if (!exitForm.tcFile) {
            alert('Please upload the Transfer Certificate document before exiting.');
            return;
        }

        const newExitRecord = {
            id: selectedStudent.id,
            name: selectedStudent.name,
            class: selectedStudent.class,
            section: selectedStudent.section,
            exitDate: exitForm.date || new Date().toISOString().split('T')[0],
            reason: exitForm.reason,
            remarks: exitForm.remarks,
            tcImage: exitForm.tcFile
        };

        setExitedStudents([newExitRecord, ...exitedStudents]);
        setActiveStudents(activeStudents.filter(s => s.id !== selectedStudent.id));
        setSelectedStudent(null);
        setExitForm({ date: '', reason: 'Graduated', remarks: '', tcFile: null });
        setSearchActive('');
        alert('Student successfully exited and TC uploaded!');
        setActiveTab('history');
    };

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Exit Management</h1>
                <p className="text-sm text-gray-500 mt-1">Upload Transfer Certificates (TC) and process student departures.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm mb-5 w-fit">
                <button onClick={() => setActiveTab('process')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'process' ? 'bg-[#C29543] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                    <LogOut size={15} /> Upload TC & Process Exit
                </button>
                <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'history' ? 'bg-[#C29543] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                    <FileText size={15} /> Exit History
                </button>
            </div>

            {/* ---- PROCESS TAB ---- */}
            {activeTab === 'process' && (
                <div className="flex flex-col xl:flex-row gap-6">
                    {/* Left: Active Students List */}
                    <div className="flex-1 min-w-0 flex flex-col">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                            <div className="relative">
                                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Search active student by name or ID... (shows up to 20 per page)" value={searchActive} onChange={e => { setSearchActive(e.target.value); setPageActive(1); }} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]" />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col flex-1 overflow-hidden min-h-[500px]">
                            <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900 text-sm">Select Student to Exceed</h3>
                                <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                                    Total: {filteredActive.length}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto max-h-[600px]">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 z-10">
                                        <tr className="bg-gray-50/95 backdrop-blur border-b border-gray-100 shadow-sm">
                                            <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Student ID</th>
                                            <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                            <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Class</th>
                                            <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {paginatedActive.length === 0 ? <tr><td colSpan="4" className="py-12 text-center text-sm text-gray-400">No active students found matching your search.</td></tr> : paginatedActive.map(student => (
                                            <tr key={student.id} className={`transition-colors ${selectedStudent?.id === student.id ? 'bg-orange-50/50' : 'hover:bg-gray-50'}`}>
                                                <td className="px-5 py-3">
                                                    <p className="text-[11px] font-medium text-gray-500">{student.id}</p>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <p className="text-sm font-bold text-gray-800">{student.class} - {student.section}</p>
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    <button onClick={() => setSelectedStudent(student)} className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-colors shadow-sm ${selectedStudent?.id === student.id ? 'bg-[#C29543] text-white border-[#C29543]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}>
                                                        {selectedStudent?.id === student.id ? 'Selected' : 'Select'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            {totalActivePages > 1 && (
                                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                        Showing {(pageActive - 1) * ITEMS + 1} - {Math.min(pageActive * ITEMS, filteredActive.length)} of {filteredActive.length}
                                    </span>
                                    <div className="flex gap-1 overflow-x-auto padding-1 hidden-scrollbar">
                                        <button onClick={() => setPageActive(p => Math.max(1, p - 1))} disabled={pageActive === 1} className="w-8 h-8 flex justify-center items-center rounded border border-gray-200 bg-white text-gray-600 disabled:opacity-50 shadow-sm"><ChevronLeft size={16} /></button>

                                        {/* Simple pagination: show some pages */}
                                        {Array.from({ length: totalActivePages }, (_, i) => i + 1).filter(p => p === 1 || p === totalActivePages || (p >= pageActive - 2 && p <= pageActive + 2)).map((p, i, arr) => (
                                            <React.Fragment key={p}>
                                                {i > 0 && p - arr[i - 1] > 1 && <span className="w-8 h-8 flex justify-center items-center text-gray-400">...</span>}
                                                <button onClick={() => setPageActive(p)} className={`w-8 h-8 rounded text-sm font-bold shadow-sm ${pageActive === p ? 'bg-[#C29543] text-white border border-[#C29543]' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                                    {p}
                                                </button>
                                            </React.Fragment>
                                        ))}

                                        <button onClick={() => setPageActive(p => Math.min(totalActivePages, p + 1))} disabled={pageActive === totalActivePages} className="w-8 h-8 flex justify-center items-center rounded border border-gray-200 bg-white text-gray-600 disabled:opacity-50 shadow-sm"><ChevronRight size={16} /></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Exit Form */}
                    <div className="w-full xl:w-[480px] flex-shrink-0">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm sticky top-6">
                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900">Upload TC & Process Exit</h3>
                            </div>
                            {selectedStudent ? (
                                <form onSubmit={handleProcessExit} className="p-5 space-y-6">
                                    {/* Clearance check alerts */}
                                    <div className="space-y-2">
                                        {selectedStudent.dues > 0 && (
                                            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm">
                                                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                                <div><p className="font-bold">Pending Fee Dues: ₹{selectedStudent.dues}</p><p className="text-xs opacity-90 mt-0.5">Clear dues before exit.</p></div>
                                            </div>
                                        )}
                                        {!selectedStudent.libraryCleared && (
                                            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm">
                                                <Clock size={16} className="shrink-0 mt-0.5" />
                                                <div><p className="font-bold">Library Dues Pending</p><p className="text-xs opacity-90 mt-0.5">Return books before exit.</p></div>
                                            </div>
                                        )}
                                        {selectedStudent.dues === 0 && selectedStudent.libraryCleared && (
                                            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm">
                                                <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                                                <div><p className="font-bold">All Clearances Approved</p><p className="text-xs opacity-90 mt-0.5">Student is cleared for exit.</p></div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Form Fields */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-600 block mb-1">Exit Date *</label>
                                                <input type="date" required value={exitForm.date} onChange={e => setExitForm({ ...exitForm, date: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-600 block mb-1">Reason for Exit *</label>
                                                <select required value={exitForm.reason} onChange={e => setExitForm({ ...exitForm, reason: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]">
                                                    <option>Graduated</option>
                                                    <option>Transferred / Moved</option>
                                                    <option>Removed by Admin</option>
                                                    <option>Financial Reasons</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-gray-600 block mb-1">Upload TC Document (Image) *</label>
                                            <div
                                                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${exitForm.tcFile ? 'border-green-300 bg-green-50/30' : 'border-gray-300 bg-white'}`}
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <div className="space-y-2 text-center">
                                                    {exitForm.tcFile ? (
                                                        <div className="flex flex-col items-center">
                                                            <CheckCircle size={32} className="text-green-500 mb-2" />
                                                            <div className="text-sm font-bold text-gray-900">Document Uploaded</div>
                                                            <p className="text-xs text-gray-500 mt-1">Click to replace file</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center group">
                                                            <Upload size={32} className="text-gray-400 group-hover:text-[#C29543] transition-colors mb-2" />
                                                            <div className="flex text-sm text-gray-600 font-bold">
                                                                <span className="text-[#C29543]">Upload a file</span>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-gray-600 block mb-1">Remarks (Optional)</label>
                                            <textarea rows="2" value={exitForm.remarks} onChange={e => setExitForm({ ...exitForm, remarks: e.target.value })} placeholder="Mention any specific reason or notes for removal..." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543] resize-none" />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex gap-3">
                                        <button type="button" onClick={() => setSelectedStudent(null)} className="flex-1 px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm">Cancel</button>
                                        <button type="submit" disabled={selectedStudent.dues > 0 || !selectedStudent.libraryCleared} className="flex-1 px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                            Confirm Exit
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-10 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Search size={24} className="text-gray-300" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-400">Select an active student from the list to upload their TC and process their exit.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ---- HISTORY TAB ---- */}
            {activeTab === 'history' && (
                <div className="flex flex-col xl:flex-row gap-6">
                    {/* Left: Table */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                            <div className="relative">
                                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Search exited students by name or ID..." value={searchHistory} onChange={e => { setSearchHistory(e.target.value); setPageHistory(1); }} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]" />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden min-h-[500px]">
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur border-b border-gray-100 shadow-sm">
                                        <tr>
                                            <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Student</th>
                                            <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Reason</th>
                                            <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Exit Date</th>
                                            <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Uploaded TC</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {paginatedHistory.length === 0 ? <tr><td colSpan="4" className="py-12 text-center text-sm text-gray-400">No records found.</td></tr> : paginatedHistory.map(student => (
                                            <tr key={student.id} className={`transition-colors cursor-pointer ${previewTC?.id === student.id ? 'bg-orange-50/50' : 'hover:bg-gray-50'}`} onClick={() => setPreviewTC(student)}>
                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                    <p className="text-[11px] font-medium text-gray-400">{student.id} • {student.class}</p>
                                                </td>
                                                <td className="px-5 py-4 text-sm font-medium text-gray-700">{student.reason}</td>
                                                <td className="px-5 py-4 text-sm font-medium text-gray-700">{student.exitDate}</td>
                                                <td className="px-5 py-4 text-right">
                                                    <button onClick={(e) => { e.stopPropagation(); setPreviewTC(student); }} className={`px-4 py-1.5 border text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5 ml-auto ${previewTC?.id === student.id ? 'bg-[#C29543] text-white border-[#C29543]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}>
                                                        <ImageIcon size={14} /> View Document
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            {totalHistoryPages > 1 && (
                                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                        Showing {(pageHistory - 1) * ITEMS + 1} - {Math.min(pageHistory * ITEMS, filteredHistory.length)} of {filteredHistory.length}
                                    </span>
                                    <div className="flex gap-1 overflow-x-auto padding-1 hidden-scrollbar">
                                        <button onClick={() => setPageHistory(p => Math.max(1, p - 1))} disabled={pageHistory === 1} className="w-8 h-8 flex justify-center items-center rounded border border-gray-200 bg-white text-gray-600 disabled:opacity-50 shadow-sm"><ChevronLeft size={16} /></button>

                                        {Array.from({ length: totalHistoryPages }, (_, i) => i + 1).filter(p => p === 1 || p === totalHistoryPages || (p >= pageHistory - 2 && p <= pageHistory + 2)).map((p, i, arr) => (
                                            <React.Fragment key={p}>
                                                {i > 0 && p - arr[i - 1] > 1 && <span className="w-8 h-8 flex justify-center items-center text-gray-400">...</span>}
                                                <button onClick={() => setPageHistory(p)} className={`w-8 h-8 rounded text-sm font-bold shadow-sm ${pageHistory === p ? 'bg-[#C29543] text-white border border-[#C29543]' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                                    {p}
                                                </button>
                                            </React.Fragment>
                                        ))}

                                        <button onClick={() => setPageHistory(p => Math.min(totalHistoryPages, p + 1))} disabled={pageHistory === totalHistoryPages} className="w-8 h-8 flex justify-center items-center rounded border border-gray-200 bg-white text-gray-600 disabled:opacity-50 shadow-sm"><ChevronRight size={16} /></button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right: TC Image Preview */}
                    <div className="w-full xl:w-[460px] flex-shrink-0">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm sticky top-6 overflow-hidden flex flex-col max-h-[calc(100vh-100px)]">
                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between shadow-sm z-10">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2"><ImageIcon size={18} className="text-[#C29543]" /> Uploaded Transfer Certificate</h3>
                                {previewTC && (
                                    <button onClick={() => setPreviewTC(null)} className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="bg-gray-100 p-0 flex justify-center flex-1 overflow-auto relative">
                                {previewTC ? (
                                    <div className="w-full min-h-[500px] flex flex-col items-center justify-start p-4 bg-gray-800">
                                        <div className="bg-white shadow w-full max-w-full">
                                            <img
                                                src={previewTC.tcImage}
                                                alt={`TC for ${previewTC.name}`}
                                                className="w-full h-auto object-contain"
                                                onError={(e) => { e.target.src = 'https://placehold.co/600x800/eeeeee/999999?text=Image+Not+Found'; }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400 text-sm w-full min-h-[500px]">
                                        <ImageIcon size={48} className="mb-4 opacity-20" />
                                        <p>Select a student to view their TC Document</p>
                                    </div>
                                )}
                            </div>

                            {previewTC && (
                                <div className="p-4 bg-white border-t border-gray-100 flex justify-center shrink-0">
                                    <a
                                        href={previewTC.tcImage}
                                        download={`TC_${previewTC.id}.jpg`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full text-center px-4 py-2 bg-[#C29543] text-white font-bold text-sm rounded-lg hover:bg-[#A67D35] transition-colors shadow-sm"
                                    >
                                        Download TC Document
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExitManagement;
