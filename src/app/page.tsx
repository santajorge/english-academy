import Link from "next/link";
import Image from "next/image";
import { createClient } from '@/utils/supabase/server';
import PublicNavbar from '@/components/PublicNavbar';

export default async function Home() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true)
    .order('level');

  return (
    <div className="min-h-screen bg-white selection:bg-pink selection:text-white flex flex-col">
      <PublicNavbar />

      {/* Hero Section */}
      <main className="flex-1 w-full">
        <section className="relative overflow-hidden bg-bee-yellow py-20 lg:py-32 border-b-8 border-indigo">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-black text-indigo leading-[1.1] mb-6">
                Domina el inglés con la energía de una abeja.
              </h1>
              <p className="text-xl text-night/80 font-medium mb-10 max-w-lg">
                Cursos diseñados para que hables con confianza. Desde A1 hasta B2, metodologías dinámicas, sin aburrimiento y 100% efectivas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#cursos" className="px-8 py-4 rounded-full font-black text-xl text-white bg-pink hover:bg-pink/90 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(71,80,154,1)] border-4 border-indigo">
                  Ver Niveles
                </Link>
                <Link href="#metodologia" className="px-8 py-4 rounded-full font-bold text-xl text-indigo bg-white hover:bg-gray-100 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(26,26,46,1)] border-4 border-night">
                  ¿Cómo funciona?
                </Link>
              </div>
            </div>

            {/* Visual Decorativo */}
            <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="absolute inset-0 bg-pink rounded-[3rem] rotate-6 transform border-4 border-indigo shadow-[12px_12px_0px_0px_rgba(26,26,46,1)]"></div>
              <div className="absolute inset-0 bg-white rounded-[3rem] -rotate-3 transform border-4 border-night overflow-hidden flex items-center justify-center p-8">
                <Image
                  src="/hero-bee.png"
                  alt="thebee'sniz mascot"
                  width={400}
                  height={400}
                  className="object-contain hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-8 left-8 bg-bee-yellow text-indigo font-black px-4 py-2 border-2 border-indigo rounded-xl transform -rotate-12 shadow-[4px_4px_0px_0px_rgba(71,80,154,1)]">B2</div>
                <div className="absolute bottom-12 right-8 bg-indigo text-white font-black px-4 py-2 border-2 border-night rounded-xl transform rotate-6 shadow-[4px_4px_0px_0px_rgba(236,92,137,1)]">100% ONLINE</div>
              </div>
            </div>
          </div>
        </section>

        {/* Metodología */}
        <section id="metodologia" className="py-24 bg-white border-b-8 border-indigo">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-indigo mb-6">Un método que no da sueño 💤🚫</h2>
              <p className="text-xl text-night/70 font-medium">Aprender gramática es importante, pero hablarlo sin trabarte es la meta. Combinamos la teoría esencial con horas de práctica conversacional real.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gray-50 rounded-3xl border-2 border-gray-100 shadow-sm hover:border-pink transition-colors">
                <div className="text-6xl mb-6">🎥</div>
                <h3 className="text-2xl font-black text-night mb-4">Video Lecciones</h3>
                <p className="text-night/70 font-medium">Clases grabadas en alta calidad para que las veas a tu ritmo, pausando y repitiendo cuando quieras.</p>
              </div>
              <div className="text-center p-8 bg-gray-50 rounded-3xl border-2 border-gray-100 shadow-sm hover:border-bee-yellow transition-colors transform md:-translate-y-4">
                <div className="text-6xl mb-6">📝</div>
                <h3 className="text-2xl font-black text-night mb-4">Ejercicios Prácticos</h3>
                <p className="text-night/70 font-medium">Material descargable diseñado para que apliques al instante lo que acabas de aprender.</p>
              </div>
              <div className="text-center p-8 bg-gray-50 rounded-3xl border-2 border-gray-100 shadow-sm hover:border-indigo transition-colors">
                <div className="text-6xl mb-6">🗣️</div>
                <h3 className="text-2xl font-black text-night mb-4">Focus en Speaking</h3>
                <p className="text-night/70 font-medium">Nuestros módulos están orientados a darte herramientas para conversaciones del mundo real.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cursos */}
        <section id="cursos" className="py-24 bg-gray-50 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl lg:text-5xl font-black text-night text-center mb-16">
              Elige tu nivel, nosotros te damos las alas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses?.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-12">
                  Próximamente publicaremos nuestros niveles. ¡Mantente atento!
                </div>
              )}

              {courses?.map((course) => {
                const isB1 = course.level === 'B1';
                const cardBg = isB1 ? 'bg-indigo text-white' : 'bg-white text-night';
                const iconBg = isB1 ? 'bg-bee-yellow text-indigo' :
                  course.level === 'A1' ? 'bg-bee-yellow' :
                    course.level === 'A2' ? 'bg-pink text-white' : 'bg-night text-white';
                const shadow = isB1 ? 'shadow-[8px_8px_0px_0px_rgba(236,92,137,1)]' : 'shadow-[8px_8px_0px_0px_rgba(71,80,154,1)]';

                return (
                  <div key={course.id} className={`group ${cardBg} rounded-3xl p-8 border-4 border-night hover:-translate-y-2 transition-transform ${shadow} flex flex-col h-full relative overflow-hidden`}>
                    {isB1 && (
                      <div className="absolute -right-8 top-6 bg-bee-yellow text-indigo text-[10px] font-black w-40 text-center py-1.5 transform rotate-45 border-y-2 border-night shadow-sm">MÁS POPULAR</div>
                    )}
                    <div className={`${iconBg} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 border-night mb-6 transform -rotate-6`}>{course.level}</div>
                    <h3 className={`text-2xl font-black mb-3 ${isB1 ? 'text-white' : 'text-indigo'}`}>{course.title}</h3>
                    <p className={`font-medium mb-8 flex-1 ${isB1 ? 'text-white/80' : 'text-night/70'}`}>{course.description}</p>
                    <div className={`pt-6 border-t-2 ${isB1 ? 'border-white/20' : 'border-gray-100'} flex items-center justify-between`}>
                      <div className="flex flex-col">
                        <span className={`text-xl font-black ${isB1 ? 'text-bee-yellow' : 'text-indigo'}`}>${course.price} <span className={`text-xs ${isB1 ? 'text-white/50' : 'text-night/50'}`}>USD</span></span>
                        {course.price_ars && (
                          <span className={`text-sm font-bold ${isB1 ? 'text-pink' : 'text-pink'}`}>${course.price_ars.toLocaleString()} <span className="text-xs">ARS</span></span>
                        )}
                      </div>
                      <Link href={`/dashboard/checkout/${course.id}`} className={`font-bold ${isB1 ? 'text-pink group-hover:text-white' : 'text-pink group-hover:text-indigo'} transition-colors`}>Comprar →</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section id="beneficios" className="py-24 bg-indigo text-white">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">Por qué elegir a la colmena 🐝</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-bee-yellow flex-shrink-0 mt-1 shadow-[2px_2px_0px_0px_rgba(26,26,46,1)]"></div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Acceso de por vida</h4>
                    <p className="text-white/70 font-medium">Compras el curso una vez, es tuyo para siempre. Incluyendo futuras actualizaciones.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink flex-shrink-0 mt-1 shadow-[2px_2px_0px_0px_rgba(26,26,46,1)]"></div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Soporte directo de Carmen</h4>
                    <p className="text-white/70 font-medium">Nada de bots. Resolución de dudas reales con tu profesora.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 mt-1 shadow-[2px_2px_0px_0px_rgba(26,26,46,1)]"></div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Certificado al finalizar</h4>
                    <p className="text-white/70 font-medium">Demuestra tu nuevo nivel de inglés para sumar puntos en tu CV o LinkedIn.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-bee-yellow p-8 lg:p-12 rounded-[3rem] text-night border-4 border-night transform rotate-2 shadow-[12px_12px_0px_0px_rgba(236,92,137,1)]">
              <div className="text-4xl font-black mb-6">"El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora."</div>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section id="testimonios" className="py-24 bg-white border-b-8 border-indigo relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-bee-yellow rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl lg:text-5xl font-black text-indigo text-center mb-16">Lo que dicen las abejitas felices</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-100 relative mt-8">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-pink text-white flex items-center justify-center rounded-full text-2xl border-2 border-indigo shadow-[2px_2px_0px_0px_rgba(71,80,154,1)]">⭐</div>
                <p className="text-night/80 font-medium italic mb-6 mt-4">"Había intentado con mil academias y me aburría en la segunda clase. El método de thebee'sniz me atrapó y por fin pasé la entrevista de trabajo en inglés."</p>
                <div className="font-bold text-indigo">– Martina López</div>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-100 relative">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-pink text-white flex items-center justify-center rounded-full text-2xl border-2 border-indigo shadow-[2px_2px_0px_0px_rgba(71,80,154,1)]">⭐</div>
                <p className="text-night/80 font-medium italic mb-6 mt-4">"Los videos son de excelente calidad y los ejercicios van directo al grano. Muy recomendado para quienes tenemos poco tiempo pero queremos avanzar de verdad."</p>
                <div className="font-bold text-indigo">– Juan Perez</div>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-100 relative mt-8 md:col-span-2 lg:col-span-1">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-pink text-white flex items-center justify-center rounded-full text-2xl border-2 border-indigo shadow-[2px_2px_0px_0px_rgba(71,80,154,1)]">⭐</div>
                <p className="text-night/80 font-medium italic mb-6 mt-4">"Carmen explica temas súper difíciles con una facilidad increíble. Pasé de no entender nada de la gramática del B2 a usarla todos los días."</p>
                <div className="font-bold text-indigo">– Sofía García</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Público */}
      <footer className="bg-night text-white py-12 border-t-4 border-pink">
        <div className="container mx-auto px-6 text-center">
          <div className="text-3xl font-black tracking-tight text-bee-yellow uppercase mb-6">
            thebee'sniz
          </div>
          <p className="text-white/60 font-medium">
            © {new Date().getFullYear()} thebee'sniz. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
