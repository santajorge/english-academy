import { login, signup } from './actions'
import Link from 'next/link'

export default async function LoginPage(props: { searchParams: Promise<{ error?: string, view?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error
  const isSignUp = searchParams?.view === 'signup'

  return (
    <div className="min-h-screen flex selection:bg-pink selection:text-white">
      {/* Lado Izquierdo: Formulario */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center md:text-left">
            <Link href="/" className="inline-block text-3xl font-black tracking-tight text-indigo uppercase transform -rotate-2 mb-8">
              thebee'sniz
            </Link>
            <h1 className="text-3xl font-black text-night mb-2">
              {isSignUp ? 'Crea tu cuenta' : 'Hola de nuevo 👋'}
            </h1>
            <p className="text-night/60 font-medium">
              {isSignUp 
                ? 'Únete a la colmena y domina el inglés.' 
                : 'Ingresa a tu dashboard para continuar aprendiendo.'}
            </p>
          </div>

          <form className="flex flex-col gap-5">
            {isSignUp && (
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-bold text-night text-sm" htmlFor="first_name">Nombre</label>
                  <input
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo focus:outline-none transition-colors"
                    id="first_name"
                    name="first_name"
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-bold text-night text-sm" htmlFor="last_name">Apellido</label>
                  <input
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo focus:outline-none transition-colors"
                    id="last_name"
                    name="last_name"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="font-bold text-night text-sm" htmlFor="email">Email</label>
              <input
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo focus:outline-none transition-colors"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2 mb-2">
              <label className="font-bold text-night text-sm" htmlFor="password">Contraseña</label>
              <input
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo focus:outline-none transition-colors"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 font-medium p-4 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}

            {isSignUp ? (
              <button formAction={signup} className="w-full py-4 rounded-xl font-black text-white bg-indigo hover:bg-indigo/90 transition-all shadow-[4px_4px_0px_0px_rgba(26,26,46,1)] border-2 border-night mt-4">
                Registrarme
              </button>
            ) : (
              <button formAction={login} className="w-full py-4 rounded-xl font-black text-white bg-pink hover:bg-pink/90 transition-all shadow-[4px_4px_0px_0px_rgba(71,80,154,1)] border-2 border-indigo mt-4">
                Entrar a la colmena
              </button>
            )}
          </form>

          <div className="mt-8 text-center text-night/60 font-medium">
            {isSignUp ? (
              <p>¿Ya tienes una cuenta? <Link href="/login" className="text-indigo font-bold hover:underline">Inicia sesión</Link></p>
            ) : (
              <p>¿No tienes cuenta aún? <Link href="/login?view=signup" className="text-pink font-bold hover:underline">Regístrate</Link></p>
            )}
          </div>
        </div>
      </div>

      {/* Lado Derecho: Visual Vibrante (Oculto en móvil) */}
      <div className="hidden lg:flex flex-1 bg-bee-yellow border-l-4 border-indigo flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-pink rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 text-center max-w-md">
          <div className="text-8xl mb-8 transform hover:scale-110 transition-transform duration-500 cursor-default">🐝</div>
          <h2 className="text-4xl font-black text-indigo mb-6 leading-tight">
            Ready to become the bee's knees?
          </h2>
          <p className="text-xl text-night/80 font-medium">
            Entra ahora y sigue tu camino hacia la fluidez. Tus lecciones te están esperando.
          </p>
        </div>
      </div>
    </div>
  )
}
