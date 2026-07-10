import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-night mb-2">¡Bienvenido de vuelta! 🐝</h1>
        <p className="text-night/60">Aquí tienes un resumen de tu progreso actual.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Tarjeta de Progreso del Curso Activo */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="bg-bee-yellow text-indigo text-xs font-black px-3 py-1 rounded-full mb-3 inline-block">B1 INTERMEDIATE</span>
              <h3 className="text-2xl font-bold text-night">Unidad 4: Viajes y Aventuras</h3>
            </div>
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border-4 border-indigo text-xl font-bold text-indigo">
              45%
            </div>
          </div>
          
          <div className="mb-6">
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-pink w-[45%] rounded-full"></div>
            </div>
            <p className="text-sm text-night/50 mt-2 font-medium">9 de 20 lecciones completadas</p>
          </div>

          <Link href="/dashboard/lesson/1" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white bg-indigo hover:bg-indigo/90 transition-colors">
            Continuar lección →
          </Link>
        </div>

        {/* Tarjeta de Próxima Clase/Examen */}
        <div className="bg-indigo text-white rounded-3xl p-8 border border-night/10 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <div>
            <h3 className="font-bold text-white/80 mb-1">Próximo objetivo</h3>
            <p className="text-xl font-black mb-4">Quiz: Present Perfect</p>
          </div>
          <button className="w-full py-3 bg-white text-indigo font-bold rounded-xl hover:bg-gray-50 transition-colors">
            Repasar material
          </button>
        </div>
      </div>

      {/* Lista de Cursos */}
      <h2 className="text-xl font-bold text-night mb-6">Tus Cursos</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="bg-bee-yellow w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-indigo border-2 border-indigo transform -rotate-3">B1</div>
          <div>
            <h4 className="font-bold text-lg">Intermediate English</h4>
            <p className="text-sm text-night/60 mb-2">Activo</p>
            <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo w-[45%] rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-6 opacity-60">
          <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-gray-400 border-2 border-gray-200">A2</div>
          <div>
            <h4 className="font-bold text-lg text-gray-500">Elementary English</h4>
            <p className="text-sm text-gray-400 mb-2">Completado</p>
            <Link href="/dashboard/certificados" className="text-sm font-bold text-pink hover:underline">
              Ver Certificado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
