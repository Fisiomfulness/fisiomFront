"use client";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { InputsFormRegister } from "./InputsForms";
import { axiosRegisterProfessionalForm } from "@/services/users";
import { getFormdataFromObj, removeObjFalsyValues } from "@/utils/helpers";
import { formikZodValidator } from "@/utils/validations";
import {
  professionalInitialValues,
  professionalSchema,
} from "@/utils/validations/professionalSchema";
import { listInputsUser } from "./listInputs";
import toast from "react-hot-toast";

export function RegisterProfessional({ conditionsAccepted }) {
  const router = useRouter();

  const handleSubmitRegister = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error("Por favor acepte los términos y condiciones");
      return;
    }

    values = removeObjFalsyValues(values);
    const formData = getFormdataFromObj(values);

    try {
      await axiosRegisterProfessionalForm(formData);
      toast.success("Te has registrado, está pendiente de aprobación.");
    } catch (error) {
      toast.error("Error al registrarse. Intente nuevamente.");
    }

    resetForm();
    router.push("/login");
  };

  return (
    <Formik
      onSubmit={handleSubmitRegister}
      initialValues={professionalInitialValues}
      validate={formikZodValidator(professionalSchema)}
    >
      <Form className="flex flex-col gap-2 w-full overflow-hidden min-[480px]:w-[90%]">
        <InputsFormRegister
          isProfessional={true}
          submitButtonMessage={"Crear perfil"}
          listInputsValue={listInputsUser}
        />
      </Form>
    </Formik>
  );
}
