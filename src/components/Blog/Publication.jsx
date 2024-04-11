import { Image } from '@nextui-org/react';
import { truncateText, dateFormatter } from '@/utils/helpers';

function Publication({ data }) {
  return (
    <div className="w-full flex gap-5 items-center">
      <Image isBlurred width={60} src={data.image} alt="NextUI Album Cover" />
      <div className="flex flex-col grow">
        <h2 className="text-[0.85rem] mb-0">{data.title}</h2>
        <p className="text-[0.75rem] mt-[0.1rem]">
          {truncateText(data.text, 8)}
        </p>
        <span className="text-[0.65rem] mt-[0.3rem]">
          {dateFormatter(data.createdDate)}
        </span>
      </div>
    </div>
  );
}

export default Publication;
