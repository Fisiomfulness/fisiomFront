import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { ratingProfessionals } from "../data/data";
import Rating from '@mui/material/Rating';

function CardRating({id, total, totalComment, name, average }) {
  const [active, setActive] = useState(false);

  const handlerActive = () => {
    setActive(!active);
  };

  return (
    <div key={id} className="relative mb-6 w-full h-full flex items-center justify-center">
      <div
        className={`relative w-2/3 ${
          active
            ? "h-full bg-white shadow-lg border-[#9fa4a8] border-[1px] transition duration-300 ease-in-out"
            : " h-24 bg-primary-100"
        } rounded-xl  overflow-hidden $`}
      >
        <div className=" flex justify-between items-center flex-row p-5">
          <div className=" flex flex-col">
          <h1 className=" font-semibold text-xl mb-0 ml-0 "> {name}</h1>
          <Rating name="half-rating-read" className="mt-0 ml-0" defaultValue={average} precision={0.5} readOnly />
          </div>

          {!active ? (
            <button
              className=" w-8 h-8 rounded-full flex items-center justify-center"
              onClick={handlerActive}
            >
              <FaArrowDown />
            </button>
          ) : (
            <button
              className=" w-8 h-8 rounded-full flex items-center justify-center bg-[#9fa4a8]"
              onClick={handlerActive}
            >
              <MdCancel/>
            </button>
          )}
        </div>
        {!active ? (
          <p></p>
        ) : (
          <div className=" flex flex-col p-4">
          {totalComment.map((comment, i)=>(
            <p key={i} className="z-50 flex w-full h-full px-3 rounded-lg font-light py-3 mb-3 bg-slate-100">{comment}</p>
))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardRating