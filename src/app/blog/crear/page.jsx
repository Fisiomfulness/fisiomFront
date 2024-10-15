import { getTypes } from '../../../services/types';
import BlogForm from '@/components/Blog/BlogForm';

export const metadata = {
  title: 'Crea un blog',
  description: 'formulario de creación de un blog profesional',
};

const CreateBlog = async () => {
  const { types } = await getTypes();

  return (
    <section className="flex flex-col items-center justify-center container m-auto p-2 px-auto min-h-[92vh]">
      <div className="w-full max-w-[580px] px-6 py-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-balance text-2xl md:text-3xl font-bold mb-6 text-gray-900">
          Crea un nuevo blog
        </h1>
        <BlogForm types={types} />
      </div>
    </section>
  );
};

export default CreateBlog;
