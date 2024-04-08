"use client";
import GalleryDetail from "./GalleryDetail";
import { useState } from "react";
import { useDisclosure, Button } from "@nextui-org/react";
import ModalDetail from "./Modal";

const DetailClient = ({ prod }) => {
  const [selected, setSelected] = useState("0");
  const [cantidad, setCantidad] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className=" min-h-full flex justify-center xl:w-[70%]">
      <div className="flex flex-col mt-10 mb-10 pr-5 pl-5">
        <div className="flex flex-col w-full">
          <span className="font-black text-3xl">{prod.nombre}</span>
          <span className="flex items-center pl-2 text-[#ffffff] bg-[#369DCC] w-[157px] h-[29px] rounded-sm">
            ${prod.precio}
          </span>
        </div>
        <div className="flex pt-4">
          <div className="flex flex-col w-full max-w-[500px] gap-3 text-justify xl:w-[700px] 2xl:w-[900px]">
            <div className="w-full xl:flex">
              <div
                className=" w-full bg-cover bg-center h-[230px]  md:h-[320px] lg:h-[320px] xl:h-[420px] 2xl:h-[530px]"
                style={{ backgroundImage: `url(${prod?.gallery[selected]})` }}
              ></div>
              <div className="flex w-full xl:w-[100px]">
                <GalleryDetail
                  setSelected={setSelected}
                  selected={selected}
                  images={prod.gallery}
                />
              </div>
            </div>
            <div className="xl:w-[442px]">
              <p>{prod.description}</p>
              <div className="flex flex-col gap-4 w-full justify-between items-center pt-5 xl:flex-row ">
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      cantidad == 1 ? null : setCantidad((e) => e - 1)
                    }
                    className="w-[40px] h-[30px] bg-[#3DAADD]  text-[#ffffff] rounded-sm  hover:bg-secondary  duration-300"
                  >
                    -
                  </button>
                  <span className="flex w-[65px] h-[30xp] bg-[#3DAADD] text-[#ffffff] justify-center items-center rounded-sm ">
                    {cantidad}
                  </span>
                  <button
                    onClick={() =>
                      cantidad == prod.stock ? null : setCantidad((e) => e + 1)
                    }
                    className="w-[40px] h-[30px] bg-[#3DAADD] text-[#ffffff] rounded-sm  hover:bg-secondary  duration-300"
                  >
                    +
                  </button>
                </div>
                <Button
                  onPress={onOpen}
                  className="w-[195px] h-[48px] bg-[#3DAADD] text-[#ffffff] rounded-sm hover:bg-secondary  duration-300"
                >
                  Argegar carrito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalDetail isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default DetailClient;
