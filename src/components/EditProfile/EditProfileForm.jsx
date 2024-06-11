import { Card } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { InputsFormRegister } from '@/components/Registro/InputsForms';
import { listInputsUser } from '@/components/Registro/listInputs';
import { formikZodValidator } from '@/utils/validations';
import { updateProfessional, updateUser } from '@/services/users';
import { removeObjFalsyValues, getFormdataFromObj } from '@/utils/helpers';
import toast from 'react-hot-toast';
import EditProfilePicture from './EditProfilePicture';
import InterestList from './InterestList';

const EditProfileForm = ({
  userDetail,
  interests,
  zodSchema,
  isProfessional,
  setIsSuccessModalOpen,
  updateSessionUser,
}) => {
  const { name, email, gender, address, birthDate, phone, license, _id, role } = userDetail;

  const initialValues = {
    name,
    email,
    phone,
    gender,
    birthDate,
    interests: Array.from(userDetail?.interests || [], (i) => i._id),
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
    try {
      newValues = removeObjFalsyValues(newValues);
      const formData = getFormdataFromObj(newValues);
      const { data } = isProfessional
        ? await updateProfessional(_id, formData)
        : await updateUser(_id, formData);
      await updateSessionUser(data.updated);
      setIsSuccessModalOpen(true);
    } catch (error) {
      toast.error(error.response?.data.message, { className: 'text-center' });
    }
  };

  return (
    <Card className="grid items-center justify-items-center rounded-sm w-full py-8 max-w-[800px] md:py-16">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={formikZodValidator(zodSchema.optional())}
      >
        <Form className="flex flex-col gap-2 overflow-hidden w-[80%] sm:w-[90%]">
          <EditProfilePicture previousImage={userDetail.image} />
          {!isProfessional && <InterestList interests={interests} />}
          <InputsFormRegister
            isProfessional={isProfessional}
            submitButtonMessage={'Actualizar'}
            listInputsValue={listInputsUser}
            isUpdate={true}
          />
        </Form>
      </Formik>
    </Card>
  );
};

export default EditProfileForm;
