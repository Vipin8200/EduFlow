import React, { useState, useMemo } from 'react';
import {
    CheckCircle, Search, RefreshCw,
    Printer, ChevronLeft, ChevronRight, Palette, X,
    GraduationCap, Layout, Type, ToggleLeft
} from 'lucide-react';

// ---- MOCK STUDENT DATA ----
const mockStudents = [
    { id: 'ADM-2023-001', name: 'Aarav Sharma', class: 'Grade 5', section: 'A', rollNo: '01', dob: '14/05/2012', gender: 'Male', bloodGroup: 'B+', contact: '+91 9876543210', fatherName: 'Ramesh Sharma', status: 'Generated', checked: false, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 'ADM-2023-002', name: 'Priya Verma', class: 'Grade 5', section: 'A', rollNo: '02', dob: '22/08/2012', gender: 'Female', bloodGroup: 'O+', contact: '+91 9876543211', fatherName: 'Sanjay Verma', status: 'Pending', checked: false, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 'ADM-2023-003', name: 'Rohan Gupta', class: 'Grade 8', section: 'B', rollNo: '15', dob: '10/11/2009', gender: 'Male', bloodGroup: 'A+', contact: '+91 9876543212', fatherName: 'Amit Gupta', status: 'Generated', checked: false, avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 'ADM-2023-004', name: 'Sneha Patel', class: 'Grade 10', section: 'C', rollNo: '30', dob: '05/02/2007', gender: 'Female', bloodGroup: 'AB+', contact: '+91 9876543213', fatherName: 'Rahul Patel', status: 'Pending', checked: false, avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 'ADM-2023-005', name: 'Kabir Singh', class: 'Grade 5', section: 'B', rollNo: '22', dob: '18/09/2012', gender: 'Male', bloodGroup: 'O-', contact: '+91 9876543214', fatherName: 'Vikram Singh', status: 'Generated', checked: false, avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: 'ADM-2023-006', name: 'Ananya Desai', class: 'Grade 1', section: 'A', rollNo: '05', dob: '12/03/2016', gender: 'Female', bloodGroup: 'B-', contact: '+91 9876543215', fatherName: 'Nitin Desai', status: 'Pending', checked: false, avatar: 'https://i.pravatar.cc/150?u=6' },
];

// ---- DESIGN THEMES ----
const THEMES = [
    { id: 'classic', label: 'Classic Dark', headerBg: '#1a1a1a', accentColor: '#C29543', headerText: '#ffffff', strip: '#C29543' },
    { id: 'blue', label: 'Ocean Blue', headerBg: '#1e3a5f', accentColor: '#60a5fa', headerText: '#ffffff', strip: '#60a5fa' },
    { id: 'green', label: 'Emerald', headerBg: '#14532d', accentColor: '#4ade80', headerText: '#ffffff', strip: '#4ade80' },
    { id: 'purple', label: 'Royal Purple', headerBg: '#3b0764', accentColor: '#c084fc', headerText: '#ffffff', strip: '#c084fc' },
    { id: 'maroon', label: 'Maroon', headerBg: '#7f1d1d', accentColor: '#f87171', headerText: '#ffffff', strip: '#f87171' },
];

const DEFAULT_DESIGN = {
    // Fields
    showDOB: true,
    showBlood: true,
    showFather: true,
    showContact: true,
    showRoll: true,
    showGender: false,
    // Card extras
    showSession: true,
    showBarcode: true,
    showValidity: false,
    showTagline: true,
    // Layout / Style
    avatarShape: 'rounded', // 'rounded' | 'circle'
    cardWidth: 'normal',    // 'normal' | 'wide'
    instituteName: 'EduConnect Institute',
    tagline: 'Excellence in Education',
    validityYear: '2023-24',
    sessionYear: '2023-24',
};

