'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-indigo bg-bee-yellow shadow-lg">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-black tracking-tight text-indigo uppercase transform -rotate-2">
          thebee'sniz
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 font-bold text-night text-lg">
          <Link href="#cursos" className="hover:text-pink transition-colors">Cursos</Link>
          <Link href="#metodologia" className="hover:text-pink transition-colors">Método</Link>
          <Link href="#beneficios" className="hover:text-pink transition-colors">Beneficios</Link>
          <Link href="#testimonios" className="hover:text-pink transition-colors">Reseñas</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/login" className="px-6 py-2.5 rounded-full font-bold text-night hover:bg-white/50 transition-colors border-2 border-transparent">
            Entrar
          </Link>
          <Link href="#cursos" className="px-6 py-2.5 rounded-full font-bold text-white bg-pink hover:bg-pink/90 transition-colors shadow-[4px_4px_0px_0px_rgba(71,80,154,1)] border-2 border-indigo">
            Comenzar ya
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="#cursos" className="px-4 py-2 rounded-full font-bold text-white bg-pink shadow-[2px_2px_0px_0px_rgba(71,80,154,1)] border-2 border-indigo text-sm">
            Comenzar
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-indigo p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-bee-yellow border-b-4 border-indigo flex flex-col font-bold text-night text-xl p-6 gap-6 shadow-xl z-40">
          <Link onClick={() => setIsOpen(false)} href="#cursos" className="hover:text-pink">Cursos</Link>
          <Link onClick={() => setIsOpen(false)} href="#metodologia" className="hover:text-pink">Método</Link>
          <Link onClick={() => setIsOpen(false)} href="#beneficios" className="hover:text-pink">Beneficios</Link>
          <Link onClick={() => setIsOpen(false)} href="#testimonios" className="hover:text-pink">Reseñas</Link>
          
          <hr className="border-indigo border-t-2 opacity-20" />
          
          <Link onClick={() => setIsOpen(false)} href="/login" className="text-center py-3 rounded-full font-black text-indigo bg-white border-2 border-indigo">
            Entrar / Iniciar Sesión
          </Link>
        </div>
      )}
    </header>
  );
}
