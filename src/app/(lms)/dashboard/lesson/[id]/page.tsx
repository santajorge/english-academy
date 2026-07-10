import Link from 'next/link';
import VimeoPlayer from '@/components/VimeoPlayer';

export default async function LessonPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const lessonId = params.id;
  
  // En un entorno real, aquí harías un query a Supabase para obtener 
  // los detalles de la lección (título, descripción, y vimeo_id)
  // ej: const { data: lesson } = await supabase.from('lessons').select('*').eq('id', lessonId).single();
  
  // Por ahora mockeamos los datos de la lección para la demostración
  const mockLesson = {
    title: "Present Perfect vs Past Simple",
    description: "En esta lección aprenderemos a diferenciar el uso del Presente Perfecto y el Pasado Simple en situaciones de la vida real.",
    vimeo_id: "76979871" // Un ID de video público de Vimeo para probar (cambiar por los privados luego)
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <Link href="/dashboard" className="text-indigo font-bold hover:underline mb-4 inline-block">
          ← Volver al Dashboard
        </Link>
        <div className="flex items-center gap-4 mt-2">
          <span className="bg-bee-yellow text-indigo text-xs font-black px-3 py-1 rounded-full uppercase border-2 border-indigo">Lección actual</span>
          <h1 className="text-3xl font-black text-night">{mockLesson.title}</h1>
        </div>
      </div>

      {/* Reproductor de Video */}
      <div className="mb-8">
        <VimeoPlayer videoId={mockLesson.vimeo_id} title={mockLesson.title} />
      </div>

      {/* Material Complementario y Descripción */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-night mb-4">Sobre esta clase</h2>
            <p className="text-night/70 font-medium leading-relaxed">
              {mockLesson.description}
            </p>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <h3 className="font-bold text-night mb-4 flex items-center gap-2">
              <span>📎</span> Recursos
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-indigo hover:text-indigo transition-colors font-medium text-sm text-left">
                  <span>Guía de Estudio (PDF)</span>
                  <span>↓</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-pink hover:text-pink transition-colors font-medium text-sm text-left">
                  <span>Ejercicios Prácticos</span>
                  <span>✏️</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
