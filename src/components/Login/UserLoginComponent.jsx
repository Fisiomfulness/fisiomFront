import { CustomInput } from '@/features/ui';
import { useUser } from '@/hooks/useUser';
import { Button } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { login } from '@/services/users';
import { formikZodValidator, zodStrRequired } from '@/utils/validations';
import Link from 'next/link';
import { z } from 'zod';
import { EyeFilledIcon } from '../CustomComponentForm/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../CustomComponentForm/EyeSlashFilledIcon';

const initialValues = {
  email: '',
  password: '',
};

const loginSchema = z.object({
  email: zodStrRequired.email('No es un email'),
  password: zodStrRequired,
});

const UserLoginComponent = () => {
  const { setUser, user } = useUser();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (values) => {
    const response = await login(values);
    setUser(response.data);
    router.push('/');
  };

  return (
    <Formik
      onSubmit={handleLogin}
      initialValues={initialValues}
      validate={formikZodValidator(loginSchema)}
    >
      {({ handleChange, isSubmitting, errors }) => (
        <Form className="flex flex-col gap-3">
          <CustomInput
            name="email"
            type="string"
            variant="flat"
            placeholder="Email"
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email}
            onChange={handleChange}
            size="lg"
            classNames={{
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
            }}
          />

          <CustomInput
            name="password"
            variant="flat"
            placeholder="Contraseña"
            isInvalid={errors.password ? true : false}
            errorMessage={errors.password}
            onChange={handleChange}
            size="lg"
            classNames={{
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
            }}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
          />

          <Button
            className="bg-primary-500 mt-2 text-white uppercase rounded-none font-semibold tracking-wider"
            type="submit"
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
          >
            Ingresar
          </Button>

          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <a className="text-sm hover:underline" href="/password_olvidada">
              Olvidaste <span className="font-bold">tu contraseña?</span>
            </a>
          </div>

          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <p className="text-sm">No tienes cuenta?</p>
            <Button
              className="bg-primary-500 text-white rounded-md font-semibold"
              as={Link}
              href="/registro"
            >
              Registrarse
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserLoginComponent;
