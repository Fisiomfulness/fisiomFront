"use client";

const GalleryDetail = ({ setSelected, images, selected }) => {
  return (
    <div className="pt-3 flex  w-full h-full items-center gap-3 xl:flex-col xl:pt-0">
      {images?.map((img, index) => (
        <div
          onClick={() => {
            setSelected(index);
          }}
          className={`flex items-center w-[30px] h-[30px] bg-cover border-[2px] rounded-sm cursor-pointer transition-[.3s] transform hover:scale-110 xl:w-[50px] xl:h-[50px] ${
            selected == index ? "border-primary" : ""
          }`}
          style={{ backgroundImage: `url(${img})` }}
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default GalleryDetail;
