import { getBlogDetail } from '@/services/blogs';
import BlogDetail from '@/components/Blog/detail/BlogDetail';
import { getBlogComments } from '@/services/comments';

const BlogDetailPage = async ({ params }) => {
  const { blog } = await getBlogDetail(params.blogId);
  const { comments, totalComments  } = await getBlogComments(params.blogId, 0, 6);

  return <BlogDetail data={blog} iniComments={comments} totalComments={totalComments} />;
};

export default BlogDetailPage;
