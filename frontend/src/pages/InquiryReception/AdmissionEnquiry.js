import React, { useState } from 'react';
import {
    PhoneCall, Plus, Search, Filter, MoreVertical,
    CalendarDays, User, Phone, CheckCircle, Clock,
    XCircle, History, MessageSquare, ChevronDown
} from 'lucide-react';

// --- MOCK DATA ---
const mockEnquiries = [
    { id: 'ENQ-1001', studentName: 'Aarav Sharma', parentName: 'Ramesh Sharma', phone: '+91 9876543210', classApplied: 'Grade 5', date: '25-Oct-2023', status: 'New', nextFollowUp: '26-Oct-2023', source: 'Website', history: [] },
    { id: 'ENQ-1002', studentName: 'Priya Verma', parentName: 'Anita Verma', phone: '+91 9876543211', classApplied: 'Grade 1', date: '24-Oct-2023', status: 'Follow-up', nextFollowUp: '28-Oct-2023', source: 'Walk-in', history: [{ date: '25-Oct-2023', note: 'Called, requested fee structure.', by: 'Admin' }] },
    { id: 'ENQ-1003', studentName: 'Rohan Gupta', parentName: 'Sanjay Gupta', phone: '+91 9876543212', classApplied: 'Grade 8', date: '20-Oct-2023', status: 'Converted', nextFollowUp: '-', source: 'Referral', history: [{ date: '21-Oct-2023', note: 'Visited campus, admission form submitted.', by: 'Admin' }] },
    { id: 'ENQ-1004', studentName: 'Sneha Patel', parentName: 'Rahul Patel', phone: '+91 9876543213', classApplied: 'Nursery', date: '18-Oct-2023', status: 'Dropped', nextFollowUp: '-', source: 'Facebook', history: [{ date: '20-Oct-2023', note: 'Admitted to another school.', by: 'Admin' }] },
    { id: 'ENQ-1005', studentName: 'Kabir Singh', parentName: 'Neha Singh', phone: '+91 9876543214', classApplied: 'Grade 3', date: '26-Oct-2023', status: 'New', nextFollowUp: '27-Oct-2023', source: 'Walk-in', history: [] },
];

