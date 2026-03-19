import React, { useState } from 'react';
import {
    CalendarClock, Plus, Search, Filter,
    ChevronLeft, ChevronRight, Clock, MapPin,
    AlertCircle, FileText, Download, Printer,
    LayoutGrid, List, CheckCircle
} from 'lucide-react';

const mockSchedules = [
    { id: 1, subject: 'Mathematics', date: '2024-04-10', slot: 'Morning', room: 'Hall 1', teacher: 'R. Sharma', time: '09:00 - 12:00' },
    { id: 2, subject: 'English', date: '2024-04-11', slot: 'Afternoon', room: 'Hall 2', teacher: 'P. Verma', time: '13:00 - 16:00' },
    { id: 3, subject: 'Science', date: '2024-04-12', slot: 'Morning', room: 'Hall 3', teacher: 'R. Gupta', time: '09:00 - 12:00' },
];

const ExamScheduling = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Examination Timetable</h1>
                    <p className="text-sm text-gray-500 font-medium">Coordinate exam slots, invigilators, and room allocations.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <button onClick={() => setViewMode('calendar')} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${viewMode === 'calendar' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400 hover:text-gray-800'}`}><LayoutGrid size={14} /> Grid View</button>
                    <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${viewMode === 'list' ? 'bg-[#C29543] text-white shadow-md' : 'text-gray-400 hover:text-gray-800'}`}><List size={14} /> List View</button>
                </div>
            </div>

            {/* Controls Filter */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 overflow-hidden relative border-l-8 border-l-[#C29543]">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Select Exam</label>
                        <select className="w-full sm:w-64 px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black focus:outline-none focus:border-[#C29543]">
                            <option>First Terminal Examination 2024</option>
                            <option>Internal Assessment - Unit 1</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 ml-1">Target Class</label>
                        <select className="w-full sm:w-32 px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black focus:outline-none focus:border-[#C29543]">
                            {[6, 7, 8, 9, 10, 11, 12].map(c => <option key={c}>Grade {c}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 h-11 bg-[#C29543] text-white rounded-2xl font-black text-xs hover:translate-y-[-2px] hover:shadow-xl transition-all shadow-lg shadow-orange-100">
                        <Plus size={16} /> Add Slot
                    </button>
                    <button className="p-3 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200"><Printer size={18} /></button>
                </div>
            </div>

            {viewMode === 'list' && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-black text-gray-900 text-sm">Exam Sequence List</h3>
                        <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"><Download size={18} /></div>
                    </div>
                    <div className="overflow-x-auto min-h-[500px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Date & Day</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Time Slot</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Room #</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Invigilator</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockSchedules.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex flex-col items-center justify-center">
                                                    <span className="text-[10px] font-black text-[#C29543] leading-none mb-1">APR</span>
                                                    <span className="text-sm font-black text-gray-900 leading-none">{10 + i}</span>
                                                </div>
                                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Monday</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-black text-gray-900 underline decoration-gray-100 underline-offset-4 decoration-2">{row.subject}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-gray-900 whitespace-nowrap">{row.time}</span>
                                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic leading-none mt-1">{row.slot} Session</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 italic"><MapPin size={12} className="text-[#C29543]" /> {row.room}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-gray-900">{row.teacher}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100">Validated</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {viewMode === 'calendar' && (
                <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-[32px] overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-500">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="bg-gray-50 p-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-[4px] border-b border-gray-100">{day}</div>
                    ))}
                    {[...Array(35)].map((_, i) => {
                        const dayNum = i - 6;
                        const schedule = mockSchedules.find(s => parseInt(s.date.split('-')[2]) === dayNum);
                        return (
                            <div key={i} className={`min-h-[140px] p-4 bg-white hover:bg-gray-50/50 transition-colors flex flex-col group ${dayNum > 0 && dayNum <= 31 ? '' : 'opacity-20 pointer-events-none grayscale'}`}>
                                <span className="text-xs font-black text-gray-300 group-hover:text-gray-900 transition-colors mb-2">{dayNum > 0 && dayNum <= 31 ? dayNum.toString().padStart(2, '0') : ''}</span>
                                {schedule && (
                                    <div className="p-2.5 bg-orange-50 border border-orange-100 rounded-xl space-y-2 group-hover:scale-[1.05] transition-transform shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-8 h-8 bg-[#C29543]/10 rounded-bl-full flex items-center justify-center"><CalendarClock size={10} className="text-[#C29543]" /></div>
                                        <p className="text-[10px] font-black text-gray-900 truncate pr-4">{schedule.subject}</p>
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400"><Clock size={10} /> {schedule.slot}</div>
                                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400"><MapPin size={10} /> {schedule.room}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ExamScheduling;
