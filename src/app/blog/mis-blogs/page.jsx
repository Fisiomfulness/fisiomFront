import MyBlogs from '@/components/Blog/my-blogs/MyBlogs';

const page = async () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 class="mb-5 uppercase bg-gradient-to-r from-primary-600 to-primary-800 inline-block text-transparent bg-clip-text">
        Tus blogs
      </h1>
      <MyBlogs />
    </div>
  );
};

export default page;
