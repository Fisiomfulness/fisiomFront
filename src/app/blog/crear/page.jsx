import { getTypes } from '@/services/types';
import CreationForm from '@/components/Blog/creation/CreationForm';

const CreateBlog = async () => {
  const { types } = await getTypes();

  return (
    <section className="flex flex-col items-center justify-center container m-auto p-2 px-auto min-h-[92vh]">
      <div className="w-full max-w-3xl px-6 py-12 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-balance text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Crea un nuevo blog
        </h1>
        <CreationForm types={types} />
      </div>
    </section>
  );
};

export default CreateBlog;
