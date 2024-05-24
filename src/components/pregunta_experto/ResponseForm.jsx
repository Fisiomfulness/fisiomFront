import { RiArrowUpCircleLine } from 'react-icons/ri';
import { CustomInput } from '@/features/ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { updateQuestionAtom } from './store/questions';
import { respondQuestion } from '@/services/questions';
import { z } from 'zod';
import roles from '@/utils/roles';
import toast from 'react-hot-toast';

const responseSchema = z
  .string()
  .trim()
  .min(5, 'Al menos 5 caracteres')
  .max(800, 'No mas de 800 caracteres');

const validate = (value) => {
  const result = responseSchema.safeParse(value);
  const errorMessage = result.error?.issues[0].message;
  return !result.success ? errorMessage : '';
};

const ResponseForm = ({ questionId }) => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const updateQuestion = useSetAtom(updateQuestionAtom);
  const isProfessional = status !== 'loading' && session?.user.role === roles.PROFESSIONAL;

  if (!isProfessional) return null;

  const handleChange = (e) => {
    setResponse(e.target.value);
    setError(validate(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitError = validate(response);
    if (submitError) return setError(submitError);
    try {
      const finalResponse = { text: response, professionalId: session.user.id };
      const { updatedQuestion } = await respondQuestion(questionId, finalResponse);
      updateQuestion(updatedQuestion);
      toast.success('Respuesta enviada correctamente!');
    } catch (error) {
      toast.error('Oops... vuelva a intentar mas tarde');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        placeholder="Responda..."
        type="text"
        name="response"
        value={response}
        onChange={handleChange}
        isInvalid={error ? true : false}
        errorMessage={error}
        endContent={
          <button type="submit">
            <RiArrowUpCircleLine className="size-7 text-[#3DAADD]" />
          </button>
        }
        classNames={{
          input: 'px-1',
          inputWrapper: '!bg-white border-1 border-[#BABABA] rounded-none',
        }}
      />
    </form>
  );
};

export default ResponseForm;
