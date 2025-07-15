"use client"
import React from 'react';

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-seasalt/95 backdrop-blur-xl border-b border-silver-lake-300/20 md:hidden">
      <div className="flex items-center justify-center h-16 px-4">
        <span className="text-2xl font-black text-gunmetal tracking-tight">Pugly</span>
      </div>
    </header>
  );
}