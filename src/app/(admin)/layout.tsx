import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row font-sans">
      <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-700">
          <div className="text-xl font-black text-pink">
            thebee'sniz ADMIN
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 hover:bg-gray-700 rounded-xl font-medium transition-colors">
            Resumen
          </Link>
          <Link href="/admin/courses" className="block px-4 py-3 hover:bg-gray-700 rounded-xl font-medium transition-colors">
            Gestionar Cursos
          </Link>
          <Link href="/admin/lessons" className="block px-4 py-3 hover:bg-gray-700 rounded-xl font-medium transition-colors">
            Gestionar Lecciones
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link href="/dashboard" className="block px-4 py-3 text-gray-400 hover:text-white rounded-xl font-medium transition-colors">
            ← Volver al LMS
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
