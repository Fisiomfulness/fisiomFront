import { getBlogDetail } from '@/services/blogs';
import BlogDetail from '@/components/Blog/Detail/BlogDetail';

const BlogDetailPage = async ({ params }) => {
  const { blog } = await getBlogDetail(params.blogId);

  return <BlogDetail data={blog} />;
};

export default BlogDetailPage;
