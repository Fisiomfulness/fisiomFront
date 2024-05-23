import { MdChatBubbleOutline } from 'react-icons/md';
import { RiQuestionLine } from 'react-icons/ri';
import ResponseForm from './ResponseForm';
import ProfessionalInfo from './ProfessionalInfo';

const QuestionContent = ({ data }) => {
  const { _id, text, answer, isAnswered } = data;
  const professional = answer?.professional || null;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 items-center">
      <div className="w-full space-y-2 text-start">
        <p>
          <RiQuestionLine size={21} className="text-[#3DAADD] inline" />
          <span className="font-semibold mx-2 text-secondary-500">
            Pregunta:
          </span>
          {text}
        </p>
        {isAnswered ? (
          <p>
            <MdChatBubbleOutline size={19} className="text-[#3DAADD] inline" />
            <span className="font-semibold mx-2 text-secondary-500">
              Respuesta:
            </span>
            {answer?.text}
          </p>
        ) : (
          <ResponseForm questionId={_id} />
        )}
      </div>
      {isAnswered && <ProfessionalInfo professional={professional} />}
    </div>
  );
};

export default QuestionContent;
