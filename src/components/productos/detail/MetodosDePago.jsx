"use client";
import Image from "next/image";

const MetodosDePago = () => {
  return (
    <div className="flex flex-col">
      <span className="">Métodos de pago</span>
      <div className="flex gap-2">
        <Image
          className="bg-gray-200 p-1 rounded-sm"
          width={30}
          height={30}
          src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg"
          alt="logo"
        />
        <Image
          className="bg-gray-200 p-1 rounded-sm"
          width={30}
          height={30}
          src="https://http2.mlstatic.com/storage/logos-api-admin/ce454480-445f-11eb-bf78-3b1ee7bf744c-m.svg"
          alt="logo"
        />
        <Image
          className="bg-gray-200 p-1 rounded-sm"
          width={30}
          height={30}
          src="https://http2.mlstatic.com/storage/logos-api-admin/992bc350-f3be-11eb-826e-6db365b9e0dd-m.svg"
          alt="logo"
        />
        <Image
          className="bg-gray-200 p-1 rounded-sm"
          width={30}
          height={30}
          src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default MetodosDePago;
