'use client';
import { LuUnplug } from 'react-icons/lu';

const ServicesError = () => {
  return (
    <div className="w-full flex flex-col m-auto gap-3 items-center justify-center">
      <LuUnplug size={34} className="text-danger" />
      <h2 className="m-0 text-center text-2xl text-secondary-300">
        Hubo un problema obteniendo los servicios del/la profesional, vuelva mas
        tarde...
      </h2>
    </div>
  );
};

export default ServicesError;
