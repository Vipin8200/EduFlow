import React, { useState } from 'react';
import {
    PlusCircle, Settings2, Trash2, Edit2,
    Save, Filter, ChevronRight, Info,
    CheckCircle2, ListChecks, Award, Layout
} from 'lucide-react';

const mockExams = [
    { id: 1, name: 'First Terminal Examination', type: 'Formative', date: '2024-04-10', pattern: 'Standard-100', status: 'Active' },
    { id: 2, name: 'Internal Assessment - 1', type: 'Internal', date: '2024-03-22', pattern: 'Internal-20', status: 'Draft' },
];

const ExamSetup = () => {
    const [activeTab, setActiveTab] = useState('creation');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Exam Configuration Suite</h1>
                <p className="text-sm text-gray-500 font-medium">Define academic assessments, patterns, and grading rules.</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm mb-6 w-fit">
                <button
                    onClick={() => setActiveTab('creation')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'creation' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <PlusCircle size={18} /> Exam Creation
                </button>
                <button
                    onClick={() => setActiveTab('pattern')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'pattern' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <ListChecks size={18} /> Pattern Setup
                </button>
                <button
                    onClick={() => setActiveTab('grades')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === 'grades' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                >
                    <Award size={18} /> Grade Config
                </button>
            </div>

            {activeTab === 'creation' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 self-start">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                            <div className="p-2 bg-orange-50 text-[#C29543] rounded-lg"><Settings2 size={24} /></div>
                            <h3 className="font-black text-gray-900 italic tracking-tight uppercase underline decoration-[#C29543]/20 decoration-4">Setup Exam</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Academic Title</label>
                                <input type="text" placeholder="e.g. Mid-Term 2024" className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:border-[#C29543]" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Assessment Category</label>
                                <select className="w-full px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black focus:outline-none focus:border-[#C29543]">
                                    <option>Summative Assessment</option>
                                    <option>Internal Practical</option>
                                    <option>Unit Test</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Tentative Start</label>
                                    <input type="date" className="w-full px-3 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Exam Duration</label>
                                    <input type="text" placeholder="Hours" className="w-full px-3 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
                                </div>
                            </div>
                            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm tracking-wide mt-4 hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95 duration-100">
                                Register Exam
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-black text-gray-900 text-sm flex items-center gap-2">
                                    <div className="w-1.5 h-6 bg-[#C29543] rounded-full"></div> Currently Defined Exams
                                </h3>
                                <button className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-400"><Filter size={16} /></button>
                            </div>
                            <div className="space-y-4">
                                {mockExams.map(ex => (
                                    <div key={ex.id} className="p-5 border border-gray-100 rounded-3xl bg-white hover:bg-gray-50/50 hover:border-[#C29543] transition-all group flex items-center justify-between shadow-sm">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 group-hover:text-[#C29543] transition-colors"><Layout size={20} /></div>
                                            <div>
                                                <h4 className="font-black text-gray-900 italic tracking-tight group-hover:underline decoration-[#C29543]/20">{ex.name}</h4>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{ex.type} — Scheduled: {ex.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${ex.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{ex.status}</span>
                                            <div className="h-10 w-px bg-gray-100 mx-2"></div>
                                            <button className="text-gray-300 hover:text-blue-500"><Edit2 size={16} /></button>
                                            <button className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-orange-50/30 p-8 rounded-3xl border-2 border-dashed border-orange-100 flex items-center gap-6 group hover:border-[#C29543]/30 transition-all duration-700">
                            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#C29543] shadow-md group-hover:rotate-12 transition-transform duration-500">
                                <Info size={28} />
                            </div>
                            <div>
                                <h4 className="font-black text-[#C29543] uppercase tracking-widest text-lg">Proctoring Notice</h4>
                                <p className="text-xs text-gray-400 font-bold max-w-lg leading-relaxed mt-1 italic group-hover:text-[#C29543]/80">Changes to the exam pattern must be finalized 72 hours prior to the start date. Teachers will be notified via automated dashboard alert.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'pattern' && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <div className="flex flex-col md:flex-row items-center gap-8 justify-between pb-8 border-b border-gray-50">
                            <div className="space-y-2 text-center md:text-left">
                                <h2 className="text-2xl font-black text-gray-900 underline decoration-[#C29543]/20 decoration-8 underline-offset-4">Weightage & Subjects</h2>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest italic">Configure marks distribution for First Terminal Exam</p>
                            </div>
                            <button className="px-8 py-3 bg-[#C29543] text-white rounded-2xl font-black text-sm hover:translate-y-[-2px] hover:shadow-2xl transition-all shadow-lg shadow-orange-100">
                                <Save size={18} className="inline mr-2" /> Global Save
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                            <div className="space-y-6">
                                <h3 className="font-black text-gray-900 border-l-4 border-l-gray-900 pl-4">Standard Components</h3>
                                <div className="space-y-4">
                                    {['Theory Exam', 'Internal Practical', 'Assignment Work', 'Attendance Attendance'].map(comp => (
                                        <div key={comp} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-md transition-all">
                                            <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{comp}</span>
                                            <div className="flex items-center gap-3">
                                                <input type="number" placeholder="Marks" className="w-20 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-black text-right outline-none focus:border-[#C29543]" />
                                                <span className="text-xs font-black text-gray-400">/ 100</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-900 p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                                    <ListChecks size={150} />
                                </div>
                                <h3 className="text-xl font-black italic">Final Aggregation</h3>
                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-between border-b border-gray-800 pb-2">
                                        <span className="text-xs font-bold text-gray-400">Total Calculation</span>
                                        <span className="font-black text-[#C29543]">Automatic</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-800 pb-2">
                                        <span className="text-xs font-bold text-gray-400">Passing Threshold</span>
                                        <span className="font-black">35%</span>
                                    </div>
                                    <div className="pt-8 text-center">
                                        <p className="text-[10px] uppercase font-black tracking-[4px] text-gray-600 mb-2">Subject Total</p>
                                        <div className="text-6xl font-black tracking-tighter text-[#C29543]">100</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'grades' && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="font-black text-gray-900 text-xl italic underline decoration-[#C29543]/20 decoration-8 underline-offset-[-2px]">Grading Policy Management</h3>
                        <button className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 font-black text-xs hover:text-[#C29543] transition-all"><PlusCircle size={14} className="inline mr-1" /> Add Group</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { g: 'A+', r: '91-100%', pt: '10.0', c: 'bg-green-600' },
                            { g: 'A', r: '81-90%', pt: '9.0', c: 'bg-green-500' },
                            { g: 'B+', r: '71-80%', pt: '8.0', c: 'bg-blue-500' },
                            { g: 'B', r: '61-70%', pt: '7.0', c: 'bg-blue-400' },
                            { g: 'C+', r: '51-60%', pt: '6.0', c: 'bg-orange-500' },
                            { g: 'C', r: '41-50%', pt: '5.0', c: 'bg-orange-400' },
                            { g: 'D', r: '33-40%', pt: '4.0', c: 'bg-red-400' },
                            { g: 'E', r: '0-32%', pt: '0.0', c: 'bg-red-600' },
                        ].map((grade, i) => (
                            <div key={i} className="p-6 bg-white border border-gray-100 rounded-[32px] hover:border-[#C29543] shadow-sm group transition-all text-center relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-12 h-12 ${grade.c} opacity-[0.05] rounded-bl-full`}></div>
                                <h4 className={`text-4xl font-black mb-1 ${grade.c.replace('bg-', 'text-')}`}>{grade.g}</h4>
                                <p className="text-xs font-black text-gray-900 italic">{grade.r}</p>
                                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center px-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Points</span>
                                    <span className="font-black text-sm">{grade.pt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamSetup;