// ---- ID CARD COMPONENT ----
const StudentIDCard = ({ student, theme, design }) => {
    if (!student) return null;
    const isWide = design.cardWidth === 'wide';
    const avatarIsCircle = design.avatarShape === 'circle';
    const w = isWide ? 290 : 255;

    return (
        <div
            className="bg-white flex flex-col shadow-[0_8px_32px_-4px_rgba(0,0,0,0.18)] transition-all duration-300"
            style={{ width: w, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}
        >
            {/* ── HEADER ── */}
            <div style={{ backgroundColor: theme.headerBg, padding: '14px 14px 14px 14px', position: 'relative' }}>
                {design.showSession && (
                    <div
                        className="absolute top-2.5 right-2.5 text-[8px] font-black px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: theme.accentColor + '33', color: theme.accentColor }}
                    >
                        {design.sessionYear}
                    </div>
                )}
                <div className="flex items-center gap-2.5">
                    {/* School logo placeholder */}
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: theme.accentColor + '22', border: `1.5px solid ${theme.accentColor}44` }}
                    >
                        <GraduationCap size={18} style={{ color: theme.accentColor }} />
                    </div>
                    <div>
                        <p className="font-black text-[12px] leading-tight" style={{ color: theme.headerText }}>
                            {design.instituteName}
                        </p>
                        {design.showTagline && (
                            <p className="text-[8px] font-bold tracking-wider" style={{ color: theme.accentColor }}>
                                {design.tagline}
                            </p>
                        )}
                    </div>
                </div>

                {/* Accent strip */}
                <div
                    className="mt-3 text-center text-[8px] font-black uppercase tracking-[3px] py-1 rounded"
                    style={{ backgroundColor: theme.accentColor + '22', color: theme.accentColor, border: `1px solid ${theme.accentColor}33` }}
                >
                    Student Identity Card
                </div>
            </div>

            {/* ── PHOTO + NAME SECTION ── */}
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: '#f0f0f0' }}>
                <div
                    className="shrink-0 overflow-hidden border-2"
                    style={{
                        width: 58, height: 68,
                        borderRadius: avatarIsCircle ? '50%' : 8,
                        borderColor: theme.accentColor + '66',
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                    <p className="font-black text-gray-900 leading-tight truncate" style={{ fontSize: 13 }}>{student.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: theme.accentColor + '18', color: theme.accentColor }}
                        >
                            {student.class} – {student.section}
                        </span>
                        {design.showRoll && (
                            <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                Roll {student.rollNo}
                            </span>
                        )}
                    </div>
                    {design.showGender && (
                        <p className="text-[9px] font-bold text-gray-400 mt-0.5">{student.gender}</p>
                    )}
                </div>
            </div>

            {/* ── INFO ROWS ── */}
            <div className="px-4 py-3 space-y-1.5 flex-1">
                {[
                    { label: 'ADM NO.', value: student.id, always: true },
                    { label: 'D.O.B', value: student.dob, show: design.showDOB },
                    { label: 'BLOOD GRP', value: student.bloodGroup, show: design.showBlood, red: true },
                    { label: 'FATHER', value: student.fatherName, show: design.showFather },
                    { label: 'CONTACT', value: student.contact, show: design.showContact },
                    { label: 'VALIDITY', value: `Valid till Mar ${design.validityYear.split('-')[1] || '24'}`, show: design.showValidity },
                ].filter(r => r.always || r.show).map(({ label, value, red }) => (
                    <div key={label} className="flex items-start gap-1.5" style={{ fontSize: 9 }}>
                        <span className="font-black text-gray-400 uppercase tracking-wider shrink-0" style={{ width: 62 }}>{label}</span>
                        <span className="font-bold truncate" style={{ color: red ? '#dc2626' : '#111827' }}>{value}</span>
                    </div>
                ))}
            </div>

            {/* ── BARCODE ── */}
            {design.showBarcode && (
                <div className="px-4 pt-1 pb-2 flex flex-col items-center">
                    <div className="w-full h-7 flex items-end justify-center gap-px opacity-50">
                        {[3, 2, 5, 1, 4, 2, 3, 6, 2, 4, 3, 5, 2, 3, 4, 6, 1, 3, 2, 5, 3, 2, 4, 1, 3, 2, 5, 1, 4, 2].map((h, i) => (
                            <div key={i} style={{ height: `${h * 4}px`, backgroundColor: theme.headerBg, width: i % 3 === 0 ? '2px' : '1.5px' }} />
                        ))}
                    </div>
                    <p className="text-[7px] text-gray-400 font-bold tracking-widest mt-0.5">{student.id}</p>
                </div>
            )}

            {/* ── FOOTER: Signature (left) + school seal (right) ── */}
            <div
                className="flex items-end justify-between px-4 py-2.5"
                style={{ backgroundColor: theme.headerBg + '0d', borderTop: `1px solid ${theme.accentColor}22` }}
            >
                {/* Signature — bottom LEFT */}
                <div className="flex flex-col items-start">
                    <div className="border-b border-gray-400 pb-1 mb-1" style={{ width: 64 }}>
                        <span className="text-gray-300 italic text-[7px]">Signature</span>
                    </div>
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">Principal</span>
                </div>
                {/* Seal — bottom RIGHT */}
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ border: `1.5px dashed ${theme.accentColor}66`, backgroundColor: theme.accentColor + '10' }}
                >
                    <GraduationCap size={14} style={{ color: theme.accentColor }} />
                </div>
            </div>
        </div>
    );
};

