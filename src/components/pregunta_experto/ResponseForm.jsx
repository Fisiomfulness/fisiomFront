import { RiArrowUpCircleLine } from 'react-icons/ri';
import { CustomInput } from '@/features/ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { z } from 'zod';
import roles from '@/utils/roles';
import toast from 'react-hot-toast';
import { respondQuestion } from '@/services/questions';

const responseSchema = z
  .string()
  .min(10, 'Al menos 5 caracteres')
  .max(500, 'No mas de 500 caracteres');

const ResponseForm = ({ questionId }) => {
  const { data: session, status } = useSession();
  const isProfessional = session?.user.role === roles.PROFESSIONAL;
  if (status !== 'loading' && !isProfessional) return null;

  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setResponse(e.target.value);
    const result = responseSchema.safeParse(e.target.value);
    const errorMessage = result.error?.issues[0].message;
    setError(!result.success ? errorMessage : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalResponse = { text: response, professionalId: session.user.id };
      const { updatedQuestion } = await respondQuestion(questionId, finalResponse);
      toast.success('Respuesta enviada correctamente!');
    } catch (error) {
      toast.error('Oops... vuelva a intentar mas tarde');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        placeholder="responda..."
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
