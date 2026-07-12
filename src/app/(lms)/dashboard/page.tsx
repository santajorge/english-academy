import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Verificar si es administrador
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'admin') {
    redirect('/admin/courses');
  }

  // Si no es admin, intentamos obtener sus cursos comprados
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('student_id', user.id)
    .eq('status', 'active');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-night mb-2">¡Bienvenido de vuelta! 🐝</h1>
        <p className="text-night/60">Aquí tienes un resumen de tu progreso actual.</p>
      </div>

      {enrollments && enrollments.length > 0 ? (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-night mb-6">Tus Cursos Activos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {enrollments.map((enrollment: any) => {
              const course = enrollment.courses;
              return (
                <div key={course.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-6">
                  <div className="bg-bee-yellow w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-indigo border-2 border-indigo transform -rotate-3">
                    {course.level}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{course.title}</h4>
                    <p className="text-sm text-night/60 mb-2">Vence: {enrollment.expires_at ? new Date(enrollment.expires_at).toLocaleDateString() : 'Vitalicio'}</p>
                    <Link href={`/dashboard/course/${course.id}`} className="text-sm font-bold text-pink hover:underline">
                      Ir al curso →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-indigo text-white rounded-3xl p-12 text-center shadow-sm mb-12">
          <h3 className="text-2xl font-black mb-4">Aún no tienes cursos activos</h3>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Explora nuestros niveles y encuentra el curso ideal para impulsar tu inglés.
          </p>
          <Link href="/#cursos" className="inline-block px-8 py-3 bg-pink text-white font-bold rounded-xl hover:-translate-y-1 transition-transform">
            Ver Cursos Disponibles
          </Link>
        </div>
      )}

      {/* Próximamente: Historial o Certificados (Versión Estática Demo) */}
      <h2 className="text-xl font-bold text-night mb-6 opacity-60">Historial (Ejemplo Demo)</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-6 opacity-60">
          <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-gray-400 border-2 border-gray-200">A2</div>
          <div>
            <h4 className="font-bold text-lg text-gray-500">Elementary English</h4>
            <p className="text-sm text-gray-400 mb-2">Completado</p>
            <Link href="/dashboard/certificados" className="text-sm font-bold text-gray-400 cursor-not-allowed">
              Ver Certificado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
