import { useState } from 'react';
import { ScrollShadow, Spinner } from '@nextui-org/react';
import { getBlogComments } from '@/services/comments';
import Comment from './Comment';

export default function ScrollBlog({
  blogId,
  comments,
  totalComments,
  setComments,
}) {
  const [loading, setLoading] = useState(false);

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const bottom = scrollHeight - scrollTop === clientHeight;

    // * fetch comments in reach bottom of scroll and only if there are more
    if (bottom && comments.length < totalComments) {
      setLoading(true);
      getBlogComments(blogId, comments.length, 6)
        .then((res) => setComments((prev) => [...prev, ...res.comments]))
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      {comments.length > 0 && <h3 className="text-lg">Comentarios</h3>}
      <ScrollShadow
        id="comments-container"
        hideScrollBar
        className="max-h-[40rem] overflow-y-auto flex flex-col gap-3"
        onScroll={handleScroll}
      >
        {comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
            {loading && <Spinner size="md" color="primary" />}
          </>
        ) : (
          <p className="text-secondary-500 font-bold text-center">
            Sin comentarios
          </p>
        )}
      </ScrollShadow>
    </>
  );
}
