import { ScrollShadow } from '@nextui-org/react';
import Comment from './Comment';

export default function ScrollBlog() {
  const numCards = 10;
  return (
    <>
      {numCards > 0 && <h3>Comentarios</h3>}
      <ScrollShadow
        hideScrollBar
        className="max-h-[40rem] overflow-y-auto flex flex-col gap-3"
      >
        {numCards > 0 ? (
          Array.from({ length: numCards }, (_, index) => (
            <Comment key={index} />
          ))
        ) : (
          <p className="text-secondary-500 font-bold text-center">
            Sin comentarios
          </p>
        )}
      </ScrollShadow>
    </>
  );
}
