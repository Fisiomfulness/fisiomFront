import { User, Link } from '@nextui-org/react';
import Stars from './Star';

export default function Comment({ comment }) {
  return (
    <div className="bg-primary-50 p-4 rounded-lg hover:bg-[#D8EEF8] md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-2">
        <User
          name={comment.sender?.name}
          description={<Stars rating={comment.rating} />}
          avatarProps={{
            src: comment.sender?.image,
          }}
          className="text-zinc-800 italic"
        />
        <Link href="#" color="danger">
          Reportar
        </Link>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
