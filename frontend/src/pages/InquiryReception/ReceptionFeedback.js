import React, { useState, useMemo } from 'react';
import {
    MessagesSquare, Plus, Search, Filter,
    Star, CalendarDays, User, Clock, CheckCircle,
    XCircle, BarChart3, Download
} from 'lucide-react';

// --- MOCK DATA ---
const mockFeedbacks = [
    { id: 'FB-2023-001', visitorName: 'Ramesh Sharma', phone: '+91 9876543210', purpose: 'Admission Enquiry', rating: 5, comment: 'Staff was very helpful and explained the admission process clearly. The campus tour was great.', date: '26-Oct-2023', time: '10:30 AM', handledBy: 'Priya Desai' },
    { id: 'FB-2023-002', visitorName: 'Anita Verma', phone: '+91 9876543211', purpose: 'General Query', rating: 3, comment: 'Had to wait for 20 minutes at the reception before someone attended to me. Otherwise okay.', date: '26-Oct-2023', time: '11:15 AM', handledBy: 'Vikram Singh' },
    { id: 'FB-2023-003', visitorName: 'Sanjay Gupta', phone: '+91 9876543212', purpose: 'Meeting Principal', rating: 4, comment: 'Good management, meeting started right on time.', date: '25-Oct-2023', time: '02:00 PM', handledBy: 'Admin' },
    { id: 'FB-2023-004', visitorName: 'Rahul Patel', phone: '+91 9876543213', purpose: 'Fees Payment', rating: 5, comment: 'Quick and easy process at the accounts desk.', date: '24-Oct-2023', time: '09:45 AM', handledBy: 'Accounts Dept' },
    { id: 'FB-2023-005', visitorName: 'Deepak Chahar', phone: '+91 9876543214', purpose: 'Document Collection', rating: 2, comment: 'Documents were not ready even though I was told to come today.', date: '24-Oct-2023', time: '01:30 PM', handledBy: 'Admin' },
];

