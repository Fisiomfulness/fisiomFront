import { getBlogs } from '@/services/blogs';
import BlogCards from '@/components/Blog/BlogCards';
import BlogList from '@/components/Blog/BlogList';

const BlogPage = async () => {
  const { blogs } = await getBlogs();
  // * For better UI
  const LAST_BLOGS = blogs.length >= 12 ? 12 : 8;

  return (
    <div className="grid gap-y-7 gap-x-10 lg:grid-cols-[auto,30%] w-full h-full mt-10 mb-14">
      <BlogCards blogs={blogs} />
      <BlogList blogs={blogs.slice(0, LAST_BLOGS)} />
    </div>
  );
};

export default BlogPage;
