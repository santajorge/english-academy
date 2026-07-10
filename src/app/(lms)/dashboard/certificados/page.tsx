import Link from 'next/link';

export default function CertificadosPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
        <div className="text-6xl mb-6">🎓</div>
        <h1 className="text-3xl font-black text-night mb-4">Tus Certificados</h1>
        <p className="text-night/70 font-medium mb-8">
          Aún no tienes certificados. Completa el 100% de un curso para desbloquear tu diploma y lucirlo en tu CV.
        </p>
        <Link href="/dashboard" className="inline-block px-8 py-3 rounded-xl font-bold text-white bg-indigo hover:bg-indigo/90 transition-colors">
          Ir a mis cursos
        </Link>
      </div>
    </div>
  );
}
