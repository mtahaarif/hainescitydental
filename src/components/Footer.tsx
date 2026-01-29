"use client";

import Link from 'next/link';
import { Facebook, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full not-printable">
      {/* thin top bar */}
      <div className="w-full h-3 bg-dental-blue-400" />

      {/* main dark footer bar */}
      <div className="w-full bg-[#071f3b] text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <p className="text-lg font-medium">©2026 Hainescity Dental, All Rights Reserved.</p>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <a href="/forms/hipaa-privacy-notice.pdf" className="hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <span className="opacity-50">-</span>

              <a href="https://www.facebook.com/HainesCityDental?mibextid=wwXIfr&rdid=Im3M4Zf9wR7YX6Jp&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HiScZYAPZ%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noopener noreferrer" className="p-1 bg-white/6 rounded flex items-center justify-center">
                <Facebook className="w-5 h-5 text-white" />
              </a>

              <a href="https://www.instagram.com/hainescitydental?igsh=MWg0bnByOWszc28wZQ%3D%3D" target="_blank" rel="noopener noreferrer" className="p-1 bg-white/6 rounded flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <a href="#top" className="w-12 h-12 bg-dental-blue-500 rounded-md flex items-center justify-center shadow-md hover:opacity-95">
              <ArrowUp className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
