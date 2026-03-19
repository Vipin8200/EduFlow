import React, { useState } from 'react';
import {
    Video, PlayCircle, Plus, Search,
    MoreVertical, Award, BookOpen, Clock,
    LayoutGrid, List, Filter, Star,
    ShieldCheck, Database, Info, Monitor
} from 'lucide-react';

const mockCourses = [
    { id: 1, title: 'Quantum Physics Fundamentals', instructor: 'Dr. Arjun Mehta', lessons: 12, rating: 4.8, type: 'Video Course', status: 'Published' },
    { id: 2, title: 'Calculus Advanced Series', instructor: 'S. Kulkarni', lessons: 15, rating: 4.9, type: 'Interactive Task', status: 'Draft' },
    { id: 3, title: 'Molecular Biology Vol 1', instructor: 'Priya Verma', lessons: 8, rating: 4.5, type: 'Video Course', status: 'Published' },
    { id: 4, title: 'Medieval Wars Vol 2', instructor: 'R. Gupta', lessons: 10, rating: 4.7, type: 'Static Material', status: 'Public' },
];

const OnlineLearning = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Virtual Schooling Desktop</h1>
                    <p className="text-sm text-gray-500 font-medium">Digital course administration and student engagement hub.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm scale-90 md:scale-100 origin-right transition-transform overflow-hidden">
                    <button onClick={() => setViewMode('grid')} className={`p-2 px-6 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${viewMode === 'grid' ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-400 hover:text-gray-900'}`}><LayoutGrid size={14} className="inline mr-2" /> Gallery</button>
                    <button onClick={() => setViewMode('list')} className={`p-2 px-6 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${viewMode === 'list' ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-400 hover:text-gray-900'}`}><List size={14} className="inline mr-1" /> Table View</button>
                </div>
            </div>

            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Content Hours', val: '450.2', icon: <Clock />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Engaged Students', val: '1,245', icon: <Database />, color: 'text-green-600', bg: 'bg-green-50/50' },
                    { label: 'Active Courses', val: '28 Courses', icon: <Video />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Avg Rating', val: '4.8/5.0', icon: <Star />, color: 'text-yellow-600', bg: 'bg-yellow-50/50' },
                ].map((m, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">{m.label}</p>
                                <p className={`text-2xl font-black ${m.color}`}>{m.val}</p>
                            </div>
                            <div className={`p-3 rounded-2xl ${m.bg} ${m.color} group-hover:scale-110 transition-transform duration-500`}>
                                {React.cloneElement(m.icon, { size: 24 })}
                            </div>
                        </div>
                        <div className="h-0.5 w-full bg-gray-50 rounded-full overflow-hidden">
                            <div className={`h-full ${m.color.replace('text', 'bg')} transition-all duration-1000`} style={{ width: '70%' }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls Filter Bar */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Course or Subject..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100 placeholder:italic" />
                    </div>
                    <div className="flex gap-3">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>All Instructors</option>
                            {[1, 2, 3].map(i => <option key={i}>Prof. Faculty {i}</option>)}
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-xl shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <Plus size={18} /> Create Course
                    </button>
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#C29543] transition-all"><Monitor size={18} /></button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in zoom-in-95 duration-500">
                    {mockCourses.map(course => (
                        <div key={course.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-[#C29543] hover:shadow-2xl transition-all group overflow-hidden flex flex-col relative">
                            <div className="aspect-video bg-gray-100 relative overflow-hidden group-hover:scale-[1.05] transition-transform duration-700">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                                    <PlayCircle size={48} className="text-white drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                                </div>
                                <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-900 opacity-0 group-hover:opacity-100 transition-all outline outline-1 outline-gray-200">
                                    <MoreVertical size={14} />
                                </div>
                                <div className="absolute bottom-4 left-4 p-2.5 bg-gray-900/40 backdrop-blur-md rounded-xl text-[9px] font-black text-white uppercase tracking-widest border border-white/20">
                                    {course.type}
                                </div>
                            </div>
                            <div className="p-6 space-y-4 flex flex-col flex-1">
                                <div className="space-y-1">
                                    <h4 className="font-black text-gray-900 italic tracking-tight uppercase underline decoration-gray-50 decoration-8 underline-offset-4 group-hover:decoration-orange-100 transition-all">{course.title}</h4>
                                    <p className="text-[10px] font-bold text-gray-400 italic">By {course.instructor}</p>
                                </div>

                                <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest pt-4 border-t border-gray-50 mt-auto">
                                    <div className="flex items-center gap-1.5"><Clock size={12} /> {course.lessons} Lessons</div>
                                    <div className="flex items-center gap-1.5 text-yellow-600"><Star size={12} className="fill-yellow-600" /> {course.rating}</div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${course.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                        {course.status}
                                    </span>
                                    <button className="text-[10px] font-black text-[#C29543] uppercase tracking-[2px] transition-all hover:translate-x-1 outline-none">Manage Tracking</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-orange-50/20 p-8 rounded-[50px] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#C29543] transition-all duration-500 shadow-sm border-b-8 border-b-orange-100">
                        <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center text-[#C29543] mb-6 shadow-xl shadow-orange-50 rotate-[-4deg] group-hover:rotate-0 transition-transform">
                            <Plus size={32} />
                        </div>
                        <h4 className="font-black text-[#C29543] italic uppercase tracking-widest text-lg underline decoration-orange-100 decoration-4 mb-2">Create Gallery Item</h4>
                        <p className="text-[11px] font-bold text-gray-400 max-w-[150px] leading-relaxed uppercase tracking-tighter">Register new video curriculum or digital content tracks.</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="px-8 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-black text-gray-900 text-sm italic tracking-tight">Active Academic Courseware</h3>
                        <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl"><Database size={18} /></div>
                    </div>
                    <div className="overflow-x-auto min-h-[500px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Course Title</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Lessons</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Instructor</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Format</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Visibility state</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockCourses.map(course => (
                                    <tr key={course.id} className="hover:bg-orange-50/10 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl opacity-0 group-hover:opacity-100 transition-all border border-orange-100 rotate-12"><PlayCircle size={16} /></div>
                                                <span className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{course.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{course.lessons} Units</span>
                                        </td>
                                        <td className="px-8 py-4 font-black italic text-xs text-gray-500 italic uppercase">By {course.instructor}</td>
                                        <td className="px-8 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-[9px] font-black text-[#C29543] uppercase tracking-widest leading-none border border-orange-200 px-1.5 py-0.5 rounded-sm">{course.type}</span>
                                                <div className="flex items-center gap-1 text-[8px] font-black text-yellow-600"><Star size={8} fill="currentColor" /> {course.rating}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border transition-all ${course.status === 'Published' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-50'
                                                    }`}>
                                                    {course.status}
                                                </span>
                                                {course.status === 'Published' && <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200"></div>}
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors bg-white hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100"><Award size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative">
                <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-3xl"><ShieldCheck size={28} /></div>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight italic">Content Encryption Ready</h3>
                        </div>
                        <p className="text-gray-400 text-base font-medium leading-relaxed max-w-2xl italic">Digital Rights Management (DRM) is active. Students cannot screen-record or download lecture videos without authorized tokens. All access is logged via institutional ID.</p>
                    </div>
                    <div className="flex-1 w-full max-w-sm flex items-center justify-end relative">
                        <div className="w-full aspect-[4/3] bg-gray-900 rounded-[40px] shadow-2xl overflow-hidden opacity-[0.95] group cursor-pointer relative rotate-1">
                            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                            <div className="p-8 space-y-4">
                                <div className="flex justify-between">
                                    <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-red-400 shadow-sm opacity-50"></div><div className="w-2 h-2 rounded-full bg-yellow-400 shadow-sm opacity-50"></div><div className="w-2 h-2 rounded-full bg-green-400 shadow-sm opacity-50"></div></div>
                                    <div className="p-1 bg-white/10 rounded-lg"><Info size={12} className="text-white/40" /></div>
                                </div>
                                <div className="flex flex-col gap-4 py-4">
                                    <div className="h-1 w-full bg-white/10 rounded-full"></div>
                                    <div className="h-4 w-[60%] bg-blue-500/40 rounded-full"></div>
                                    <div className="h-4 w-[40%] bg-white/10 rounded-full"></div>
                                    <div className="flex items-center gap-2 mt-8">
                                        <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500"><Award size={14} /></div>
                                        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden truncate">
                                            <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <p className="absolute bottom-6 left-8 text-[9px] font-black text-white/30 tracking-[4px] uppercase italic">DRM System Active_v2.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineLearning;
