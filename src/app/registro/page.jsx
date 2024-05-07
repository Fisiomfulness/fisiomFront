import Register from '../../components/Registro/Register';

export const metadata = {
  title: 'Registro',
  description: 'Registrate a fisiomfulness como usuario u profesional',
};

const RegistroPage = () => {
  return (
    <main className="px-auto py-4 min-h-screen center bg-primary-400">
      <Register />
    </main>
  );
};

export default RegistroPage;
