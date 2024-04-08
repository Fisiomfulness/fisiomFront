import { CustomButton, CustomTextarea } from "@/features/ui";

function Question({ comments, setComments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    if (!question) return;

    const draft = [
      {
        id: crypto.randomUUID(),
        question: question,
        response: "",
      },
    ].concat(comments);
    setComments(draft);

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <CustomTextarea
        id="question"
        name="question"
        minRows={5}
        placeholder="Escribe tu pregunta..."
      />
      <CustomButton type="submit" className="max-w-52">
        Enviar
      </CustomButton>
    </form>
  );
}

export default Question;
