import TrabajaConNosotrosClient from './client.jsx';

export const metadata = {
  title: 'Trabaja con nosotros',
  description: 'Formulario de petición de colaboracion/empleo',
};

const TrabajaConNosotros = () => {
  return (
    <main className="max-w-8xl w-full px-auto py-4 place-content-center mx-auto">
      <p className="mb-8">
        Trabajá con{' '}
        <span className="text-[#06B0FF] underline">
          <a href="/about" target="_blank">
            nosotros
          </a>
        </span>
      </p>
      <TrabajaConNosotrosClient />
    </main>
  );
};

export default TrabajaConNosotros;
