import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function AdminLessons() {
  const supabase = await createClient();
  
  // Verificación de admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') redirect('/dashboard');

  const { data: courses } = await supabase.from('courses').select('id, title').order('created_at', { ascending: false });
  const { data: lessons } = await supabase.from('lessons').select('*, courses(title)').order('created_at', { ascending: false });

  async function createLesson(formData: FormData) {
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
    
    await supabaseAdmin.from('lessons').insert({
      title: formData.get('title') as string,
      course_id: formData.get('course_id') as string,
      description: formData.get('description') as string,
      vimeo_id: formData.get('vimeo_id') as string,
      order_index: Number(formData.get('order_index'))
    });
    revalidatePath('/admin/lessons');
  }

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Gestión de Lecciones</h1>
      
      <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 mb-12">
        <h2 className="text-xl font-bold mb-6">Añadir Lección a un Curso</h2>
        <form action={createLesson} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="course_id" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white">
            <option value="">Selecciona el Curso...</option>
            {courses?.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <input name="title" placeholder="Título de la Lección" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white" />
          <input name="vimeo_id" placeholder="ID del Video en Vimeo (ej. 76979871)" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white" />
          <input name="order_index" type="number" placeholder="Orden (ej. 1, 2, 3...)" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white" />
          <textarea name="description" placeholder="Descripción de la clase" required className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-white md:col-span-2"></textarea>
          <button type="submit" className="md:col-span-2 bg-indigo text-white font-bold py-3 rounded-xl hover:bg-indigo/80 transition-colors">Añadir Lección</button>
        </form>
      </div>

      <h2 className="text-xl font-bold mb-6">Lecciones Subidas</h2>
      <div className="grid gap-4">
        {lessons?.map(lesson => (
          <div key={lesson.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">{lesson.title}</div>
              <div className="text-sm text-gray-400 mt-1">Curso: {lesson.courses?.title} | Orden: {lesson.order_index} | Vimeo ID: {lesson.vimeo_id}</div>
            </div>
          </div>
        ))}
        {lessons?.length === 0 && <div className="text-gray-500">No hay lecciones creadas aún.</div>}
      </div>
    </div>
  );
}
