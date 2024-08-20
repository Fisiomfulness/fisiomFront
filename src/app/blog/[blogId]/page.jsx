import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getBlogDetail } from '@/services/blogs';
import { getBlogComments, hasUserCommentedBlog } from '@/services/comments';
import { notFound } from 'next/navigation';
import BlogDetail from '@/components/Blog/detail/BlogDetail';

export const metadata = {
  title: 'Publicación',
  description: 'Publicación profesional de fisiomfulness',
};

const BlogDetailPage = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const { blog } = await getBlogDetail(params.blogId);
  if (!blog) return notFound();

  const { comments, totalComments } = await getBlogComments(params.blogId, 0, 6);

  let hasCommented = false;
  if (session) {
    const res = await hasUserCommentedBlog(params.blogId, session.user.id);
    hasCommented = res.hasCommented;
  }

  return (
    <main className="px-auto mx-auto py-4 max-w-8xl w-full min-h-[92vh]">
      <BlogDetail
        session={session}
        data={blog}
        iniComments={comments}
        totalComments={totalComments}
        hasCommented={hasCommented}
      />
    </main>
  );
};

export default BlogDetailPage;
