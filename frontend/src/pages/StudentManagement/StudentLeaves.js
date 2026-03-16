import React, { useState, useMemo } from 'react';
import {
    ClipboardList, Search, CheckCircle, XCircle,
    Clock, ChevronLeft, ChevronRight,
    Calendar, AlertCircle, Eye, X, MessageSquare
} from 'lucide-react';

// --- MOCK DATA ---
const initialLeaves = [
    { id: 1, studentId: 'ADM-001', studentName: 'Aarav Sharma', class: 'Grade 5', section: 'A', type: 'Sick Leave', from: '2024-03-01', to: '2024-03-03', days: 3, reason: 'Had high fever and doctor advised rest.', status: 'Pending', appliedOn: '2024-02-29', remark: '' },
    { id: 2, studentId: 'ADM-002', studentName: 'Priya Verma', class: 'Grade 5', section: 'A', type: 'Festival Leave', from: '2024-03-10', to: '2024-03-11', days: 2, reason: 'Family festival celebration.', status: 'Pending', appliedOn: '2024-03-08', remark: '' },
    { id: 3, studentId: 'ADM-003', studentName: 'Rohan Gupta', class: 'Grade 8', section: 'B', type: 'Personal Reason', from: '2024-03-15', to: '2024-03-15', days: 1, reason: 'Personal work at home.', status: 'Approved', appliedOn: '2024-03-14', remark: 'Approved. Please submit homework on return.' },
    { id: 4, studentId: 'ADM-004', studentName: 'Sneha Patel', class: 'Grade 10', section: 'C', type: 'Medical Appointment', from: '2024-03-20', to: '2024-03-20', days: 1, reason: 'Scheduled dental checkup.', status: 'Approved', appliedOn: '2024-03-18', remark: 'Approved. Bring medical slip on return.' },
    { id: 5, studentId: 'ADM-005', studentName: 'Kabir Singh', class: 'Grade 5', section: 'B', type: 'Family Emergency', from: '2024-03-22', to: '2024-03-24', days: 3, reason: 'Grandfather hospitalized.', status: 'Pending', appliedOn: '2024-03-21', remark: '' },
    { id: 6, studentId: 'ADM-001', studentName: 'Aarav Sharma', class: 'Grade 5', section: 'A', type: 'Personal Reason', from: '2024-04-01', to: '2024-04-02', days: 2, reason: 'Out of station with parents.', status: 'Rejected', appliedOn: '2024-03-30', remark: 'Rejected due to upcoming exams. Please plan accordingly.' },
    { id: 7, studentId: 'ADM-002', studentName: 'Priya Verma', class: 'Grade 5', section: 'A', type: 'Sick Leave', from: '2024-04-05', to: '2024-04-06', days: 2, reason: 'Cold and cough.', status: 'Approved', appliedOn: '2024-04-04', remark: 'Approved. Get well soon.' },
    { id: 8, studentId: 'ADM-003', studentName: 'Rohan Gupta', class: 'Grade 8', section: 'B', type: 'Bereavement Leave', from: '2024-04-10', to: '2024-04-12', days: 3, reason: 'Relative passed away.', status: 'Pending', appliedOn: '2024-04-10', remark: '' },
    { id: 9, studentId: 'ADM-004', studentName: 'Sneha Patel', class: 'Grade 10', section: 'C', type: 'Sick Leave', from: '2024-04-15', to: '2024-04-15', days: 1, reason: 'Stomach infection.', status: 'Rejected', appliedOn: '2024-04-14', remark: 'Rejected. Please provide medical certificate.' },
    { id: 10, studentId: 'ADM-005', studentName: 'Kabir Singh', class: 'Grade 5', section: 'B', type: 'Medical Appointment', from: '2024-04-20', to: '2024-04-20', days: 1, reason: 'Eye checkup.', status: 'Pending', appliedOn: '2024-04-19', remark: '' },
    { id: 11, studentId: 'ADM-001', studentName: 'Aarav Sharma', class: 'Grade 5', section: 'A', type: 'Personal Reason', from: '2024-05-01', to: '2024-05-02', days: 2, reason: 'Family trip planned.', status: 'Approved', appliedOn: '2024-04-28', remark: 'Approved. Collect notes from friends.' },
    { id: 12, studentId: 'ADM-002', studentName: 'Priya Verma', class: 'Grade 5', section: 'A', type: 'Festival Leave', from: '2024-05-10', to: '2024-05-10', days: 1, reason: 'Eid celebration.', status: 'Rejected', appliedOn: '2024-05-08', remark: 'Rejected. Unit test scheduled on this date.' },
];

const LEAVE_TYPES = ['Sick Leave', 'Family Emergency', 'Medical Appointment', 'Festival Leave', 'Personal Reason', 'Bereavement Leave', 'Other'];
const ITEMS_PER_PAGE = 5;

