import React from 'react';
import {
    Users, GraduationCap, Clock,
    BookOpen, CheckCircle2, AlertCircle,
    TrendingUp, Calendar, ArrowRight,
    MessageSquare, Bell, Star
} from 'lucide-react';

const TeacherDashboard = () => {
    const stats = [
        { label: 'Total Students', value: '42', icon: <Users size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Today Attendance', value: '96%', icon: <CheckCircle2 size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Pending Homework', value: '12', icon: <BookOpen size={20} />, color: 'text-[#C29543]', bg: 'bg-orange-50' },
        { label: 'Upcoming Exams', value: '03', icon: <ArrowRight size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const upcomingClasses = [
        { time: '09:00 AM', subject: 'Mathematics', class: 'Grade 10-A', status: 'In Progress' },
        { time: '11:00 AM', subject: 'Physics', class: 'Grade 11-B', status: 'Next' },
        { time: '01:30 PM', subject: 'Advanced Algebra', class: 'Grade 12-C', status: 'Scheduled' },
    ];

    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Teacher Console</h1>
                    <p className="text-sm text-gray-500 font-medium italic mt-1">Welcome back, Priya Verma. Here's your academic overview for today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 transition-all">
                        <Bell size={20} className="text-gray-400" />
                    </div>
                    <button className="flex items-center gap-2 px-6 h-12 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-[#C29543] transition-all shadow-lg active:scale-95">
                        <Clock size={18} /> Mark Attendance
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-[#C29543] transition-all group relative overflow-hidden">
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">{s.label}</p>
                                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                            </div>
                            <div className={`p-4 rounded-[22px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500`}>
                                {s.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Daily Schedule */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Calendar size={20} /></div>
                                <h3 className="text-lg font-black text-gray-900 uppercase italic tracking-tight underline decoration-blue-100 decoration-8">Today's Schedule</h3>
                            </div>
                            <button className="text-[10px] font-bold text-[#C29543] uppercase tracking-widest hover:underline">Full Timetable</button>
                        </div>

                        <div className="space-y-4">
                            {upcomingClasses.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-xs font-black text-gray-900">{item.time}</p>
                                            <div className="w-1 h-8 bg-blue-100 mx-auto my-1 rounded-full group-hover:bg-blue-400 transition-colors"></div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-gray-900 uppercase italic tracking-tight">{item.subject}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">{item.class}</p>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${item.status === 'In Progress' ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400 border border-gray-100'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions / Announcements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl group hover:scale-[1.02] transition-transform">
                            <h4 className="text-sm font-black italic tracking-widest uppercase mb-4 text-[#C29543]">Institutional Notices</h4>
                            <p className="text-xs text-gray-400 font-medium leading-relaxed mb-6">Staff meeting scheduled for next Monday regarding final assessments and term transition modules.</p>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] group-hover:translate-x-2 transition-transform">
                                READ MORE <ArrowRight size={14} className="text-[#C29543]" />
                            </button>
                        </div>
                        <div className="bg-white p-8 rounded-[40px] border border-[#C29543]/20 shadow-xl border-dashed">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl"><Star size={16} /></div>
                                <h4 className="text-sm font-extrabold italic text-gray-900">Performance Index</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Syllabus Progress</span>
                                        <span className="text-[10px] font-black text-blue-600 italic">82%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Content: Performance & Communication */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl">
                        <h3 className="text-sm font-black text-gray-900 uppercase italic tracking-widest mb-6 underline decoration-[#C29543]/20 decoration-4">Recent Submissions</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-4 p-2 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-[#C29543]/10 group-hover:text-[#C29543] transition-colors">
                                        SM
                                    </div>
                                    <div>
                                        <h5 className="text-[11px] font-black text-gray-900 uppercase leading-tight italic">Homework Submission</h5>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Student: Rahul Mevada • Algebra Section</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#C29543] hover:text-white transition-all">
                            Review All Activities
                        </button>
                    </div>

                    <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                            <TrendingUp size={120} />
                        </div>
                        <h4 className="text-sm font-black uppercase italic tracking-widest mb-2">Weekly Insights</h4>
                        <p className="text-3xl font-black mb-4 tracking-tighter italic">+12.4%</p>
                        <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Average class performance index improvement this week.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
