import { Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { InputsFormRegister } from '@/components/Registro/InputsForms';
import { listInputsUser } from '@/components/Registro/listInputs';
import { formikZodValidator } from '@/utils/validations';
import { updateProfessionalSchema } from '@/utils/validations/professionalSchema';
import { updateProfessional, verifyCredentials } from '@/services/users';
import { removeObjFalsyValues, getFormdataFromObj } from '@/utils/helpers';
import { FaUserDoctor } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import EditProfilePicture from '../EditProfilePicture';

// ! TODO = USAR URL.createObjectURL(file); PARA RENDERIZAR LA IMAGEN AL ELEGIRLA
const EditProfessionalMain = ({
  handleNext,
  professional,
  setIsSuccessModalOpen,
  updateSessionUser,
}) => {
  const { name, email, gender, address, birthDate, phone, license, _id } = professional;

  const initialValues = {
    name,
    email,
    phone,
    gender,
    birthDate,
    streetName: address?.streetName || '',
    streetNumber: address?.streetNumber || '',
    floorAppartment: address?.floorAppartment || '',
    city: address?.city || '',
    state: address?.state || '',
    country: address?.country || '',
    license: license || '',
    password: '',
    confirmPass: '',
  };

  const handleSubmit = async (newValues) => {
    const verified = await verifyCredentials(email, newValues.password);
    if (!verified) return;

    try {
      newValues = removeObjFalsyValues(newValues);
      const formData = getFormdataFromObj(newValues);
      const { data } = await updateProfessional(_id, formData);
      await updateSessionUser(data.updated);
      setIsSuccessModalOpen(true);
    } catch (error) {
      toast.error(error.response?.data.message, { className: 'text-center' });
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validate={formikZodValidator(updateProfessionalSchema.optional())}
    >
      <Form className="flex flex-col gap-2 w-full">
        <EditProfilePicture previousImage={professional.image} />
        <Button
          onClick={handleNext}
          radius="sm"
          size="sm"
          startContent={<FaUserDoctor />}
          className="w-fit self-end text-sm bg-primary-100 text-secondary-400"
        >
          Acerca de mi
        </Button>
        <InputsFormRegister
          isProfessional={true}
          submitButtonMessage={'Actualizar'}
          listInputsValue={listInputsUser}
          isUpdate={true}
        />
      </Form>
    </Formik>
  );
};

export default EditProfessionalMain;
