import { getBlogs } from '@/services/blogs';
import BlogSection from '@/components/Blog/BlogSection';

// ? server-side fetching
const BlogPage = async () => {
  const data = await getBlogs({ limit: 9, sortBy: 'title', order: 'asc' });
  const { blogs } = await getBlogs({ limit: 8 });
  return <BlogSection data={data} lastsBlogs={blogs} />;
};

export default BlogPage;
