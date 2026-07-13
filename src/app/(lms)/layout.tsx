import Link from "next/link";

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-soft text-night flex flex-col md:flex-row font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-100">
          <div className="text-2xl font-black text-indigo transform -rotate-2">
            thebee'sniz
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-50 text-indigo rounded-xl font-bold border border-gray-100">
            <span>📚</span> Mis Cursos
          </Link>
          <Link href="/dashboard/certificados" className="flex items-center gap-3 px-4 py-3 text-night/60 hover:bg-gray-50 hover:text-indigo rounded-xl font-medium transition-colors">
            <span>🎓</span> Certificados
          </Link>
          <Link href="/dashboard/perfil" className="flex items-center gap-3 px-4 py-3 text-night/60 hover:bg-gray-50 hover:text-indigo rounded-xl font-medium transition-colors">
            <span>👤</span> Perfil
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-night/60 hover:text-pink rounded-xl font-medium transition-colors">
              <span>🚪</span> Salir
            </button>
          </form>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 h-screen overflow-y-auto">
        {/* Header superior limpio */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8 flex-shrink-0">
          <div className="md:hidden text-xl font-black text-indigo transform -rotate-2">
            thebee'sniz
          </div>
          <h2 className="hidden md:block font-bold text-xl">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-bee-yellow border-2 border-indigo flex items-center justify-center font-bold">
              SN
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8 flex-1">
          {children}
        </div>
      </main>

      {/* Navegación Mobile Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-50">
        <Link href="/dashboard" className="flex flex-col items-center text-indigo">
          <span className="text-xl">📚</span>
          <span className="text-[10px] font-bold mt-1">Cursos</span>
        </Link>
        <Link href="/dashboard/certificados" className="flex flex-col items-center text-gray-400">
          <span className="text-xl">🎓</span>
          <span className="text-[10px] font-medium mt-1">Logros</span>
        </Link>
        <Link href="/dashboard/perfil" className="flex flex-col items-center text-gray-400">
          <span className="text-xl">👤</span>
          <span className="text-[10px] font-medium mt-1">Perfil</span>
        </Link>
        <form action="/api/auth/logout" method="POST" className="flex flex-col items-center">
          <button type="submit" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">🚪</span>
            <span className="text-[10px] font-medium mt-1">Salir</span>
          </button>
        </form>
      </nav>
    </div>
  );
}
