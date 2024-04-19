import { Image } from '@nextui-org/react';
import { dateFormatter } from '@/utils/helpers';

function Publication({ data }) {
  return (
    <div className="w-full grid grid-cols-[20%,auto] gap-3 sm:gap-5 min-[830px]:grid-cols-[max-content,auto] xl:grid-cols-[20%,auto] xl:gap-[0.625rem]">
      <Image
        src={data.image}
        alt="Blog picture"
        className="h-[90px] object-cover rounded-md object-center xl:h-[70px] xl:rounded-none"
      />
      <div className="flex flex-col w-full overflow-hidden">
        <h2 className="truncate text-[0.85rem] mb-0 capitalize">
          {data.title}
        </h2>
        <p className="overflow-hidden line-clamp-3 text-[0.75rem] mt-[0.1rem] xl:line-clamp-2">
          {data.text}
        </p>
        <span className="text-[0.65rem] tracking-wide mt-auto justify-self-end">
          {dateFormatter(data.createdDate)}
        </span>
      </div>
    </div>
  );
}

export default Publication;
