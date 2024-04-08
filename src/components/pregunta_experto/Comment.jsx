import { RiArrowUpCircleLine, RiQuestionLine } from "react-icons/ri";
import { MdChatBubbleOutline } from "react-icons/md";
import { CustomButton, CustomInput } from "@/features/ui";

function Comment({ comment, comments, setComments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const response = e.target.response.value;
    if (!response) return;

    const draft = comments.map((_comment) => {
      if (_comment.id === comment.id) {
        _comment.response = response;
      }
      return _comment;
    });
    setComments(draft);

    e.target.reset();
  };

  return (
    <div className="flex-row md:flex justify-between bg-primary-200 py-5 rounded-sm">
      <div className="w-full flex flex-col justify-between px-6 gap-4">
        <div className="md:pt-2 text-start">
          <p className="pb-2">
            <RiQuestionLine size={21} className="text-primary inline" />
            <span className="font-semibold mx-2">Pregunta:</span>
            {comment.question}
          </p>
          <p>
            <MdChatBubbleOutline size={19} className="text-primary inline" />
            <span className="font-semibold mx-2">Respuesta:</span>
            {comment.response}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <CustomInput
            placeholder="responda..."
            name="response"
            classNames={{
              input: "px-1",
              inputWrapper: "!bg-zinc-100",
            }}
            endContent={
              <button type="submit">
                <RiArrowUpCircleLine className="w-7 h-7 text-primary" />
              </button>
            }
          />
        </form>
      </div>

      <div
        className={
          "flex flex-col items-center justify-center px-6 " +
          "max-md:flex-row max-md:gap-4 max-md:pt-4"
        }
      >
        <div className="rounded-full w-14 h-14 bg-cover bg-[url('/imgPerfil.png')]"></div>
        <p className="mt-2 mb-2 font-bold whitespace-nowrap">Dr. Mario Gomez</p>
        <div className="flex flex-col gap-1">
          <CustomButton className="py-0 w-28 rounded-sm font-normal">
            Ver perfil
          </CustomButton>
          <CustomButton className="py-0 w-28 rounded-sm font-normal">
            CITA
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default Comment;