const ReceptionFeedback = () => {
    const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState('All');

    // UI States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activeFeedback, setActiveFeedback] = useState(null); // For detailed view

    // Form States
    const [newFeedback, setNewFeedback] = useState({
        visitorName: '', phone: '', purpose: 'Admission Enquiry', rating: 5, comment: ''
    });

    // --- ACTIONS ---

    const handleAddFeedback = () => {
        if (!newFeedback.visitorName || !newFeedback.phone) {
            return alert("Please fill in the visitor's name and phone number.");
        }

        const id = `FB-2023-${String(feedbacks.length + 1).padStart(3, '0')}`;
        const now = new Date();
        const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const feedback = {
            id,
            ...newFeedback,
            date,
            time,
            handledBy: 'Current User' // Mock logged in user
        };

        setFeedbacks([feedback, ...feedbacks]);
        setIsAddModalOpen(false);
        setNewFeedback({ visitorName: '', phone: '', purpose: 'Admission Enquiry', rating: 5, comment: '' });
        alert('Feedback recorded successfully!');
    };

    const handleExport = () => {
        alert("Exporting feedback reports to CSV...");
    };

    // --- FILTERS & METRICS ---

    const filteredFeedbacks = useMemo(() => {
        return feedbacks.filter(fb => {
            const matchSearch = fb.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fb.phone.includes(searchQuery) ||
                fb.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchRating = ratingFilter === 'All' || fb.rating === parseInt(ratingFilter);
            return matchSearch && matchRating;
        });
    }, [feedbacks, searchQuery, ratingFilter]);

    const averageRating = useMemo(() => {
        if (feedbacks.length === 0) return 0;
        const total = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
        return (total / feedbacks.length).toFixed(1);
    }, [feedbacks]);

    // --- RENDER HELPERS ---

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                    <Star
                        key={star}
                        size={14}
                        className={star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                    />
                ))}
            </div>
        );
    };

    const getScoreColor = (score) => {
        if (score >= 4.5) return 'text-green-600';
        if (score >= 3.5) return 'text-[#C29543]';
        if (score >= 2.5) return 'text-orange-500';
        return 'text-red-500';
    };

    // --- RENDER MODALS ---

    const renderAddModal = () => {
        if (!isAddModalOpen) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <MessagesSquare className="text-[#C29543]" size={20} />
                                Record Visitor Feedback
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">Log feedback directly from the reception desk.</p>
                        </div>
                        <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 p-2 rounded-lg transition-colors">
                            <XCircle size={20} />
                        </button>
                    </div>
                    <div className="p-6 space-y-5 text-sm font-medium">

                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-gray-700">Visitor Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={newFeedback.visitorName}
                                    onChange={(e) => setNewFeedback({ ...newFeedback, visitorName: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543] shadow-sm"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={newFeedback.phone}
                                    onChange={(e) => setNewFeedback({ ...newFeedback, phone: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543] shadow-sm"
                                    placeholder="+91 xxxxxxxxxx"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-gray-700">Purpose of Visit</label>
                            <select
                                value={newFeedback.purpose}
                                onChange={(e) => setNewFeedback({ ...newFeedback, purpose: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543] shadow-sm"
                            >
                                <option>Admission Enquiry</option>
                                <option>Fees Payment</option>
                                <option>Meeting Principal</option>
                                <option>Meeting Teacher</option>
                                <option>Document Collection</option>
                                <option>General Query</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-2 pb-2">
                            <label className="text-gray-700 block">Experience Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                                        className="p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                    >
                                        <Star size={32} className={`transition-colors ${newFeedback.rating >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-100 hover:fill-amber-100'}`} />
                                    </button>
                                ))}
                                <span className="ml-3 mt-1.5 text-gray-500 font-bold text-lg">
                                    {newFeedback.rating}/5
                                </span>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-gray-700">Additional Comments</label>
                            <textarea
                                value={newFeedback.comment}
                                onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 focus:border-[#C29543] shadow-sm"
                                placeholder="Any specific feedback or areas of improvement..."
                            ></textarea>
                        </div>

                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2 text-sm font-bold text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Cancel</button>
                        <button onClick={handleAddFeedback} className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#C29543] rounded-lg hover:bg-[#A67D35] transition-colors shadow-sm">
                            <CheckCircle size={16} /> Submit Feedback
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
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reception Feedback</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor visitor satisfaction and reception deck performance.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                        <Download size={16} /> Export Data
                    </button>
                    <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#C29543] text-white rounded-lg text-sm font-bold shadow-sm shadow-[#C29543]/20 hover:bg-[#A67D35] transition-colors">
                        <Plus size={16} /> Record Feedback
                    </button>
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* Score Card */}
                <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl z-0"></div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest relative z-10 mb-2">Average Rating</h4>
                    <div className="flex items-baseline gap-1 relative z-10">
                        <span className={`text-4xl font-black ${getScoreColor(averageRating)} tabular-nums`}>{averageRating}</span>
                        <span className="text-lg font-bold text-gray-400">/5</span>
                    </div>
                    <div className="flex gap-1 mt-3 relative z-10">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} size={18} className={star <= Math.round(averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                        ))}
                    </div>
                </div>

                {/* Sub Metrics */}
                <div className="md:col-span-3 grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total Logs', value: feedbacks.length, icon: MessagesSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { label: 'Positive (4-5)', value: feedbacks.filter(f => f.rating >= 4).length, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
                        { label: 'Needs Attention (1-3)', value: feedbacks.filter(f => f.rating <= 3).length, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
                    ].map((metric, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className={`p-2 rounded-lg ${metric.bg}`}>
                                    <metric.icon size={20} className={metric.color} />
                                </div>
                                <span className="text-xs font-bold text-gray-400">All Time</span>
                            </div>
                            <div>
                                <h4 className="text-3xl font-black text-gray-900 mt-4">{metric.value}</h4>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{metric.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reports Section (Table) */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">

                {/* Table Header / Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="text-gray-400" size={20} />
                        <h3 className="font-bold text-gray-900">Feedback Log</h3>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <select
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 shadow-sm text-gray-700"
                        >
                            <option value="All">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>

                        <div className="relative flex-1 sm:w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search visitor..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C29543]/20 shadow-sm text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="bg-white border-b border-gray-100 text-left">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Visitor Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Purpose</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Feedback/Comments</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Handled By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-left">
                            {filteredFeedbacks.map((fb) => (
                                <tr key={fb.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">{fb.visitorName}</p>
                                        <p className="text-[11px] font-medium text-gray-400 mt-1 flex flex-col gap-0.5">
                                            <span>{fb.phone}</span>
                                            <span>{fb.date} at {fb.time}</span>
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-gray-700 border border-gray-200 bg-white px-2.5 py-1 rounded shadow-sm">
                                            {fb.purpose}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {renderStars(fb.rating)}
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className={`text-sm font-medium leading-relaxed ${!fb.comment && 'text-gray-400 italic'}`}>
                                            {fb.comment || 'No comments provided.'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-xs font-bold text-[#C29543] bg-orange-50 px-2.5 py-1 rounded">
                                            {fb.handledBy}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredFeedbacks.length === 0 && (
                        <div className="p-12 text-center text-gray-500 bg-white">
                            <Filter size={48} className="mx-auto text-gray-200 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No feedback logs found</h3>
                            <p className="text-sm">We couldn't find any feedback matching your current filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {renderAddModal()}
        </div>
    );
};

export default ReceptionFeedback;
