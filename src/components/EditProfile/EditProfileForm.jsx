import { Card } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { InputsFormRegister } from '@/components/Registro/InputsForms';
import { listInputsUser } from '@/components/Registro/listInputs';
import { formikZodValidator } from '@/utils/validations';
import { updateUser } from '@/services/users';
import { removeObjFalsyValues } from '@/utils/helpers';
import toast from 'react-hot-toast';
import EditProfilePicture from './EditProfilePicture';

const EditProfileForm = ({
  userDetail,
  zodSchema,
  isProfessional,
  setIsSuccessModalOpen,
  updateSessionUser,
}) => {
  const { name, email, gender, address, birthDate, phone, license, _id } = userDetail;

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
    try {
      newValues = removeObjFalsyValues(newValues);
      const formData = new FormData();
      for (const name in newValues) {
        formData.append(name, newValues[name]);
      }
      const { data } = await updateUser(_id, formData);
      await updateSessionUser(data.updatedUser);
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
        {({
          handleChange,
          handleBlur,
          touched,
          values,
          errors,
          isSubmitting,
          setFieldValue,
          setValues,
        }) => (
          <Form className="flex flex-col gap-2 overflow-hidden w-[80%] sm:w-[90%]">
            <EditProfilePicture previousImage={userDetail.image} />
            <InputsFormRegister
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              values={values}
              errors={errors}
              isProfessional={isProfessional}
              submitButtonMessage={'Actualizar'}
              listInputsValue={listInputsUser}
              setFieldValue={setFieldValue}
              isUpdate={true}
            />
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default EditProfileForm;
