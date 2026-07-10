import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Verificar que el usuario tenga rol admin
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') {
    redirect('/dashboard'); // Si no es admin, lo mandamos al LMS normal
  }

  // Obtener conteos rápidos (usamos exact count)
  const { count: studentsCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student');
  const { count: coursesCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });
  const { count: enrollmentsCount } = await supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('status', 'active');

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Resumen de la Academia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <div className="text-gray-400 font-medium mb-2">Total de Alumnos</div>
          <div className="text-4xl font-black text-pink">{studentsCount || 0}</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <div className="text-gray-400 font-medium mb-2">Matrículas Activas</div>
          <div className="text-4xl font-black text-bee-yellow">{enrollmentsCount || 0}</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <div className="text-gray-400 font-medium mb-2">Cursos Publicados</div>
          <div className="text-4xl font-black text-indigo">{coursesCount || 0}</div>
        </div>
      </div>

      <div className="mt-12 bg-gray-800 p-8 rounded-3xl border border-gray-700">
        <h2 className="text-xl font-bold mb-4">¿Cómo usar el panel?</h2>
        <p className="text-gray-300 mb-4">
          Este es el Backoffice (Panel de control) exclusivo para Carmen Niz. Aquí podrás gestionar tu academia de forma visual sin necesidad de tocar la base de datos de Supabase.
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Gestionar Cursos:</strong> Crea nuevos cursos, establece sus precios y define si tienen una expiración (ej. 6 meses).</li>
          <li><strong>Gestionar Lecciones:</strong> Sube nuevas clases a los cursos existentes copiando y pegando el ID de Vimeo.</li>
        </ul>
      </div>
    </div>
  );
}
