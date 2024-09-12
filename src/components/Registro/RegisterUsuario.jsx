"use client";
import { useRouter } from "next/navigation";
import { userInitialValues, userSchema } from "@/utils/validations/userSchema";
import { axiosRegisterUserForm } from "@/services/users";
import { formikZodValidator } from "@/utils/validations";
import { Form, Formik } from "formik";
import { InputsFormRegister } from "./InputsForms";
import { listInputsUser } from "./listInputs";
import { removeObjFalsyValues } from "@/utils/helpers";
import toast from "react-hot-toast";

export const RegisterUser = ({ conditionsAccepted }) => {
  const router = useRouter();

  const handleSubmit = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error("Por favor acepte los términos y condiciones");
      return;
    }
    values = removeObjFalsyValues(values);
    await axiosRegisterUserForm(values);
    resetForm();
    router.push("/login");
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={userInitialValues}
      validate={formikZodValidator(userSchema)}
    >
      <Form className="flex flex-col gap-2 w-full overflow-hidden min-[480px]:w-[90%]">
        <InputsFormRegister
          isProfessional={false}
          submitButtonMessage={"Registrarse"}
          listInputsValue={listInputsUser}
        />
      </Form>
    </Formik>
  );
};
