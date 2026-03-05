import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 bg-white w-full border-b border-[#e5e7eb]">

            {/* Centered/Left Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative flex items-center w-full bg-[#f9fafb] border border-[#f3f4f6] rounded-[10px] px-3 py-3 transition-all hover:bg-white focus-within:bg-white focus-within:ring-2 focus-within:ring-[#C29543]/20 focus-within:border-[#C29543]/30">
                    <Search size={18} className="text-[#9ca3af] min-w-max" />
                    <input
                        type="text"
                        placeholder="Search students, teachers, or classes..."
                        className="w-full bg-transparent border-none text-[14px] text-[#374151] placeholder-[#9ca3af] focus:outline-none ml-2 leading-tight"
                    />
                </div>
            </div>

            {/* Right side Action Icons */}
            <div className="flex items-center gap-3 shrink-0 ml-4">
                {/* Notification Bell */}
                <button className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#f3f4f6] bg-white hover:bg-[#f9fafb] transition-colors text-[#4b5563] hover:text-[#111827]">
                    <Bell size={20} />
                    {/* Notification Orange Badge - matches the image */}
                    <span className="absolute top-[8px] right-[10px] w-2 h-2 bg-[#d97706] rounded-full border border-white"></span>
                </button>

                {/* Message Icon */}
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-[#f3f4f6] bg-white hover:bg-[#f9fafb] transition-colors text-[#4b5563] hover:text-[#111827]">
                    <MessageSquare size={20} />
                </button>
            </div>
        </header>
    );
}