const AdmissionEnquiry = () => {
    const [enquiries, setEnquiries] = useState(mockEnquiries);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // UI States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
    const [activeEnquiry, setActiveEnquiry] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);

    // Form States
    const [newEnquiry, setNewEnquiry] = useState({ studentName: '', parentName: '', phone: '', classApplied: 'Nursery', source: 'Walk-in' });
    const [followUpNote, setFollowUpNote] = useState({ note: '', nextDate: '', newStatus: '' });

    // --- ACTIONS ---

    const handleAddEnquiry = () => {
        const id = `ENQ-${1000 + enquiries.length + 1}`;
        const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');

        const enquiry = {
            id,
            ...newEnquiry,
            date,
            status: 'New',
            nextFollowUp: 'Pending',
            history: []
        };

        setEnquiries([enquiry, ...enquiries]);
        setIsAddModalOpen(false);
        setNewEnquiry({ studentName: '', parentName: '', phone: '', classApplied: 'Nursery', source: 'Walk-in' });
        alert('Enquiry added successfully!');
    };

    const handleSaveFollowUp = () => {
        if (!followUpNote.note) return alert('Please enter a follow-up note.');

        setEnquiries(enquiries.map(enq => {
            if (enq.id === activeEnquiry.id) {
                const updatedHistory = [{
                    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
                    note: followUpNote.note,
                    by: 'Admin'
                }, ...enq.history];

                return {
                    ...enq,
                    history: updatedHistory,
                    status: followUpNote.newStatus || enq.status,
                    nextFollowUp: followUpNote.nextDate || enq.nextFollowUp
                };
            }
            return enq;
        }));

        setIsFollowUpModalOpen(false);
        setFollowUpNote({ note: '', nextDate: '', newStatus: '' });
        alert('Follow-up recorded successfully!');
    };

    const openFollowUpModal = (enquiry) => {
        setActiveEnquiry(enquiry);
        setFollowUpNote({ note: '', nextDate: '', newStatus: enquiry.status });
        setIsFollowUpModalOpen(true);
    };

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    // --- FILTERS ---
    const filteredEnquiries = enquiries.filter(enq => {
        const matchSearch = enq.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            enq.phone.includes(searchQuery) ||
            enq.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'All' || enq.status === statusFilter;
        return matchSearch && matchStatus;
    });

    // --- STATUS HELPERS ---
    const getStatusStyles = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-50 text-blue-600 border border-blue-200';
            case 'Follow-up': return 'bg-orange-50 text-orange-600 border border-orange-200';
            case 'Converted': return 'bg-green-50 text-green-600 border border-green-200';
            case 'Dropped': return 'bg-red-50 text-red-600 border border-red-200';
            default: return 'bg-gray-50 text-gray-600 border border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'New': return <Plus size={12} />;
            case 'Follow-up': return <Clock size={12} />;
            case 'Converted': return <CheckCircle size={12} />;
            case 'Dropped': return <XCircle size={12} />;
            default: return null;
        }
    };

    // --- RENDER MODALS ---

    const renderAddModal = () => {
        if (!isAddModalOpen) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">New Admission Enquiry</h3>
                            <p className="text-xs text-gray-500 mt-1">Record a new walk-in or phone enquiry.</p>
                        </div>
                        <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                            <XCircle size={20} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4 text-sm font-medium">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-gray-700">Student Name <span className="text-red-500">*</span></label>
                                <input type="text" value={newEnquiry.studentName} onChange={(e) => setNewEnquiry({ ...newEnquiry, studentName: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]" placeholder="e.g. Aarav Sharma" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-gray-700">Class Applied For</label>
                                <select value={newEnquiry.classApplied} onChange={(e) => setNewEnquiry({ ...newEnquiry, classApplied: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]">
                                    <option>Nursery</option>
                                    <option>LKG</option>
                                    <option>UKG</option>
                                    <option>Grade 1</option>
                                    <option>Grade 5</option>
                                    <option>Grade 8</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-gray-700">Parent/Guardian Name</label>
                                <input type="text" value={newEnquiry.parentName} onChange={(e) => setNewEnquiry({ ...newEnquiry, parentName: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]" placeholder="Name" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                <input type="text" value={newEnquiry.phone} onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]" placeholder="+91 xxxxxxxxxx" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-gray-700">Source of Enquiry</label>
                            <select value={newEnquiry.source} onChange={(e) => setNewEnquiry({ ...newEnquiry, source: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543]">
                                <option>Walk-in</option>
                                <option>Phone Call</option>
                                <option>Website</option>
                                <option>Social Media</option>
                                <option>Referral</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Cancel</button>
                        <button onClick={handleAddEnquiry} className="px-5 py-2 text-sm font-bold text-white bg-[#C29543] rounded-lg hover:bg-[#A67D35] transition-colors shadow-sm">Save Enquiry</button>
                    </div>
                </div>
            </div>
        );
    };

    const renderFollowUpModal = () => {
        if (!isFollowUpModalOpen || !activeEnquiry) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <History size={20} className="text-[#C29543]" /> Record Follow-up
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">For {activeEnquiry.studentName} ({activeEnquiry.id})</p>
                        </div>
                        <button onClick={() => setIsFollowUpModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 p-2 rounded-lg transition-colors shadow-sm">
                            <XCircle size={18} />
                        </button>
                    </div>
                    <div className="p-6 space-y-5 text-sm font-medium">
                        <div className="space-y-2">
                            <label className="text-gray-700 font-bold block">Follow-up Notes / Discussion <span className="text-red-500">*</span></label>
                            <textarea
                                value={followUpNote.note}
                                onChange={(e) => setFollowUpNote({ ...followUpNote, note: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543] shadow-sm text-gray-800"
                                placeholder="E.g., Spoke to father, they will visit the campus tomorrow..."
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-gray-700 font-bold block">Update Status</label>
                                <select
                                    value={followUpNote.newStatus}
                                    onChange={(e) => setFollowUpNote({ ...followUpNote, newStatus: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543] shadow-sm text-gray-800"
                                >
                                    <option value="New">New</option>
                                    <option value="Follow-up">Follow-up</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Dropped">Dropped</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700 font-bold block">Next Follow-up Date</label>
                                <input
                                    type="date"
                                    value={followUpNote.nextDate}
                                    onChange={(e) => setFollowUpNote({ ...followUpNote, nextDate: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543] shadow-sm text-gray-800"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                        <button onClick={() => setIsFollowUpModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
                        <button onClick={handleSaveFollowUp} className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#C29543] rounded-lg hover:bg-[#A67D35] transition-colors shadow-sm">
                            <CheckCircle size={16} /> Save Record
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
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admission Enquiries</h1>
                    <p className="text-sm text-gray-500 mt-1">Track prospective students, manage follow-ups, and convert leads.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                        <Filter size={16} /> Export Options
                    </button>
                    <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold shadow-sm shadow-[#C29543]/20 hover:bg-[#A67D35] transition-colors">
                        <Plus size={16} /> Add Enquiry
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Enquiries', value: enquiries.length, color: 'text-gray-900', bg: 'bg-white' },
                    { label: 'Pending Follow-ups', value: enquiries.filter(e => e.status === 'Follow-up' || e.status === 'New').length, color: 'text-orange-600', bg: 'bg-orange-50/50' },
                    { label: 'Converted Adm.', value: enquiries.filter(e => e.status === 'Converted').length, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Dropped', value: enquiries.filter(e => e.status === 'Dropped').length, color: 'text-red-600', bg: 'bg-red-50/50' },
                ].map((metric, idx) => (
                    <div key={idx} className={`p-5 rounded-xl border border-gray-100 shadow-sm ${metric.bg}`}>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{metric.label}</p>
                        <h4 className={`text-2xl font-black ${metric.color} tabular-nums`}>{metric.value}</h4>
                    </div>
                ))}
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                    {['All', 'New', 'Follow-up', 'Converted', 'Dropped'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${statusFilter === status
                                    ? 'bg-[#C29543] text-white shadow-md shadow-[#C29543]/20'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="relative w-full sm:w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, ID, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:bg-white transition-all text-gray-700"
                    />
                </div>
            </div>

            {/* Master Data Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-left mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Enquiry Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Class / Source</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status Tracking</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredEnquiries.map((enq) => (
                                <React.Fragment key={enq.id}>
                                    <tr className={`transition-colors hover:bg-gray-50 group cursor-pointer ${expandedRow === enq.id ? 'bg-orange-50/20' : ''}`} onClick={() => toggleRow(enq.id)}>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                    {enq.studentName}
                                                    {enq.history.length > 0 && <MessageSquare size={14} className="text-blue-400" />}
                                                </p>
                                                <p className="text-[11px] font-medium text-gray-400">{enq.id} | {enq.date}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><User size={14} className="text-gray-400" /> {enq.parentName}</p>
                                                <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 mt-0.5"><Phone size={12} className="text-[#C29543]" /> {enq.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-md">{enq.classApplied}</span>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-gray-200 px-1.5 py-0.5 rounded">{enq.source}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-2">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(enq.status)}`}>
                                                    {getStatusIcon(enq.status)} {enq.status}
                                                </span>
                                                {(enq.status === 'New' || enq.status === 'Follow-up') && (
                                                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                                                        <CalendarDays size={12} className="text-[#C29543]" /> Next: {enq.nextFollowUp}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {(enq.status !== 'Converted' && enq.status !== 'Dropped') && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); openFollowUpModal(enq); }}
                                                        className="px-4 py-1.5 bg-[#C29543] text-white font-bold text-xs rounded hover:bg-[#A67D35] transition-colors shadow-sm"
                                                    >
                                                        Follow-up
                                                    </button>
                                                )}
                                                <button
                                                    className={`p-1 text-gray-400 hover:text-gray-700 transition-transform ${expandedRow === enq.id ? 'rotate-180' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); toggleRow(enq.id); }}
                                                >
                                                    <ChevronDown size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Expandable History Row */}
                                    {expandedRow === enq.id && (
                                        <tr>
                                            <td colSpan="5" className="p-0 border-b-2 border-[#C29543]">
                                                <div className="bg-gray-50/80 p-6 shadow-inner relative">
                                                    <div className="absolute top-0 left-8 w-px h-full bg-gray-200 z-0"></div>

                                                    <h5 className="text-xs font-bold uppercase tracking-widest text-[#C29543] mb-4 relative z-10 pl-10 flex items-center">
                                                        <History size={14} className="mr-2" /> Follow-up Timeline
                                                    </h5>

                                                    {enq.history.length === 0 ? (
                                                        <p className="text-sm font-medium text-gray-500 italic pl-10 relative z-10">No follow-ups recorded yet. Click 'Follow-up' to add notes.</p>
                                                    ) : (
                                                        <div className="space-y-4 pl-10 relative z-10">
                                                            {enq.history.map((hist, idx) => (
                                                                <div key={idx} className="relative">
                                                                    <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full border-2 border-[#C29543] bg-white"></div>
                                                                    <div className="bg-white border border-gray-100 rounded-lg p-3 sm:p-4 shadow-sm">
                                                                        <div className="flex justify-between items-start mb-1">
                                                                            <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><CalendarDays size={12} /> {hist.date}</span>
                                                                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">by {hist.by}</span>
                                                                        </div>
                                                                        <p className="text-sm font-medium text-gray-800 leading-relaxed">{hist.note}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {filteredEnquiries.length === 0 && (
                        <div className="p-12 text-center text-gray-500 bg-gray-50">
                            <PhoneCall size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No enquiries found</h3>
                            <p className="text-sm">Try adjusting your search filters or add a new enquiry.</p>
                        </div>
                    )}
                </div>
            </div>

            {renderAddModal()}
            {renderFollowUpModal()}
        </div>
    );
};

export default AdmissionEnquiry;
