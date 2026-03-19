import React from 'react';
import {
    UploadCloud, FileText, Video,
    Link, CirclePlus, Info,
    Library, GraduationCap, Clock,
    CheckCircle2, AlertCircle, Share2
} from 'lucide-react';

const UploadMaterials = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-[#C29543] decoration-8 underline-offset-4">Knowledge Asset Deployment</h1>
                    <p className="text-sm text-gray-500 font-medium mt-3 italic">Commitment of educational resources and pedagogical material to the student nexus.</p>
                </div>
                <div className="flex bg-white p-2 border border-[#C29543]/10 rounded-2xl shadow-sm items-center gap-6">
                    <div className="flex items-center gap-3 px-4">
                        <Library size={18} className="text-[#C29543]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-950 italic">Master Repository</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="bg-white p-10 rounded-[60px] border border-gray-100 shadow-2xl space-y-10 relative overflow-hidden border-t-8 border-t-gray-950">
                        <div className="p-10 bg-gray-50 border border-dashed border-gray-200 rounded-[50px] flex flex-col items-center justify-center space-y-4 group hover:bg-orange-50 transition-all cursor-pointer relative z-10 hover:border-[#C29543]/30">
                            <div className="p-6 bg-white rounded-[32px] shadow-xl group-hover:scale-110 transition-transform"><UploadCloud size={48} className="text-[#C29543]" /></div>
                            <div className="text-center">
                                <p className="text-[11px] font-black text-gray-900 uppercase italic tracking-widest">Global Asset Deployment Terminal</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[4px] mt-1 italic">DRAG & DROP EDUCATIONAL NODES OR CLICK TO NAVIGATE MASTER REGISTRY</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Target Academic Unit</label>
                                <div className="p-5 bg-gray-50 border border-gray-100 rounded-[30px] flex items-center justify-between group hover:border-[#C29543] transition-all cursor-pointer shadow-sm">
                                    <span className="text-xs font-black text-gray-950 uppercase italic tracking-widest">Select Module Unit</span>
                                    <GraduationCap size={18} className="text-gray-300 group-hover:text-[#C29543]" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Asset Categorization</label>
                                <div className="p-5 bg-gray-50 border border-gray-100 rounded-[30px] flex items-center justify-between group hover:border-blue-200 transition-all cursor-pointer shadow-sm">
                                    <span className="text-xs font-black text-gray-950 uppercase italic tracking-widest">Select Knowledge Layer</span>
                                    <CirclePlus size={18} className="text-blue-200 group-hover:text-blue-500" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Temporal Sync</label>
                                <div className="p-5 bg-gray-50 border border-gray-100 rounded-[30px] flex items-center justify-between group hover:border-green-200 transition-all cursor-pointer shadow-sm">
                                    <span className="text-xs font-black text-gray-950 uppercase italic tracking-widest">Immediate Broadcast</span>
                                    <Clock size={18} className="text-green-500 group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Asset Label</label>
                                <input type="text" placeholder="EX: ADVANCED CALCULUS - THEORETICAL NODES" className="p-6 bg-gray-50 border border-gray-100 rounded-[30px] text-xs font-black text-gray-950 uppercase italic tracking-widest placeholder:text-gray-300 focus:outline-none focus:border-[#C29543] transition-all shadow-sm w-full" />
                            </div>
                        </div>

                        <button className="w-full py-6 bg-gray-950 text-white rounded-[32px] font-black text-[10px] uppercase tracking-[10px] hover:bg-[#C29543] transition-all shadow-2xl shadow-gray-950/20 active:scale-95 relative z-10">
                            SYNC MATERIAL INTEGRITY
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="bg-white p-10 rounded-[60px] border border-gray-100 shadow-xl space-y-8 h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-45 transition-transform duration-1000 rotate-12">
                            <Link size={200} />
                        </div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-4 bg-orange-50 text-[#C29543] rounded-3xl shadow-sm"><Link size={24} /></div>
                            <h4 className="text-sm font-black italic tracking-widest uppercase underline decoration-[#C29543]/20 decoration-8 underline-offset-4">External Node Link</h4>
                        </div>
                        <p className="text-gray-500 text-xs font-medium italic leading-relaxed tracking-tight underline-offset-2 decoration-gray-100 decoration-1 underline">Synchronize external knowledge resources (Videos, Research Papers, Interactive Modules) to the student nexus.</p>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Remote URL Node</label>
                                <input type="text" placeholder="HTTPS://KNOWLEDGE.CLOUD/MODULE/NODE-X" className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] text-xs font-black text-gray-950 italic tracking-tight placeholder:text-gray-300 focus:outline-none focus:border-blue-500 transition-all shadow-inner-sm" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest ml-4">Asset Metadata</label>
                                <input type="text" placeholder="OPTIONAL KEYWORDS FOR GLOBAL SEARCH" className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] text-xs font-black text-gray-950 italic tracking-tight placeholder:text-gray-300 focus:outline-none focus:border-blue-500 transition-all shadow-inner-sm" />
                            </div>
                        </div>

                        <button className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-[9px] uppercase tracking-[5px] hover:bg-gray-950 transition-all shadow-xl shadow-blue-50/50">
                            DEPLOY EXTERNAL ASSET
                        </button>

                        <div className="mt-8 p-6 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center gap-4 transition-all group-hover:bg-white shadow-sm">
                            <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:bg-orange-50 transition-all"><Info size={16} className="text-[#C29543]" /></div>
                            <p className="text-[9px] font-black text-gray-400 uppercase leading-relaxed italic tracking-widest">Material sync will trigger notifications on all connected student terminal nodes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadMaterials;
