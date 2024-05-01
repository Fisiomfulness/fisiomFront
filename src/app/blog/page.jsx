import { getBlogs } from '@/services/blogs';
import BlogSection from '@/components/Blog/BlogSection';

const CARDS_PER_PAGE = 9;
const MAX_LAST_BLOGS = 8;

// ? server-side fetching
const BlogPage = async () => {
  const data = await getBlogs({ limit: CARDS_PER_PAGE, sortBy: 'title', order: 'asc' });
  const { blogs } = await getBlogs({ limit: MAX_LAST_BLOGS });
  return <BlogSection data={data} lastsBlogs={blogs} cardsPerPage={CARDS_PER_PAGE} />;
};

export default BlogPage;
