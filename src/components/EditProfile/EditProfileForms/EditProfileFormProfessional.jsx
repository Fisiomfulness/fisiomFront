"use client";

import { Card } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";

/* const validationSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8).equalTo(z.ref("password")),
}); */

export const EditProfileFormProfessional = ({ userDetail }) => {
  const [userData, setUserData] = useState({
    name: "Juan Perez",
    email: "juan.perez@email.com",
    password: "password123",
  });
  const [editingFields, setEditingFields] = useState({
    name: false,
    email: false,
    password: false,
  });

  const onSubmit = (values) => {
    console.log(userData);
  };
  return (
    <Card className="grid gap-6 md:gap-x-4 items-center justify-items-center p-6 md:p-10 md:py-20 rounded-sm w-full max-w-[800px]">
      <Formik onSubmit={onSubmit} initialValues={userDetail}>
        {({
          handleChange,
          handleBlur,
          touched,
          values,
          errors,
          isSubmitting,
        }) => (
          <Form>
            {Object.entries(userDetail).map(([fieldName, fieldValue]) => (
              <div key={fieldName} className="flex items-center mb-4">
                <label className="w-24 mr-4">{fieldName}:</label>
                <input
                  name={fieldName}
                  defaultValue={userDetail.fieldName}
                  onChange={handleChange}
                  disabled={!editingFields[fieldName]}
                  className={`border rounded-md p-2 ${
                    errors[fieldName] && "border-red-500"
                  }`}
                />
                {editingFields[fieldName] ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFields({
                          ...editingFields,
                          [fieldName]: false,
                        });
                        setUserData({
                          ...userData,
                          [fieldName]: fieldValue,
                        });
                      }}
                      className="ml-4 text-gray-500 hover:text-gray-700"
                    >
                      <FiX />
                    </button>
                    <button
                      type="button"
                      className="ml-2 text-green-500 hover:text-green-700"
                      onClick={() => {
                        setUserData({
                          ...userData,
                          [fieldName]: values[fieldName],
                        });
                        setEditingFields({
                          name: false,
                          email: false,
                          password: false,
                        });
                      }}
                    >
                      <FiCheck />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setEditingFields({ ...editingFields, [fieldName]: true })
                    }
                    className="ml-4 text-gray-500 hover:text-gray-700"
                  >
                    <FiEdit />
                  </button>
                )}
              </div>
            ))}
            <button type="submit"> enviar </button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
