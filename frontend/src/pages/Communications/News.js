import React, { useState } from 'react';
import {
    Newspaper, Plus, Search, Filter,
    Calendar, User, Eye, Heart,
    Share2, MoreVertical, Image, Video,
    Bookmark, MessageCircle, Star, Info,
    LayoutGrid, List, ChevronRight
} from 'lucide-react';

const mockNews = [
    { id: 1, title: 'Annual Science Fair: Innovation Winners Announced', author: 'Principal Office', date: '2024-03-24', category: 'Events', views: '1.2k', orientation: 'Landscape' },
    { id: 2, title: 'New Sports Complex Inauguration Ceremony', author: 'S. Kulkarni', date: '2024-03-22', category: 'Infrastructure', views: '0.8k', orientation: 'Portrait' },
    { id: 3, title: 'Institutional Achievement: Best School Award 2024', author: 'Academic Dean', date: '2024-03-20', category: 'Achievements', views: '2.5k', orientation: 'Landscape' },
    { id: 4, title: 'Upcoming Guest Lecture by Industry Experts', author: 'Career Cell', date: '2024-03-18', category: 'Academic', views: '0.5k', orientation: 'Portrait' },
];

const News = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Campus Chronicle & News</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Showcase institutional milestones, events, and community updates.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-10 h-14 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black hover:shadow-xl transition-all shadow-lg shadow-gray-300 uppercase tracking-widest active:scale-95">
                        <Plus size={20} /> Create Story
                    </button>
                </div>
            </div>

            {/* Featured Post Area (Mockup) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-in fade-in slide-in-from-top-5 duration-700">
                <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden group relative flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 aspect-video lg:aspect-auto bg-gray-100 relative group-hover:scale-[1.05] transition-transform duration-700">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-8 flex gap-3">
                            <div className="p-2.5 bg-black/40 backdrop-blur-md rounded-2xl text-white border border-white/20"><Image size={18} /></div>
                            <div className="p-2.5 bg-black/40 backdrop-blur-md rounded-2xl text-white border border-white/20"><Video size={18} /></div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-10 space-y-6 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                            <span className="w-12 h-1 bg-[#C29543] rounded-full"></span>
                            <span className="text-[10px] font-black text-[#C29543] uppercase tracking-[4px]">Trendings Hot</span>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 italic tracking-tight leading-tight group-hover:underline decoration-orange-100 decoration-8 underline-offset-4">Digital Transformation: The New Academic Framework</h2>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed italic max-w-sm">Exploring the institutional shift towards Hybrid Learning and AI-driven assessment models for the upcoming session.</p>
                        <div className="pt-8 flex items-center justify-between border-t border-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center italic font-black text-gray-400">PO</div>
                                <div>
                                    <p className="text-xs font-black text-gray-900 uppercase">Principal Office</p>
                                    <p className="text-[10px] font-black text-gray-400">Mar 24, 2024</p>
                                </div>
                            </div>
                            <button className="p-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 hover:text-black transition-all"><Bookmark size={20} /></button>
                        </div>
                    </div>
                    <div className="absolute top-6 right-8 p-3 bg-white border border-gray-50 rounded-2xl shadow-xl text-gray-900 font-black text-xs uppercase opacity-0 group-hover:opacity-100 transition-all cursor-pointer">Featured</div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-900 p-8 rounded-[40px] text-white space-y-4 shadow-2xl relative overflow-hidden group border-r-8 border-r-[#C29543]">
                        <div className="absolute top-0 right-0 p-8 opacity-5"><Newspaper size={120} /></div>
                        <h3 className="text-2xl font-black italic tracking-wide">Publishing Status</h3>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div><p className="text-4xl font-black text-[#C29543]">142</p><p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Total Stories</p></div>
                            <div><p className="text-4xl font-black text-white">85.2k</p><p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Reach Index</p></div>
                        </div>
                        <p className="text-gray-400 text-xs font-medium italic underline underline-offset-4 decoration-gray-800 decoration-2">Community moderation is active. All stories verified by PR Unit.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4 border-b-8 border-b-orange-50">
                        <div className="p-3 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><Info size={28} /></div>
                        <h4 className="font-black text-gray-900 uppercase tracking-widest italic decoration-[#C29543]/20 decoration-4 underline">Journalism Guidelines</h4>
                        <p className="text-[10px] font-bold text-gray-400 max-w-sm leading-relaxed uppercase tracking-tighter">Content must align with institutional value system. High-quality media (Min 1080p) is strictly mandated for story indexing.</p>
                    </div>
                </div>
            </div>

            {/* Filter Hub */}
            <div className="flex bg-white p-2 rounded-[32px] border border-gray-100 shadow-sm mb-12 scale-90 md:scale-100 origin-left transition-transform inline-flex overflow-hidden">
                <button className="px-10 py-3 bg-[#C29543] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-md">All Headlines</button>
                <button className="px-10 py-3 text-gray-400 hover:text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest">Events</button>
                <button className="px-10 py-3 text-gray-400 hover:text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest">Achievements</button>
                <button className="px-10 py-3 text-gray-400 hover:text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest">Newsletters</button>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                {mockNews.map((news, i) => (
                    <div key={news.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-[#C29543] transition-all group overflow-hidden flex flex-col transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-100">
                        <div className={`aspect-[4/3] bg-gray-100 relative ${news.orientation === 'Portrait' ? 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700' : ''}`}>
                            <div className="absolute top-4 right-4 p-2 bg-white/40 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={14} /></div>
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/40 via-transparent to-transparent text-white flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic leading-none"><Eye size={12} /> {news.views}</div>
                                <div className="flex gap-4">
                                    <button className="p-2 bg-white/20 rounded-lg hover:bg-[#C29543] transition-colors shadow-sm"><Heart size={14} /></button>
                                    <button className="p-2 bg-white/20 rounded-lg hover:bg-black transition-colors shadow-sm"><Share2 size={14} /></button>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 space-y-4 h-full flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-black text-[#C29543] uppercase tracking-[3px] italic underline decoration-orange-100 decoration-2">{news.category}</span>
                                <div className="h-1.5 w-1.5 bg-gray-200 rounded-full"></div>
                                <span className="text-[9px] font-black text-gray-300 uppercase italic tracking-widest">{news.date}</span>
                            </div>
                            <h4 className="text-xl font-black text-gray-900 leading-tight italic tracking-tighter group-hover:underline decoration-orange-50 decoration-8 underline-offset-4 line-clamp-2">{news.title}</h4>
                            <div className="pt-6 border-t border-gray-50 mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#C29543]/10 flex items-center justify-center font-black text-xs text-[#C29543] border border-orange-50">{news.author.charAt(0)}</div>
                                    <span className="text-[10px] font-black text-gray-400 italic">By {news.author}</span>
                                </div>
                                <button className="text-[10px] font-black text-[#C29543] uppercase tracking-widest hover:translate-x-1 transition-transform italic underline decoration-orange-50 decoration-4">Open <ChevronRight size={12} className="inline ml-1" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-white p-10 rounded-[50px] border border-gray-100 shadow-xl flex flex-col md:flex-row items-center gap-10">
                <div className="w-40 h-40 bg-gray-900 rounded-[40px] flex flex-col items-center justify-center text-[#C29543] shadow-2xl rotate-3 hover:rotate-0 transition-transform cursor-pointer relative group/stat overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
                    <Star size={32} className="mb-2 transition-transform group-hover/stat:scale-110" />
                    <span className="text-sm font-black text-white italic">4.9/5</span>
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Community Rating</p>
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight italic">Story Moderation Intelligence</h4>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed italic max-w-2xl">Campus Chronicle stories are automatically indexed by historical significance. Stories with high community engagement are archived as premium institutional memories in the Legacy Vault.</p>
                </div>
                <div className="flex gap-4">
                    <button className="p-4 bg-gray-50 border border-gray-100 rounded-3xl text-gray-300 hover:text-black transition-all hover:shadow-lg"><MessageCircle size={24} /></button>
                    <button className="p-4 bg-gray-50 border border-gray-100 rounded-3xl text-gray-300 hover:text-[#C29543] transition-all hover:shadow-lg"><Star size={24} /></button>
                </div>
            </div>
        </div>
    );
};

export default News;
