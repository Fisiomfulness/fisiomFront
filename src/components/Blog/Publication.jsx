import { Image } from '@nextui-org/react';
import { truncateText, dateFormatter } from '@/utils/helpers';

function Publication({ data }) {
  return (
    <div className="size-fit grid grid-cols-[25%,auto] gap-3 sm:gap-5">
      <Image
        isBlurred
        src={data.image}
        alt="Blog picture"
        className="h-full min-h-[80px] object-cover rounded-md object-center lg:min-h-[60px]"
      />
      <div className="flex flex-col">
        <h2 className="text-[0.85rem] mb-0 capitalize">{data.title}</h2>
        <p className="text-[0.75rem] mt-[0.1rem] grow overflow-y-auto">
          {truncateText(data.text, 8)}
        </p>
        <span className="text-[0.65rem] mt-[0.3rem] justify-self-end">
          {dateFormatter(data.createdDate)}
        </span>
      </div>
    </div>
  );
}

export default Publication;
