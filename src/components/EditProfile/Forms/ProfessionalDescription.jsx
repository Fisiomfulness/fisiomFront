import { useState } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import { updateProfessional } from '@/services/users';
import { z } from 'zod';
import toast from 'react-hot-toast';

const descriptionSchema = z
  .string()
  .trim()
  .max(500, 'No mas de 500 caracteres')
  .optional()
  .or(z.literal(''));

const ProfessionalDescription = ({ description, professionalId, setProfessional }) => {
  const [newDescription, setNewDecription] = useState(description);
  const [wasOverwritten, setWasOverwritten] = useState(false);
  const [error, setError] = useState('');

  const validateDescription = (value) => {
    try {
      descriptionSchema.parse(value);
      setError('');
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    }
  };

  const handleValueChange = (value) => {
    setNewDecription(value);
    validateDescription(value);
    setWasOverwritten(value.trim() !== description.trim());
  };

  const handleSubmit = async () => {
    validateDescription(newDescription);
    if (error) return;

    try {
      await updateProfessional(professionalId, { description: newDescription });
      setProfessional((prev) => ({ ...prev, description: newDescription }));
      setWasOverwritten(false);
      toast.success('Descripción actualizada');
    } catch (error) {
      toast.error('Error actualizando descripción... intente mas tarde');
    }
  };

  return (
    <div>
      <h3>
        Descripción{' '}
        <span className="text-xs text-gray-700 font-normal">
          ( click para editar )
        </span>
      </h3>
      <Textarea
        spellCheck
        variant="bordered"
        color="primary"
        radius="none"
        size="lg"
        placeholder="Breve descripción de tu perfil profesional"
        minRows={4}
        maxRows={6}
        value={newDescription}
        onValueChange={handleValueChange}
        isInvalid={error ? true : false}
        errorMessage={error}
        classNames={{
          inputWrapper: 'data-[hover=true]:border-default-200',
          innerWrapper: 'gap-2',
          input: `${
            wasOverwritten ? 'text-black' : 'text-gray-600'
          } placeholder:text-gray-500`,
          errorMessage: 'text-sm',
        }}
      />
      {wasOverwritten && !error && (
        <Button
          color="primary"
          size="sm"
          radius="none"
          className="block mt-2 ml-auto font-semibold tracking-wide"
          onPress={handleSubmit}
        >
          Guardar
        </Button>
      )}
    </div>
  );
};

export default ProfessionalDescription;
