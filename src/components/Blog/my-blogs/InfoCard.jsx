import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, Image } from '@nextui-org/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineComment } from 'react-icons/md';
import { dateFormatter } from '@/utils/helpers';
import dynamic from 'next/dynamic';
const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});

const InfoCard = ({ blog }) => {
  const router = useRouter();
  return (
    <Card className="group bg-secondary-50/60 w-full max-w-[400px] grid grid-rows-2 rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
      <Image
        removeWrapper
        alt={`${blog.title} imagen`}
        className="w-full h-[13.453rem] object-cover rounded-none group-hover:scale-105"
        src={blog.image}
      />
      <CardHeader
        onClick={() => router.push(`/blog/${blog._id}`)}
        className="overflow-hidden flex flex-col gap-3 p-6 items-start cursor-pointer rounded-none"
      >
        <div className="flex items-center justify-between w-full">
          <span className="text text-gray-500">
            {dateFormatter(blog.createdDate, false)}
          </span>
          <span className="rounded-full bg-secondary-300 text-gray-100 px-3 py-1 text-xs font-medium">
            Personal
          </span>
        </div>

        <h3 className="text-lg mb-auto font-semibold leading-tight line-clamp-2 m-0 w-full text-balance break-words">
          {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
        </h3>

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarRatings
              starRatedColor="#06B0FF"
              rating={blog.avg_rating}
              numberOfStars={5}
              starDimension="18px"
              starSpacing="2px"
            />
            {blog.avg_rating > 0 && (
              <span className="text-secondary-500">{blog.avg_rating}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary-400 ">
            <MdOutlineComment className="h-5 w-5" />
            <span className="text-sm">24</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex text-primary-800 items-center gap-1 rounded-md bg-primary-50 border-2 border-primary-100 hover:bg-primary-950 hover:text-white">
            <FiEdit />
            <span>Editar</span>
          </Button>
          <Button className="flex text-danger-500 items-center gap-1 rounded-md bg-primary-50 border-2 border-primary-100 hover:bg-danger-500 hover:text-white">
            <FaRegTrashAlt />
            <span>Eliminar</span>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default InfoCard;
