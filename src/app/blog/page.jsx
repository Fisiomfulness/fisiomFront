import { getBlogs } from '@/services/blogs';
import BlogCards from '@/components/Blog/BlogCards';
import BlogList from '@/components/Blog/BlogList';

const BlogPage = async () => {
  const { blogs } = await getBlogs();
  return (
    <div className="flex flex-col gap-y-7 gap-x-10 lg:flex-row w-full h-full mt-10 mb-14">
      <BlogCards blogs={blogs} />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default BlogPage;
