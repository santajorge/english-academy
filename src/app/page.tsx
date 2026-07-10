import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-pink selection:text-white flex flex-col">
      {/* Header Público */}
      <header className="sticky top-0 z-50 w-full border-b-4 border-indigo bg-bee-yellow shadow-lg">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-3xl font-black tracking-tight text-indigo uppercase transform -rotate-2">
            thebee'sniz
          </div>
          <nav className="hidden md:flex gap-8 font-bold text-night text-lg">
            <Link href="#cursos" className="hover:text-pink transition-colors">Cursos</Link>
            <Link href="#metodologia" className="hover:text-pink transition-colors">Método</Link>
            <Link href="#beneficios" className="hover:text-pink transition-colors">Beneficios</Link>
            <Link href="#testimonios" className="hover:text-pink transition-colors">Reseñas</Link>
          </nav>
          <div className="flex gap-2 sm:gap-4">
            <Link href="/login" className="hidden sm:inline-block px-6 py-2.5 rounded-full font-bold text-night hover:bg-white/50 transition-colors border-2 border-transparent">
              Entrar
            </Link>
            <Link href="#cursos" className="px-6 py-2.5 rounded-full font-black text-white bg-pink hover:bg-pink/90 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(71,80,154,1)] border-2 border-indigo text-sm sm:text-base">
              Comenzar ya
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
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
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto">
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

        {/* Cursos Rápidos */}
        <section id="cursos" className="py-24 bg-gray-50 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl lg:text-5xl font-black text-night text-center mb-16">
              Elige tu nivel, nosotros te damos las alas
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Nivel A1 */}
              <div className="group bg-white rounded-3xl p-8 border-4 border-indigo hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(71,80,154,1)] flex flex-col h-full">
                <div className="bg-bee-yellow w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 border-indigo mb-6 transform -rotate-3">A1</div>
                <h3 className="text-2xl font-black text-indigo mb-3">Beginner</h3>
                <p className="text-night/70 font-medium mb-8 flex-1">Da tus primeros pasos. Aprende a presentarte, vocabulario básico y a sobrevivir en situaciones cotidianas.</p>
                <div className="pt-6 border-t-2 border-gray-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-night">$49<span className="text-sm text-night/50">/mes</span></span>
                  <button className="text-pink font-bold group-hover:underline">Ver plan →</button>
                </div>
              </div>

              {/* Nivel A2 */}
              <div className="group bg-white rounded-3xl p-8 border-4 border-indigo hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(71,80,154,1)] flex flex-col h-full">
                <div className="bg-pink text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 border-indigo mb-6 transform rotate-3">A2</div>
                <h3 className="text-2xl font-black text-indigo mb-3">Elementary</h3>
                <p className="text-night/70 font-medium mb-8 flex-1">Conéctate más con el mundo. Mejora tu gramática y sostén conversaciones más largas y fluidas.</p>
                <div className="pt-6 border-t-2 border-gray-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-night">$49<span className="text-sm text-night/50">/mes</span></span>
                  <button className="text-pink font-bold group-hover:underline">Ver plan →</button>
                </div>
              </div>

              {/* Nivel B1 */}
              <div className="group bg-indigo text-white rounded-3xl p-8 border-4 border-night hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(236,92,137,1)] flex flex-col h-full relative overflow-hidden">
                <div className="absolute -right-8 top-6 bg-bee-yellow text-indigo text-[10px] font-black w-40 text-center py-1.5 transform rotate-45 border-y-2 border-night shadow-sm">MÁS POPULAR</div>
                <div className="bg-bee-yellow text-indigo w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 border-night mb-6 transform -rotate-6">B1</div>
                <h3 className="text-2xl font-black text-white mb-3">Intermediate</h3>
                <p className="text-white/80 font-medium mb-8 flex-1">Siente la independencia. Expresa ideas complejas, viaja sin miedos y consume contenido en inglés.</p>
                <div className="pt-6 border-t-2 border-white/20 flex items-center justify-between">
                  <span className="text-2xl font-black text-bee-yellow">$59<span className="text-sm text-white/50">/mes</span></span>
                  <button className="text-pink font-bold group-hover:underline">Ver plan →</button>
                </div>
              </div>

              {/* Nivel B2 */}
              <div className="group bg-white rounded-3xl p-8 border-4 border-indigo hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(71,80,154,1)] flex flex-col h-full">
                <div className="bg-night text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 border-indigo mb-6 transform rotate-6">B2</div>
                <h3 className="text-2xl font-black text-indigo mb-3">Upper Int.</h3>
                <p className="text-night/70 font-medium mb-8 flex-1">Domina la conversación. Prepárate para el ámbito profesional, exámenes internacionales y debates.</p>
                <div className="pt-6 border-t-2 border-gray-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-night">$69<span className="text-sm text-night/50">/mes</span></span>
                  <button className="text-pink font-bold group-hover:underline">Ver plan →</button>
                </div>
              </div>
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
              <p className="font-bold text-xl text-night/80">– Carmen Niz</p>
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
