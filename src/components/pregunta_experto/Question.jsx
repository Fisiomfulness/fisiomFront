import { RiQuestionLine } from 'react-icons/ri';
import { MdChatBubbleOutline } from 'react-icons/md';
import ResponseForm from './ResponseForm';
import ProfessionalInfo from './ProfessionalInfo';

function Question({ data }) {
  const { _id, text, answer, isAnswered } = data;
  const professional = answer?.professional || null;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 items-center bg-secondary-50 py-5 px-6 rounded-sm hover:bg-opacity-85">
      <div className="w-full flex flex-col justify-between gap-4">
        <div className="md:pt-2 text-start">
          <p className="pb-2">
            <RiQuestionLine size={21} className="text-[#3DAADD] inline" />
            <span className="font-semibold mx-2 text-secondary-500">
              Pregunta:
            </span>
            {text}
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
              {answer?.text}
            </p>
          )}
        </div>
        {!isAnswered && <ResponseForm questionId={_id} />}
      </div>
      {isAnswered && <ProfessionalInfo professional={professional} />}
    </div>
  );
}

export default Question;
