import { twMerge } from "tailwind-merge";

const GalleryDetail = ({ setSelected, images, selected }) => {
  return (
    <div className="flex w-full h-full md:flex-col max-w-0">
      {images?.map((img, index) => (
        <div
          onClick={() => setSelected(index)}
          className={twMerge(
            "flex items-center bg-cover cursor-pointer",
            "w-[50px] h-[50px]",
            "border-[2px] rounded-sm",
            "transition-[.3s] transform hover:scale-110",
            Number(selected) === index ? "border-primary" : "",
          )}
          style={{ backgroundImage: img ? `url(${img})` : "" }}
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default GalleryDetail;
