import { MdChatBubbleOutline } from 'react-icons/md';
import { RiQuestionLine } from 'react-icons/ri';
import ResponseForm from './ResponseForm';
import ProfessionalInfo from './ProfessionalInfo';

const QuestionContent = ({ data, user }) => {
  const { _id, text, answer, isAnswered } = data;
  const professional = answer?.professional || null;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 items-center">
      <div className="w-full space-y-2 text-start overflow-hidden">
        <div className="break-all">
          <RiQuestionLine size={21} className="text-[#3DAADD] inline" />
          <p className="inline">
            <b className="font-semibold mx-2 text-secondary-500">Pregunta:</b>
            {text}
          </p>
        </div>
        {isAnswered ? (
          <div className="break-all">
            <MdChatBubbleOutline size={19} className="text-[#3DAADD] inline" />
            <p className="inline">
              <b className="font-semibold text-secondary-500 mx-2">
                Respuesta:
              </b>
              {answer?.text}
            </p>
          </div>
        ) : (
          <ResponseForm questionId={_id} user={user} />
        )}
      </div>
      {isAnswered && <ProfessionalInfo professional={professional} />}
    </div>
  );
};

export default QuestionContent;