const statusConfig = {
    Approved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: <CheckCircle size={11} /> },
    Rejected: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: <XCircle size={11} /> },
    Pending: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', icon: <Clock size={11} /> },
};

const StudentAvatar = ({ id, name }) => (
    <img src={`https://i.pravatar.cc/40?u=${id}`} alt={name} className="w-9 h-9 rounded-full border border-gray-200 shrink-0 object-cover" />
);

const Pagination = ({ currentPage, totalPages, onChange }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center gap-1">
            <button onClick={() => onChange(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={15} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => onChange(p)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === p ? 'bg-[#C29543] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{p}</button>
            ))}
            <button onClick={() => onChange(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={15} /></button>
        </div>
    );
};

export default function StudentLeaves() {
    const [activeTab, setActiveTab] = useState('pending');
    const [leaves, setLeaves] = useState(initialLeaves);

    // Approval modal state
    const [actionModal, setActionModal] = useState(null); // { id, type: 'approve'|'reject' }
    const [remark, setRemark] = useState('');
    const [remarkError, setRemarkError] = useState('');

    // View detail modal
    const [viewLeave, setViewLeave] = useState(null);

    // Pending tab filters
    const [pendingSearch, setPendingSearch] = useState('');
    const [pendingType, setPendingType] = useState('All');
    const [pendingPage, setPendingPage] = useState(1);

    // History tab filters
    const [historySearch, setHistorySearch] = useState('');
    const [historyStatus, setHistoryStatus] = useState('All');
    const [historyType, setHistoryType] = useState('All');
    const [historyPage, setHistoryPage] = useState(1);

    // --- DATA ---
    const pendingLeaves = useMemo(() =>
        leaves.filter(l => l.status === 'Pending' &&
            (pendingType === 'All' || l.type === pendingType) &&
            (l.studentName.toLowerCase().includes(pendingSearch.toLowerCase()) || l.studentId.toLowerCase().includes(pendingSearch.toLowerCase()))
        ), [leaves, pendingSearch, pendingType]);

    const historyLeaves = useMemo(() =>
        leaves.filter(l => l.status !== 'Pending' &&
            (historyStatus === 'All' || l.status === historyStatus) &&
            (historyType === 'All' || l.type === historyType) &&
            (l.studentName.toLowerCase().includes(historySearch.toLowerCase()) || l.studentId.toLowerCase().includes(historySearch.toLowerCase()))
        ), [leaves, historySearch, historyStatus, historyType]);

    const pendingTotalPages = Math.ceil(pendingLeaves.length / ITEMS_PER_PAGE);
    const historyTotalPages = Math.ceil(historyLeaves.length / ITEMS_PER_PAGE);

    const paginatedPending = pendingLeaves.slice((pendingPage - 1) * ITEMS_PER_PAGE, pendingPage * ITEMS_PER_PAGE);
    const paginatedHistory = historyLeaves.slice((historyPage - 1) * ITEMS_PER_PAGE, historyPage * ITEMS_PER_PAGE);

    const pendingCount = leaves.filter(l => l.status === 'Pending').length;
    const approvedCount = leaves.filter(l => l.status === 'Approved').length;
    const rejectedCount = leaves.filter(l => l.status === 'Rejected').length;

    // --- ACTIONS ---
    const openActionModal = (leave, type) => {
        setActionModal({ id: leave.id, type });
        setRemark('');
        setRemarkError('');
    };

    const handleConfirmAction = () => {
        if (!remark.trim()) {
            setRemarkError('Please add a short remark before proceeding.');
            return;
        }
        const newStatus = actionModal.type === 'approve' ? 'Approved' : 'Rejected';
        setLeaves(leaves.map(l => l.id === actionModal.id ? { ...l, status: newStatus, remark: remark.trim() } : l));
        setActionModal(null);
        setRemark('');
    };

    // --- RENDER HELPERS ---
    const TableHeader = () => (
        <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Student</th>
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Leave Type</th>
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Duration</th>
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Applied On</th>
                <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
        </thead>
    );

    const EmptyRow = ({ colSpan = 5, message = 'No records found.' }) => (
        <tr><td colSpan={colSpan} className="py-14 text-center"><AlertCircle size={32} className="mx-auto text-gray-200 mb-2" /><p className="text-sm text-gray-400 font-medium">{message}</p></td></tr>
    );

    const FilterBar = ({ search, setSearch, type, setType, extra }) => (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search student name or ID..." value={search} onChange={e => { setSearch(e.target.value); }} className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C29543]" />
            </div>
            <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#C29543]">
                <option value="All">All Types</option>
                {LEAVE_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            {extra}
        </div>
    );

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Leave Management</h1>
                <p className="text-sm text-gray-500 mt-1">Review pending applications and view leave history.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: 'Pending', value: pendingCount, icon: <Clock size={18} />, color: 'text-orange-500', ring: 'ring-orange-100' },
                    { label: 'Approved', value: approvedCount, icon: <CheckCircle size={18} />, color: 'text-green-600', ring: 'ring-green-100' },
                    { label: 'Rejected', value: rejectedCount, icon: <XCircle size={18} />, color: 'text-red-500', ring: 'ring-red-100' },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                        <div className={`p-2.5 rounded-lg ring-2 bg-white ${s.color} ${s.ring}`}>{s.icon}</div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">{s.value}</p>
                            <p className="text-xs font-bold text-gray-500">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm mb-5 w-fit">
                <button onClick={() => setActiveTab('pending')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'pending' ? 'bg-[#C29543] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                    <Clock size={15} /> Pending Applications
                    {pendingCount > 0 && <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'}`}>{pendingCount}</span>}
                </button>
                <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'history' ? 'bg-[#C29543] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                    <ClipboardList size={15} /> Leave History
                </button>
            </div>

            {/* ---- PENDING TAB ---- */}
            {activeTab === 'pending' && (
                <div className="space-y-4">
                    <FilterBar
                        search={pendingSearch} setSearch={v => { setPendingSearch(v); setPendingPage(1); }}
                        type={pendingType} setType={v => { setPendingType(v); setPendingPage(1); }}
                    />
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 text-sm">Pending Leave Applications</h3>
                            <span className="text-xs font-bold text-gray-400">{pendingLeaves.length} application{pendingLeaves.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[750px] text-left">
                                <TableHeader />
                                <tbody className="divide-y divide-gray-50">
                                    {paginatedPending.length === 0 ? <EmptyRow message="No pending applications found." /> : paginatedPending.map(leave => (
                                        <tr key={leave.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <StudentAvatar id={leave.studentId} name={leave.studentName} />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 leading-tight">{leave.studentName}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{leave.studentId} • {leave.class}-{leave.section}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded">{leave.type}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-bold text-gray-800">{leave.from} → {leave.to}</p>
                                                <p className="text-xs font-bold text-[#C29543] mt-0.5">{leave.days} day{leave.days !== 1 ? 's' : ''}</p>
                                            </td>
                                            <td className="px-5 py-4 text-sm font-medium text-gray-600">{leave.appliedOn}</td>
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => setViewLeave(leave)} className="p-1.5 text-gray-400 hover:text-[#C29543] bg-gray-50 border border-gray-200 rounded" title="View Details"><Eye size={14} /></button>
                                                    <button onClick={() => openActionModal(leave, 'approve')} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                                                        <CheckCircle size={13} /> Approve
                                                    </button>
                                                    <button onClick={() => openActionModal(leave, 'reject')} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                                                        <XCircle size={13} /> Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-5 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className="text-sm text-gray-500 font-medium">Showing <b className="text-gray-900">{Math.min((pendingPage - 1) * ITEMS_PER_PAGE + 1, pendingLeaves.length || 0)}</b>–<b className="text-gray-900">{Math.min(pendingPage * ITEMS_PER_PAGE, pendingLeaves.length)}</b> of <b className="text-gray-900">{pendingLeaves.length}</b></p>
                            <Pagination currentPage={pendingPage} totalPages={pendingTotalPages} onChange={setPendingPage} />
                        </div>
                    </div>
                </div>
            )}

            {/* ---- HISTORY TAB ---- */}
            {activeTab === 'history' && (
                <div className="space-y-4">
                    <FilterBar
                        search={historySearch} setSearch={v => { setHistorySearch(v); setHistoryPage(1); }}
                        type={historyType} setType={v => { setHistoryType(v); setHistoryPage(1); }}
                        extra={
                            <select value={historyStatus} onChange={e => { setHistoryStatus(e.target.value); setHistoryPage(1); }} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#C29543]">
                                <option value="All">All Status</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        }
                    />
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 text-sm">Leave History (Approved & Rejected)</h3>
                            <span className="text-xs font-bold text-gray-400">{historyLeaves.length} record{historyLeaves.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] text-left">
                                <thead>
                                    <tr className="bg-gray-50/80 border-b border-gray-100">
                                        <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Student</th>
                                        <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Leave Type</th>
                                        <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Duration</th>
                                        <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Remark</th>
                                        <th className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginatedHistory.length === 0 ? <EmptyRow colSpan={6} message="No history records found." /> : paginatedHistory.map(leave => {
                                        const cfg = statusConfig[leave.status];
                                        return (
                                            <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <StudentAvatar id={leave.studentId} name={leave.studentName} />
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900 leading-tight">{leave.studentName}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{leave.class}-{leave.section}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded">{leave.type}</span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-bold text-gray-800">{leave.from} → {leave.to}</p>
                                                    <p className="text-xs font-bold text-[#C29543] mt-0.5">{leave.days} day{leave.days !== 1 ? 's' : ''}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                                                        {cfg.icon} {leave.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 max-w-[200px]">
                                                    {leave.remark ? (
                                                        <p className="text-xs text-gray-600 font-medium truncate" title={leave.remark}>{leave.remark}</p>
                                                    ) : (
                                                        <span className="text-xs text-gray-300 italic">—</span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <button onClick={() => setViewLeave(leave)} className="p-1.5 text-gray-400 hover:text-[#C29543] bg-gray-50 border border-gray-200 rounded" title="View"><Eye size={14} /></button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-5 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className="text-sm text-gray-500 font-medium">Showing <b className="text-gray-900">{Math.min((historyPage - 1) * ITEMS_PER_PAGE + 1, historyLeaves.length || 0)}</b>–<b className="text-gray-900">{Math.min(historyPage * ITEMS_PER_PAGE, historyLeaves.length)}</b> of <b className="text-gray-900">{historyLeaves.length}</b></p>
                            <Pagination currentPage={historyPage} totalPages={historyTotalPages} onChange={setHistoryPage} />
                        </div>
                    </div>
                </div>
            )}

            {/* ---- APPROVE / REJECT MODAL ---- */}
            {actionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                        <div className={`px-6 py-4 border-b flex items-center gap-3 ${actionModal.type === 'approve' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                            {actionModal.type === 'approve' ? <CheckCircle size={20} className="text-green-600" /> : <XCircle size={20} className="text-red-500" />}
                            <h3 className="font-bold text-gray-900">{actionModal.type === 'approve' ? 'Approve Leave' : 'Reject Leave'}</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600">
                                {actionModal.type === 'approve'
                                    ? 'You are about to approve this leave request. Please add a short remark for the student.'
                                    : 'You are about to reject this leave request. Please provide a reason for the student.'}
                            </p>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold tracking-wide text-gray-500 uppercase flex items-center gap-1.5">
                                    <MessageSquare size={12} /> Remark / Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={remark}
                                    onChange={e => { setRemark(e.target.value); setRemarkError(''); }}
                                    rows={3}
                                    placeholder={actionModal.type === 'approve' ? 'e.g. Approved. Please submit notes on return.' : 'e.g. Rejected due to upcoming exams.'}
                                    className={`w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm resize-none focus:outline-none focus:border-[#C29543] ${remarkError ? 'border-red-400' : 'border-gray-200'}`}
                                />
                                {remarkError && <p className="text-xs text-red-500 font-medium">{remarkError}</p>}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
                            <button onClick={() => setActionModal(null)} className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                            <button
                                onClick={handleConfirmAction}
                                className={`px-5 py-2 text-xs font-bold text-white rounded-lg transition-colors ${actionModal.type === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}
                            >
                                Confirm {actionModal.type === 'approve' ? 'Approval' : 'Rejection'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ---- VIEW LEAVE DETAIL MODAL ---- */}
            {viewLeave && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2"><Eye size={16} className="text-[#C29543]" /> Leave Details</h3>
                            <button onClick={() => setViewLeave(null)} className="text-gray-400 hover:text-gray-600 p-1"><X size={18} /></button>
                        </div>
                        <div className="p-6 space-y-4 text-sm">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <StudentAvatar id={viewLeave.studentId} name={viewLeave.studentName} />
                                <div>
                                    <p className="font-black text-gray-900">{viewLeave.studentName}</p>
                                    <p className="text-xs text-gray-500 font-bold">{viewLeave.studentId} • {viewLeave.class}-{viewLeave.section}</p>
                                </div>
                                <span className={`ml-auto text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border flex items-center gap-1 ${statusConfig[viewLeave.status].bg} ${statusConfig[viewLeave.status].text} ${statusConfig[viewLeave.status].border}`}>
                                    {statusConfig[viewLeave.status].icon} {viewLeave.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Leave Type', val: viewLeave.type },
                                    { label: 'Duration', val: `${viewLeave.days} day${viewLeave.days !== 1 ? 's' : ''}` },
                                    { label: 'From', val: viewLeave.from },
                                    { label: 'To', val: viewLeave.to },
                                    { label: 'Applied On', val: viewLeave.appliedOn },
                                ].map(({ label, val }) => (
                                    <div key={label} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                                        <p className="font-bold text-gray-800 text-sm">{val}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Reason</p>
                                <p className="text-gray-800 leading-relaxed">{viewLeave.reason}</p>
                            </div>
                            {viewLeave.remark && (
                                <div className={`rounded-lg p-3 border ${viewLeave.status === 'Approved' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Admin Remark</p>
                                    <p className={`font-medium leading-relaxed ${viewLeave.status === 'Approved' ? 'text-green-800' : 'text-red-700'}`}>{viewLeave.remark}</p>
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button onClick={() => setViewLeave(null)} className="px-4 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
