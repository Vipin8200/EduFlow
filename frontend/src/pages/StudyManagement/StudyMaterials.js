import React, { useState } from 'react';
import {
    Library, FileText, Upload, Search,
    Filter, MoreVertical, Download, Trash2,
    Edit2, Eye, Plus, Folder, BookOpen,
    Info, LayoutGrid, List
} from 'lucide-react';

const mockMaterials = [
    { id: 1, name: 'Algebra Final Notes', subject: 'Mathematics', type: 'PDF', size: '2.4 MB', date: '2024-03-15', status: 'Public' },
    { id: 2, name: 'Chemistry Lab Guide', subject: 'Science', type: 'DOCX', size: '1.1 MB', date: '2024-03-12', status: 'Draft' },
    { id: 3, name: 'Ancient History Map', subject: 'Social History', type: 'JPG', size: '4.8 MB', date: '2024-03-10', status: 'Public' },
    { id: 4, name: 'Grammar Worksheets', subject: 'English', type: 'PDF', size: '0.8 MB', date: '2024-03-08', status: 'Public' },
];

const StudyMaterials = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    return (
        <div className="p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Digital Resource Library</h1>
                    <p className="text-sm text-gray-500 font-medium">Upload and manage curriculum-aligned academic materials.</p>
                </div>
                <div className="flex bg-white p-1.5 border border-gray-100 rounded-2xl shadow-sm">
                    <button onClick={() => setViewMode('grid')} className={`p-2 px-4 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-[#C29543] text-white' : 'text-gray-400'}`}><LayoutGrid size={16} /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 px-4 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[#C29543] text-white' : 'text-gray-400'}`}><List size={16} /></button>
                </div>
            </div>

            {/* Controls Filter */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search by Document Name or Subject..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm shadow-gray-100" />
                    </div>
                    <div className="flex gap-3">
                        <select className="px-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>All Subjects</option>
                            <option>Mathematics</option>
                            <option>Science</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-8 h-11 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-xl shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <Upload size={16} /> Upload Material
                    </button>
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-[#C29543] hover:shadow-lg transition-all"><Folder size={18} /></button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-500">
                    {mockMaterials.map(mat => (
                        <div key={mat.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-[#C29543] hover:shadow-xl hover:shadow-orange-50/50 transition-all group relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-4 right-4 text-gray-300 group-hover:text-gray-900 cursor-pointer"><MoreVertical size={16} /></div>
                            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 shadow-lg shadow-orange-50 border border-orange-50 ${mat.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                <FileText size={32} />
                            </div>
                            <h4 className="font-black text-gray-900 italic tracking-tight mb-1 group-hover:underline decoration-[#C29543]/20">{mat.name}</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 italic">{mat.subject} — {mat.size}</p>

                            <div className="flex items-center gap-2 mb-6">
                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${mat.status === 'Public' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {mat.status}
                                </span>
                                <div className="h-1 w-1 bg-gray-200 rounded-full"></div>
                                <span className="text-[9px] font-black text-gray-300 uppercase">{mat.date}</span>
                            </div>

                            <div className="w-full flex gap-3 pt-4 border-t border-gray-50 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <button className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all">Download</button>
                                <button className="px-3 py-2 bg-orange-50 border border-orange-100 text-[#C29543] rounded-xl"><Eye size={14} /></button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-orange-50/30 p-8 rounded-[40px] border-2 border-dashed border-orange-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-[#C29543] transition-all">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#C29543] mb-4 shadow-sm group-hover:scale-110 transition-transform"><Plus size={24} /></div>
                        <h4 className="font-black text-[#C29543] italic uppercase tracking-wider text-sm underline decoration-orange-100 decoration-4">Add Content</h4>
                        <p className="text-[10px] font-bold text-gray-400 mt-2 max-w-[120px]">Drag and drop files to populate library</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="px-8 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-black text-gray-900 text-sm">Recently Indexed Materials</h3>
                        <div className="p-2 bg-orange-50 text-[#C29543] rounded-xl"><BookOpen size={18} /></div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50 italic">
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Document Name</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Category</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Format</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">File Size</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Added On</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {mockMaterials.map(mat => (
                                    <tr key={mat.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-50 text-[#C29543] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><FileText size={14} /></div>
                                                <span className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{mat.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{mat.subject}</span>
                                        </td>
                                        <td className="px-8 py-4 px-8 py-4 font-black text-[#C29543] text-xs">{mat.type}</td>
                                        <td className="px-8 py-4 font-black text-gray-400 text-xs italic">{mat.size}</td>
                                        <td className="px-8 py-4 px-8 py-4 font-bold text-gray-500 text-xs">{mat.date}</td>
                                        <td className="px-8 py-4 text-right flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-300 hover:text-blue-500 transition-colors"><Edit2 size={16} /></button>
                                            <button className="p-2 text-gray-300 hover:text-[#C29543] transition-colors"><Download size={16} /></button>
                                            <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-gray-900 p-10 rounded-[50px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full translate-x-20 -translate-y-20 transform group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-4 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                        <div className="p-3 bg-white/10 rounded-2xl"><Info size={24} className="text-[#C29543]" /></div>
                        <h4 className="text-2xl font-black italic tracking-wide">Storage Optimization</h4>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xl">You are currently using <span className="text-white font-black underline decoration-[#C29543] decoration-8 underline-offset-4">42.8 GB</span> of 100 GB institutional cloud storage. Consider archiving materials from previous academic years.</p>
                </div>
                <div className="w-full lg:w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden self-center border border-gray-700">
                    <div className="h-full bg-[#C29543] transition-all duration-1000" style={{ width: '42%' }}></div>
                </div>
                <button className="px-10 h-14 bg-white text-black rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-[#C29543] hover:text-white transition-all transform active:scale-95 shadow-xl shadow-gray-950">
                    System Audit
                </button>
            </div>
        </div>
    );
};

export default StudyMaterials;
