import React, { useState } from 'react';
import {
    Pencil, Upload, FileSpreadsheet, Search,
    CheckCircle, Save, AlertTriangle, Filter,
    ChevronRight, Info, User, Clipboard
} from 'lucide-react';

const mockStudents = [
    { id: 'ADM-201', name: 'Aarav Sharma', roll: '01', status: 'Submitted' },
    { id: 'ADM-202', name: 'Priya Verma', roll: '02', status: 'Pending' },
    { id: 'ADM-203', name: 'Rohan Gupta', roll: '03', status: 'Submitted' },
    { id: 'ADM-204', name: 'Sneha Patel', roll: '04', status: 'In Process' },
];

const MarksManagement = () => {
    const [activeTab, setActiveTab] = useState('entry');
    const [selectedExam, setSelectedExam] = useState('First Terminal');
    const [selectedClass, setSelectedClass] = useState('Grade 10-A');
    const [selectedSubject, setSelectedSubject] = useState('Mathematics');

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Examination Marks Entry</h1>
                    <p className="text-sm text-gray-500 font-medium">Capture student performance data for academic evaluations.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <button onClick={() => setActiveTab('entry')} className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-xs transition-all ${activeTab === 'entry' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-800'}`}><Pencil size={14} /> Direct Entry</button>
                    <button onClick={() => setActiveTab('import')} className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-xs transition-all ${activeTab === 'import' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-800'}`}><Upload size={14} /> Bulk Import</button>
                </div>
            </div>

            {/* Filter Panel */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8 relative border-t-8 border-t-[#C29543]">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Select Examination</label>
                        <select className="w-full sm:w-56 px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black focus:border-[#C29543] outline-none" value={selectedExam} onChange={e => setSelectedExam(e.target.value)}>
                            <option>First Terminal 2024</option>
                            <option>Internal Assessment - 1</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Grade Level</label>
                        <select className="w-full sm:w-32 px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black focus:border-[#C29543] outline-none" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                            <option>Grade 10-A</option>
                            <option>Grade 10-B</option>
                            <option>Grade 9-A</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Primary Subject</label>
                        <select className="w-full sm:w-48 px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black focus:border-[#C29543] outline-none" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                            <option>Mathematics</option>
                            <option>Science</option>
                            <option>Social Studies</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-6 h-11 bg-[#C29543] text-white rounded-2xl font-black text-xs hover:shadow-xl hover:translate-y-[-2px] transition-all shadow-lg shadow-orange-100">
                        Load Student List
                    </button>
                    <button className="p-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 hover:text-black transition-all"><Filter size={18} /></button>
                </div>
            </div>

            {activeTab === 'entry' ? (
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-5 duration-300">
                    <div className="xl:col-span-3 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h3 className="font-black text-gray-900 text-sm">{selectedSubject} Marks Sheet</h3>
                                <div className="px-3 py-1 bg-white border border-[#C29543]/20 text-[#C29543] rounded-full text-[9px] font-black uppercase">Max Marks: 100</div>
                            </div>
                            <button className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all shadow-xl shadow-gray-200">
                                <Save size={14} /> Save Progress
                            </button>
                        </div>
                        <div className="overflow-x-auto min-h-[500px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 italic">
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Roll</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Student Information</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Theory (80)</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Practical (20)</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Total</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mockStudents.map((st, i) => (
                                        <tr key={i} className="hover:bg-gray-50 group transition-all">
                                            <td className="px-8 py-4">
                                                <span className="font-black text-gray-300 group-hover:text-[#C29543] transition-colors">{st.roll}</span>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"><User size={14} /></div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-900 leading-tight italic">{st.name}</p>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{st.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                <input type="number" placeholder="Enter..." className="w-20 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-center text-sm font-black focus:border-[#C29543] outline-none focus:bg-white transition-all" />
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                <input type="number" placeholder="Enter..." className="w-20 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-center text-sm font-black focus:border-[#C29543] outline-none focus:bg-white transition-all" />
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                <div className="w-16 h-8 bg-gray-50 border border-dashed border-gray-200 rounded-xl mx-auto flex items-center justify-center font-black text-gray-900 text-sm">--</div>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${st.status === 'Submitted' ? 'bg-green-100 text-green-700' :
                                                        st.status === 'Pending' ? 'bg-red-50 text-red-500 underline underline-offset-2' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {st.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-gray-900 p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                                <Clipboard size={150} />
                            </div>
                            <h4 className="text-xl font-black italic">Subject Overview</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-[2px]">Total Class</span>
                                    <span className="font-black">45 Students</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-[2px]">Marks Entered</span>
                                    <span className="font-black text-[#C29543]">32 / 45</span>
                                </div>
                                <div className="pt-8 text-center">
                                    <p className="text-[10px] uppercase font-black tracking-[4px] text-gray-600 mb-2">Internal Validation Rate</p>
                                    <div className="text-6xl font-black tracking-tighter text-[#C29543]">71%</div>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm hover:translate-y-[-2px] transition-all">Submit to Principal</button>
                        </div>

                        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 border-b-8 border-b-blue-500/20">
                            <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><Info size={24} /></div>
                            <h5 className="font-black text-gray-900 italic underline decoration-blue-100 decoration-4">Entry Guidelines</h5>
                            <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tighter">Please ensure theory marks do not exceed 80 and practical marks do not exceed 20. System will block entries outside this range.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto py-20 animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-2xl text-center space-y-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent pointer-events-none"></div>
                        <div className="w-24 h-24 bg-[#C29543]/10 rounded-[32px] flex items-center justify-center mx-auto text-[#C29543] border border-[#C29543]/20 shadow-xl shadow-orange-50 rotate-6 group hover:rotate-12 transition-transform cursor-pointer">
                            <Upload size={40} />
                        </div>
                        <div className="space-y-4 px-10">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">Bulk Import Marks via Excel</h2>
                            <p className="text-gray-400 font-medium leading-relaxed max-w-lg mx-auto">Upload your prepared subject marks sheet in CSV or Excel format. Ensure the Admission ID column is perfectly aligned with the template.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-10">
                            <button className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:translate-y-[-2px] hover:shadow-2xl transition-all shadow-xl shadow-gray-200">Select File to Upload</button>
                            <button className="w-full sm:w-auto px-10 py-4 border-2 border-dashed border-gray-100 text-gray-300 rounded-2xl font-black text-sm hover:border-[#C29543] hover:text-[#C29543] transition-all flex items-center justify-center gap-2">
                                <FileSpreadsheet size={18} /> Download Template
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarksManagement;
