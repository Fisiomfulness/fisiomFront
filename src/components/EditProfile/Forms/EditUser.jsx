import { Card, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { InputsFormRegister } from '@/components/Registro/InputsForms';
import { listInputsUser } from '@/components/Registro/listInputs';
import { formikZodValidator } from '@/utils/validations';
import { userSchema } from '@/utils/validations/userSchema';
import { updateUser } from '@/services/users';
import { removeObjFalsyValues, getFormdataFromObj } from '@/utils/helpers';
import toast from 'react-hot-toast';
import EditProfilePicture from '../EditProfilePicture';
import InterestList from '../InterestList';

const EditUser = ({
  userDetail,
  interests,
  setIsSuccessModalOpen,
  updateSessionUser,
}) => {
  const { name, email, gender, address, birthDate, phone, _id } = userDetail;

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
    password: '',
    confirmPass: '',
  };

  const handleSubmit = async (newValues) => {
    try {
      newValues = removeObjFalsyValues(newValues);
      const formData = getFormdataFromObj(newValues);
      const { data } = await updateUser(_id, formData);
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
        validate={formikZodValidator(userSchema.optional())}
      >
        <Form className="flex flex-col gap-2 overflow-hidden w-[80%] sm:w-[90%]">
          <EditProfilePicture previousImage={userDetail.image} />
          <InterestList interests={interests} />
          <InputsFormRegister
            isProfessional={false}
            submitButtonMessage={'Actualizar'}
            listInputsValue={listInputsUser}
            isUpdate={true}
          />
        </Form>
      </Formik>
    </Card>
  );
};

export default EditUser;
