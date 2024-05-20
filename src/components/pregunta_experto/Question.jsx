import { RiQuestionLine } from 'react-icons/ri';
import { MdChatBubbleOutline } from 'react-icons/md';
import { Image } from '@nextui-org/react';
import { CustomButton } from '@/features/ui';
import ResponseForm from './ResponseForm';

function Question({ data }) {
  const isAnswered = data.isAnswered;
  const professional = data.answer?.professional || null;

  return (
    <div className="flex-row md:flex justify-between items-center bg-secondary-50 py-5 rounded-sm hover:bg-opacity-85">
      <div className="w-full flex flex-col justify-between px-6 gap-4">
        <div className="md:pt-2 text-start">
          <p className="pb-2">
            <RiQuestionLine size={21} className="text-[#3DAADD] inline" />
            <span className="font-semibold mx-2 text-secondary-500">
              Pregunta:
            </span>
            {data.text}
          </p>
          {isAnswered && (
            <p>
              <MdChatBubbleOutline
                size={19}
                className="text-[#3DAADD] inline"
              />
              <span className="font-semibold mx-2 text-secondary-500">
                Respuesta:
              </span>
              {data.answer?.text}
            </p>
          )}
        </div>
        {!isAnswered && <ResponseForm questionId={data._id} />}
      </div>

      {isAnswered && (
        <div
          className={
            'flex flex-col items-center justify-center px-6 ' +
            'max-md:flex-row max-md:gap-4 max-md:pt-4'
          }
        >
          <Image
            src={professional.image}
            className="rounded-full size-14 bg-cover"
          />
          <p className="mt-2 mb-2 font-bold whitespace-nowrap capitalize truncate">
            {'Dr. ' + professional.name}
          </p>
          <div className="flex flex-col gap-1">
            <CustomButton className="py-0 w-28 rounded-sm font-normal">
              Ver perfil
            </CustomButton>
            <CustomButton className="py-0 w-28 rounded-sm font-normal">
              CITA
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
