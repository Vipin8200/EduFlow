import React, { useState } from 'react';
import {
    Box, Plus, Search, Filter,
    MoreVertical, Package, Tags,
    TrendingDown, ShieldAlert,
    Truck, Barcode, ClipboardList,
    ChevronRight, Save, Trash2, Edit2,
    Share2, Info, Layout, Activity,
    MonitorCheck
} from 'lucide-react';

const mockProducts = [
    { id: 1, name: 'Standard Grade Notebook', sku: 'ST-NB-2024', category: 'Stationery', stock: 450, vendor: 'Global Supplies', status: 'In Stock' },
    { id: 2, name: 'Precision Microscope X1', sku: 'LB-MS-8800', category: 'Lab Equipment', stock: 12, vendor: 'BioTech Solutions', status: 'Low Stock' },
    { id: 3, name: 'Ergonomic Desk Frame', sku: 'FN-DS-1088', category: 'Furniture', stock: 48, vendor: 'WoodCraft Inc.', status: 'In Stock' },
];

const ProductManagement = () => {
    return (
        <div className="p-4 sm:p-6 max-w-[1700px] mx-auto w-full min-h-screen bg-gray-50/50 font-sans tracking-tight leading-relaxed">
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight text-[#C29543]">Institutional Catalog Inventory</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Maintain the primary asset registry, SKU identifiers, and vendor mappings.</p>
                </div>
                <div className="flex gap-4 scale-90 md:scale-100 origin-right transition-transform">
                    <button className="flex items-center gap-2 px-8 h-12 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg shadow-gray-200 uppercase tracking-widest active:scale-95">
                        <Plus size={18} /> Register Asset
                    </button>
                </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Catalog SKU', val: '142 Items', icon: <Barcode />, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                    { label: 'Asset Valuation', val: '$24.5K', icon: <Package />, color: 'text-[#C29543]', bg: 'bg-orange-50/50' },
                    { label: 'Critical Threshold', val: '8 Low Stock', icon: <TrendingDown />, color: 'text-red-500', bg: 'bg-red-50/50' },
                    { label: 'Verified Vendors', val: '12 Entities', icon: <Truck />, color: 'text-green-600', bg: 'bg-green-50/50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#C29543] transition-all group overflow-hidden relative">
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic leading-none">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className={`p-4 rounded-[20px] ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-gray-50/50`}>
                            {React.cloneElement(s.icon, { size: 22 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Hub */}
            <div className="bg-white p-5 rounded-[40px] border border-gray-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-l-8 border-l-[#C29543] overflow-hidden relative transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input type="text" placeholder="Search Master Catalog Index..." className="w-full pl-11 pr-4 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543] focus:bg-white transition-all shadow-sm placeholder:italic" />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-5 h-11 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black outline-none focus:border-[#C29543]">
                            <option>Taxonomy: Stationery</option>
                            <option>Taxonomy: Infrastructure</option>
                        </select>
                        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="flex bg-gray-50 p-1 border border-gray-100 rounded-xl overflow-hidden shadow-sm scale-95 origin-right">
                    <button className="px-6 py-2.5 bg-[#C29543] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Active Log</button>
                    <button className="px-6 py-2.5 text-gray-400 hover:text-gray-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Archived SKUs</button>
                </div>
            </div>

            {/* Product Registry Roster */}
            <div className="bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative group/list animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/list:scale-125 transition-transform duration-1000 rotate-12">
                    <Package size={400} />
                </div>
                <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between font-sans">
                    <h3 className="font-black text-gray-900 text-sm tracking-tight italic uppercase underline decoration-orange-100 decoration-8 underline-offset-4">Verified Master Asset Catalog</h3>
                    <div className="p-2.5 bg-orange-50 text-[#C29543] rounded-2xl shadow-sm"><ClipboardList size={20} /></div>
                </div>
                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 italic">
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Asset Descriptor</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">SKU Index</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest text-center">Quant Level</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest font-black uppercase tracking-widest">Vendor / Entity</th>
                                <th className="px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockProducts.map(prod => (
                                <tr key={prod.id} className="hover:bg-orange-50/5 transition-colors group">
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-[18px] group-hover:text-[#C29543] group-hover:bg-white group-hover:border-orange-100 transition-all font-black shadow-sm italic text-xs">#{prod.id}</div>
                                            <div className="space-y-0.5">
                                                <p className="font-black text-gray-900 italic text-sm group-hover:underline decoration-[#C29543]/20">{prod.name}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none italic">{prod.category} Classification</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full flex items-center gap-2 group-hover:bg-white group-hover:border-orange-100 group-hover:text-[#C29543] transition-all"><Barcode size={10} /> {prod.sku}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className={`text-[11px] font-black uppercase tracking-widest italic ${prod.status === 'Low Stock' ? 'text-red-500 underline decoration-red-100' : 'text-[#C29543] underline decoration-orange-100'} decoration-4 underline-offset-4`}>{prod.stock} Pcs</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-[#C29543] group-hover:border-orange-100 transition-all"><Truck size={14} /></div>
                                            <span className="text-[11px] font-black text-gray-500 uppercase italic tracking-tight">{prod.vendor}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-5 text-right">
                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2.5 border border-gray-100 rounded-xl text-gray-300 hover:text-blue-500 hover:border-blue-100 transition-all shadow-sm bg-white active:scale-95"><Edit2 size={16} /></button>
                                            <button className="p-2.5 border border-gray-100 rounded-xl text-gray-300 hover:text-black hover:border-black transition-all shadow-sm bg-white active:scale-95"><Share2 size={16} /></button>
                                            <button className="p-2.5 border border-gray-100 rounded-xl text-gray-300 hover:text-red-500 hover:border-red-100 transition-all shadow-sm bg-white active:scale-95"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-16 bg-gray-900 p-12 rounded-[60px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-white/[0.03] rotate-12 -translate-x-32 group-hover:rotate-0 transition-transform duration-1000"></div>
                <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                    <div className="flex items-center justify-center xl:justify-start gap-5">
                        <div className="p-4 bg-white/10 rounded-[24px] border border-white/10 shadow-xl"><MonitorCheck size={24} className="text-[#C29543]" /></div>
                        <h3 className="text-2xl font-black italic tracking-widest uppercase underline decoration-[#C29543] decoration-8 underline-offset-4">Catalog Compliance Control</h3>
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-3xl italic tracking-tight">The Master Product Registry utilizes verified SKU mapping. All registered assets are synchronized with vendor price catalogs to ensure localized budgetary accuracy across multi-campus allocations.</p>
                </div>
                <button className="px-12 h-14 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[4px] hover:bg-[#C29543] hover:text-white transition-all shadow-xl shadow-gray-950 relative z-10">
                    Audit Catalog SKU
                </button>
            </div>
        </div>
    );
};

export default ProductManagement;
