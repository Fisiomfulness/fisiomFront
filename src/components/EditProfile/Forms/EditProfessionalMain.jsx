import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { Formik, Form } from "formik";
import { InputsFormRegister } from "@/components/Registro/InputsForms";
import { listInputsUser } from "@/components/Registro/listInputs";
import { formikZodValidator } from "@/utils/validations";
import { updateProfessionalSchema } from "@/utils/validations/professionalSchema";
import { updateProfessional, verifyCredentials } from "@/services/users";
import { getFormdataFromObj } from "@/utils/helpers";
import { FaUserDoctor } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import toast from "react-hot-toast";
import EditProfilePicture from "../EditProfilePicture";

const EditProfessionalMain = ({
  handleNext,
  professional,
  setIsSuccessModalOpen,
  updateSessionUser,
}) => {
  const [displayedImage, setDisplayedImage] = useState(professional.image);
  const {
    name,
    email,
    phone,
    gender,
    birthDate,
    consultationPrice,
    address,
    license,
    _id,
  } = professional;

  const initialValues = {
    name,
    email,
    phone,
    gender,
    birthDate,
    consultationPrice: consultationPrice || "",
    streetName: address?.streetName || "",
    streetNumber: address?.streetNumber || "",
    floorAppartment: address?.floorAppartment || "",
    city: address?.city || "",
    state: address?.state || "",
    country: address?.country || "",
    license: license || "",
    password: "",
  };

  const handleSubmit = async (newValues) => {
    const verified = await verifyCredentials(email, newValues.password);
    if (!verified) return;

    try {
      const formData = getFormdataFromObj(newValues);
      const { data } = await updateProfessional(_id, formData);
      await updateSessionUser(data.updated);
      setIsSuccessModalOpen(true);
    } catch (error) {
      toast.error(error.response?.data.message, { className: "text-center" });
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validate={formikZodValidator(updateProfessionalSchema.optional())}
    >
      {({ resetForm }) => (
        <Form className="flex flex-col gap-2 w-full">
          <EditProfilePicture
            displayedImage={displayedImage}
            setDisplayedImage={setDisplayedImage}
          />
          <div className="flex items-center justify-between">
            <Tooltip
              content="Restaurar valores"
              color="secondary"
              placement="top"
            >
              <Button
                isIconOnly
                radius="full"
                onPress={() => {
                  resetForm();
                  setDisplayedImage(professional.image);
                }}
                className="w-fit self-end text-sm bg-primary-100 text-secondary-400"
              >
                <TfiReload size={18} />
              </Button>
            </Tooltip>
            <Button
              onClick={handleNext}
              radius="sm"
              size="sm"
              startContent={<FaUserDoctor />}
              className="w-fit self-end text-sm bg-primary-100 text-secondary-400"
            >
              Acerca de mi
            </Button>
          </div>
          <InputsFormRegister
            isProfessional={true}
            submitButtonMessage={"Actualizar"}
            listInputsValue={listInputsUser}
            isUpdate={true}
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditProfessionalMain;
