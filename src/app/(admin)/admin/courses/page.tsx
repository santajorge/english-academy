import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function AdminCourses() {
  const supabase = await createClient();
  
  // Verificación de admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') redirect('/dashboard');

  const { data: courses } = await supabase.from('courses').select('*').order('created_at', { ascending: false });

  async function createCourse(formData: FormData) {
    'use server'
    const sbUser = await createClient();
    const { data: { user } } = await sbUser.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: profile } = await sbUser.from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') throw new Error('Unauthorized');

    // Usar admin client para bypass RLS
    const { createClient: createAdminClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const duration = formData.get('duration') ? Number(formData.get('duration')) : null;
    
    await supabaseAdmin.from('courses').insert({
      title: formData.get('title') as string,
      level: formData.get('level') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      duration_months: duration,
      is_active: true
    });
    revalidatePath('/admin/courses');
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Gestión de Cursos</h1>
      
      <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 mb-12">
        <h2 className="text-xl font-bold mb-6">Crear Nuevo Curso</h2>
        <form action={createCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" placeholder="Título del curso (ej. Inglés Básico)" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white" />
          <select name="level" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white">
            <option value="A1">A1 (Principiante)</option>
            <option value="A2">A2 (Básico)</option>
            <option value="B1">B1 (Intermedio)</option>
            <option value="B2">B2 (Avanzado)</option>
          </select>
          <input name="price" type="number" step="0.01" placeholder="Precio (USD)" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white" />
          <input name="duration" type="number" placeholder="Duración en meses (Vacío = Vitalicio)" className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white" />
          <textarea name="description" placeholder="Descripción breve" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white md:col-span-2"></textarea>
          <button type="submit" className="md:col-span-2 bg-pink text-white font-bold py-3 rounded-xl hover:bg-pink/80 transition-colors">Guardar Curso</button>
        </form>
      </div>

      <h2 className="text-xl font-bold mb-6">Cursos Existentes</h2>
      <div className="grid gap-4">
        {courses?.map(course => (
          <div key={course.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">{course.title} <span className="text-sm bg-gray-700 px-2 py-1 rounded ml-2 text-bee-yellow">{course.level}</span></div>
              <div className="text-sm text-gray-400 mt-1">Precio: ${course.price} | Expiración: {course.duration_months ? `${course.duration_months} meses` : 'Vitalicio'}</div>
            </div>
            <div className="text-sm px-3 py-1 bg-green-500/20 text-green-400 rounded-full font-medium">Activo</div>
          </div>
        ))}
        {courses?.length === 0 && <div className="text-gray-500">No hay cursos creados aún.</div>}
      </div>
    </div>
  );
}
