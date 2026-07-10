import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-black text-night mb-8">Mi Perfil</h1>
      
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
          <div className="w-24 h-24 rounded-full bg-bee-yellow border-4 border-indigo flex items-center justify-center font-black text-4xl text-indigo">
            {profile?.first_name?.[0] || user.email?.[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-night">{profile?.first_name} {profile?.last_name}</h2>
            <p className="text-night/60 font-medium">{profile?.email || user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-night">Datos Personales</h3>
          <p className="text-night/70 font-medium">Próximamente podrás editar tu contraseña y detalles desde aquí. Si necesitas asistencia urgente, por favor contacta a soporte.</p>
        </div>
      </div>
    </div>
  );
}