// ---- TOGGLE SWITCH ----
const Toggle = ({ checked, onChange }) => (
    <div
        onClick={onChange}
        className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 cursor-pointer shrink-0 ${checked ? 'bg-[#C29543]' : 'bg-gray-200'}`}
    >
        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
);

// ---- MAIN COMPONENT ----
const StudentIdCard = () => {
    const [students, setStudents] = useState(mockStudents);
    const [searchQuery, setSearchQuery] = useState('');
    const [classFilter, setClassFilter] = useState('All Classes');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [previewStudentId, setPreviewStudentId] = useState(mockStudents[0].id);
    const [isDesignOpen, setIsDesignOpen] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
    const [design, setDesign] = useState(DEFAULT_DESIGN);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS = 5;

    const setD = (key, val) => setDesign(d => ({ ...d, [key]: val }));
    const toggleD = (key) => setDesign(d => ({ ...d, [key]: !d[key] }));

    const filteredStudents = useMemo(() =>
        students.filter(s => {
            const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchClass = classFilter === 'All Classes' || s.class === classFilter;
            const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;
            return matchSearch && matchClass && matchStatus;
        }), [students, searchQuery, classFilter, statusFilter]);

    const totalPages = Math.ceil(filteredStudents.length / ITEMS);
    const paginatedStudents = filteredStudents.slice((currentPage - 1) * ITEMS, currentPage * ITEMS);
    const selectedCount = students.filter(s => s.checked).length;
    const allFilteredChecked = filteredStudents.length > 0 && filteredStudents.every(s => s.checked);
    const activePreviewStudent = students.find(s => s.id === previewStudentId) || students[0];

    const toggleAll = () => {
        const newState = !allFilteredChecked;
        const ids = new Set(filteredStudents.map(s => s.id));
        setStudents(students.map(s => ids.has(s.id) ? { ...s, checked: newState } : s));
    };
    const toggleSingle = (id) => setStudents(students.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
    const handleGenerateSingle = (id) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: 'Generated' } : s));
        setPreviewStudentId(id);
        alert('ID Card generated successfully!');
    };
    const handleGenerateSelected = () => {
        if (selectedCount === 0) return alert('Please select at least one student.');
        setStudents(students.map(s => s.checked ? { ...s, status: 'Generated', checked: false } : s));
        alert(`${selectedCount} ID Card(s) generated successfully.`);
    };

    const uniqueClasses = ['All Classes', ...new Set(mockStudents.map(s => s.class))];

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-white font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student ID Cards</h1>
                    <p className="text-sm text-gray-500 mt-1">Generate, customize, and print student identity cards.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsDesignOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm">
                        <Palette size={16} /> Customize Design
                    </button>
                    <button onClick={handleGenerateSelected} disabled={selectedCount === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-sm ${selectedCount > 0 ? 'bg-[#C29543] text-white hover:bg-[#A67D35]' : 'bg-[#C29543]/50 text-white cursor-not-allowed'}`}>
                        <CheckCircle size={16} /> Generate ({selectedCount})
                    </button>
                </div>
            </div>

            {/* Tab */}
            <div className="border-b border-gray-200 mb-6">
                <button className="px-1 py-3 border-b-2 border-[#C29543] text-[#C29543] font-bold text-sm flex items-center gap-2">
                    <GraduationCap size={16} /> Generate Student ID Card
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">

                {/* LEFT: Table */}
                <div className="flex-1 min-w-0">
                    {/* Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Class</label>
                            <select value={classFilter} onChange={e => { setClassFilter(e.target.value); setCurrentPage(1); }} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#C29543] text-gray-700">
                                {uniqueClasses.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Card Status</label>
                            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#C29543] text-gray-700">
                                <option>All Status</option><option>Generated</option><option>Pending</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest invisible">Search</label>
                            <div className="relative">
                                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="Search by name or ID..." value={searchQuery}
                                    onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543] placeholder-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px] text-left">
                                <thead>
                                    <tr className="bg-gray-50/80 border-b border-gray-100">
                                        <th className="px-5 py-4 w-12">
                                            <div className="flex items-center justify-center">
                                                <input type="checkbox" checked={allFilteredChecked} onChange={toggleAll} className="w-4 h-4 rounded text-[#C29543] border-gray-300 cursor-pointer" />
                                            </div>
                                        </th>
                                        <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Student</th>
                                        <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Class / Roll</th>
                                        <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginatedStudents.length === 0 ? (
                                        <tr><td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-400">No students found.</td></tr>
                                    ) : paginatedStudents.map(student => (
                                        <tr key={student.id} className={`transition-colors group cursor-pointer ${student.id === previewStudentId ? 'bg-orange-50/50' : 'hover:bg-gray-50'} ${student.checked ? 'bg-orange-50/30' : ''}`}
                                            onClick={() => setPreviewStudentId(student.id)}>
                                            <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                                                <div className="flex items-center justify-center">
                                                    <input type="checkbox" checked={student.checked} onChange={() => toggleSingle(student.id)} className="w-4 h-4 rounded text-[#C29543] border-gray-300 cursor-pointer" />
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 group-hover:text-[#C29543] transition-colors">{student.name}</p>
                                                        <p className="text-[11px] font-medium text-gray-400">{student.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="text-sm font-bold text-gray-800">{student.class} - {student.section}</p>
                                                <p className="text-xs text-gray-400 font-medium">Roll: {student.rollNo}</p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${student.status === 'Generated' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-[#C29543]'}`}>
                                                    {student.status === 'Generated' ? <CheckCircle size={10} /> : <RefreshCw size={10} />}
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right" onClick={e => e.stopPropagation()}>
                                                {student.status === 'Generated' ? (
                                                    <button onClick={() => setPreviewStudentId(student.id)} className="px-4 py-1.5 border border-gray-200 text-gray-600 font-bold text-xs rounded-lg hover:bg-gray-50 bg-white shadow-sm">Preview</button>
                                                ) : (
                                                    <button onClick={() => handleGenerateSingle(student.id)} className="px-4 py-1.5 bg-[#C29543] text-white font-bold text-xs rounded-lg hover:bg-[#A67D35] shadow-sm">Generate</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
                            <p className="text-sm text-gray-500 font-medium">Showing <b className="text-gray-900">{filteredStudents.length > 0 ? (currentPage - 1) * ITEMS + 1 : 0}–{Math.min(currentPage * ITEMS, filteredStudents.length)}</b> of <b className="text-gray-900">{filteredStudents.length}</b></p>
                            {totalPages > 1 && (
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={15} /></button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                        <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 flex items-center justify-center rounded text-sm font-bold ${currentPage === p ? 'bg-[#C29543] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>{p}</button>
                                    ))}
                                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={15} /></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Card Preview Panel */}
                <div className="w-full xl:w-[360px] flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
                        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 text-sm">ID Card Preview</h3>
                            {/* Quick theme dots */}
                            <div className="flex gap-1.5">
                                {THEMES.map(t => (
                                    <button key={t.id} onClick={() => setSelectedTheme(t)} title={t.label}
                                        className={`w-5 h-5 rounded-full border-2 transition-transform ${selectedTheme.id === t.id ? 'border-gray-700 scale-125' : 'border-transparent hover:scale-110'}`}
                                        style={{ backgroundColor: t.headerBg }} />
                                ))}
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-6 border-b border-gray-100 flex items-center justify-center" style={{ minHeight: 460 }}>
                            <StudentIDCard student={activePreviewStudent} theme={selectedTheme} design={design} />
                        </div>

                        {/* Footer actions */}
                        <div className="p-4 grid grid-cols-2 gap-2 bg-white">
                            <button onClick={() => setIsDesignOpen(true)} className="flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-700 bg-white font-bold text-xs rounded-lg hover:bg-gray-50 shadow-sm">
                                <Palette size={13} /> Customize
                            </button>
                            <button onClick={() => window.print()} className="flex items-center justify-center gap-1.5 py-2 bg-[#C29543] text-white font-bold text-xs rounded-lg hover:bg-[#A67D35] shadow-sm">
                                <Printer size={13} /> Print Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============ CUSTOMIZER MODAL ============ */}
            {isDesignOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-h-[92vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2"><Palette size={18} className="text-[#C29543]" /> Customize ID Card</h3>
                            <button onClick={() => setIsDesignOpen(false)} className="text-gray-400 hover:text-gray-700 p-1.5"><X size={18} /></button>
                        </div>

                        <div className="flex flex-col md:flex-row overflow-hidden flex-1 min-h-0">
                            {/* Settings Panel (scrollable) */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-7 border-r border-gray-100">

                                {/* 1. Color Theme */}
                                <section>
                                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Palette size={11} /> Color Theme</h4>
                                    <div className="grid grid-cols-5 gap-2">
                                        {THEMES.map(t => (
                                            <button key={t.id} onClick={() => setSelectedTheme(t)} title={t.label}
                                                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border text-center transition-all ${selectedTheme.id === t.id ? 'border-[#C29543] bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                                <div className="w-8 h-8 rounded-md" style={{ backgroundColor: t.headerBg }} />
                                                <span className="text-[9px] font-bold text-gray-500 leading-tight">{t.label}</span>
                                                {selectedTheme.id === t.id && <CheckCircle size={10} className="text-[#C29543]" />}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* 2. Card Layout */}
                                <section>
                                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Layout size={11} /> Card Layout</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[['normal', 'Standard (255px)'], ['wide', 'Wide (290px)']].map(([val, lbl]) => (
                                            <button key={val} onClick={() => setD('cardWidth', val)}
                                                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${design.cardWidth === val ? 'border-[#C29543] bg-orange-50 text-[#C29543]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                                {lbl}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {[['rounded', 'Square Photo'], ['circle', 'Round Photo']].map(([val, lbl]) => (
                                            <button key={val} onClick={() => setD('avatarShape', val)}
                                                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${design.avatarShape === val ? 'border-[#C29543] bg-orange-50 text-[#C29543]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                                {lbl}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* 3. School Info */}
                                <section>
                                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Type size={11} /> School Info</h4>
                                    <div className="space-y-2.5">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Institute Name</label>
                                            <input type="text" value={design.instituteName} onChange={e => setD('instituteName', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tagline / Motto</label>
                                            <input type="text" value={design.tagline} onChange={e => setD('tagline', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Session Year</label>
                                                <input type="text" value={design.sessionYear} onChange={e => setD('sessionYear', e.target.value)}
                                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Validity Year</label>
                                                <input type="text" value={design.validityYear} onChange={e => setD('validityYear', e.target.value)}
                                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* 4. Fields to Display */}
                                <section>
                                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><ToggleLeft size={11} /> Fields &amp; Elements</h4>
                                    <div className="space-y-2">
                                        {[
                                            { key: 'showDOB', label: 'Date of Birth' },
                                            { key: 'showBlood', label: 'Blood Group' },
                                            { key: 'showFather', label: "Father's Name" },
                                            { key: 'showContact', label: 'Contact Number' },
                                            { key: 'showRoll', label: 'Roll Number' },
                                            { key: 'showGender', label: 'Gender' },
                                            { key: 'showSession', label: 'Session Badge (header)' },
                                            { key: 'showTagline', label: 'School Tagline' },
                                            { key: 'showValidity', label: 'Validity Date' },
                                            { key: 'showBarcode', label: 'Barcode Strip' },
                                        ].map(({ key, label }) => (
                                            <label key={key} className="flex items-center justify-between gap-3 py-1.5 cursor-pointer group">
                                                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">{label}</span>
                                                <Toggle checked={design[key]} onChange={() => toggleD(key)} />
                                            </label>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Live Preview Panel */}
                            <div className="w-full md:w-[320px] flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-50 flex flex-col items-center justify-center p-6 gap-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Preview</p>
                                <StudentIDCard student={activePreviewStudent} theme={selectedTheme} design={design} />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                            <button onClick={() => { setDesign(DEFAULT_DESIGN); setSelectedTheme(THEMES[0]); }} className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Reset</button>
                            <button onClick={() => setIsDesignOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                            <button onClick={() => setIsDesignOpen(false)} className="px-5 py-2 text-xs font-bold text-white bg-[#C29543] rounded-lg hover:bg-[#A67D35]">Apply Design</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentIdCard;
