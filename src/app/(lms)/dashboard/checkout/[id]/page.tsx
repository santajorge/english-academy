import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CheckoutPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const courseId = params.id;
  const supabase = await createClient();
  
  // Verificamos que el usuario esté logueado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?callbackUrl=/dashboard/checkout/${courseId}`);
  }

  // Obtenemos los datos del curso
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();

  if (!course) {
    return <div className="p-12 text-center text-xl">Curso no encontrado.</div>;
  }

  // Verificamos si ya está matriculado
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('course_id', course.id)
    .eq('student_id', user.id)
    .eq('status', 'active')
    .single();

  if (enrollment && (!enrollment.expires_at || new Date(enrollment.expires_at) > new Date())) {
    redirect('/dashboard'); // Ya lo tiene comprado y activo
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-night shadow-[8px_8px_0px_0px_rgba(26,26,46,1)]">
        <h1 className="text-3xl md:text-4xl font-black text-night mb-4">Resumen de Compra</h1>
        
        <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-bee-yellow w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-indigo border-2 border-night transform -rotate-3">
              {course.level}
            </div>
            <h2 className="text-2xl font-bold text-indigo">{course.title}</h2>
          </div>
          <p className="text-night/70 font-medium mb-4">{course.description}</p>
          <div className="text-sm font-bold text-gray-500 bg-gray-200 inline-block px-3 py-1 rounded-full">
            Acceso: {course.duration_months ? `${course.duration_months} meses` : 'Vitalicio'}
          </div>
        </div>

        <div className="border-t-2 border-gray-100 pt-8">
          <h3 className="text-xl font-bold text-night mb-6">Elige tu método de pago:</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Opción Argentina (MercadoPago) */}
            {course.price_ars && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 flex flex-col items-center text-center">
                <h4 className="font-bold text-blue-900 mb-2">Para Argentina 🇦🇷</h4>
                <div className="text-3xl font-black text-blue-600 mb-6">${course.price_ars.toLocaleString()} <span className="text-lg">ARS</span></div>
                <form action="/api/checkout/mercadopago" method="POST" className="w-full mt-auto">
                  <input type="hidden" name="courseId" value={course.id} />
                  <button type="submit" className="w-full bg-[#009EE3] text-white font-bold py-4 rounded-xl hover:bg-[#008CCh] transition-colors shadow-sm">
                    Pagar con MercadoPago
                  </button>
                </form>
              </div>
            )}

            {/* Opción Internacional (PayPal) */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 flex flex-col items-center text-center">
              <h4 className="font-bold text-yellow-900 mb-2">Internacional 🌎</h4>
              <div className="text-3xl font-black text-yellow-600 mb-6">${course.price} <span className="text-lg">USD</span></div>
              <form action="/api/checkout/paypal" method="POST" className="w-full mt-auto">
                <input type="hidden" name="courseId" value={course.id} />
                <button type="submit" className="w-full bg-[#003087] text-white font-bold py-4 rounded-xl hover:bg-[#00205A] transition-colors shadow-sm">
                  Pagar con PayPal
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
