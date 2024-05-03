import { useState } from 'react';

import {
  Button,
  Select,
  SelectItem,
  Input,
  DateInput,
} from '@nextui-org/react';
import { ErrorMessage, Field } from 'formik';
import { EyeSlashFilledIcon } from '../CustomComponentForm/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../CustomComponentForm/EyeFilledIcon';
import { CustomInput } from '@/features/ui';

export const genderList = [
  { label: 'Femenino', value: 'Femenino' },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Prefiero no responder', value: 'Prefiero no responder' },
];

export const InputsFormRegister = ({
  handleChange,
  handleBlur,
  touched,
  values,
  errors,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <CustomInput
        name="email"
        aria-label="Correo electrónico"
        type="email"
        variant="flat"
        placeholder="Correo electrónico"
        value={values.email}
        isInvalid={touched.email && errors.email ? true : false}
        errorMessage={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        size="lg"
        classNames={{
          inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
        }}
      />

      <div className="flex flex-col gap-1">
        <CustomInput
          name="dateOfBirth"
          label="Fecha de nacimiento"
          labelPlacement="inside"
          variant="flat"
          type="date"
          value={values.dateOfBirth}
          isInvalid={touched.dateOfBirth && errors.dateOfBirth ? true : false}
          errorMessage={touched.dateOfBirth && errors.dateOfBirth}
          onBlur={handleBlur}
          onChange={handleChange}
          size="lg"
          classNames={{
            inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
            label: '!text-gray-500',
          }}
        />
      </div>

      <Select
        name="gender"
        label="Genero"
        variant="flat"
        items={genderList}
        selectedKeys={[values.gender]}
        isInvalid={errors.gender ? true : false}
        errorMessage={errors.gender}
        onChange={handleChange}
        size="lg"
        radius="sm"
        classNames={{
          innerWrapper: 'text-gray-500',
          label: 'text-gray-500',
          errorMessage: 'text-sm',
        }}
      >
        {(gender) => <SelectItem key={gender.value}>{gender.label}</SelectItem>}
      </Select>

      <CustomInput
        name="password"
        aria-label="Contraseña"
        autocomplete="new-password"
        variant="flat"
        placeholder="Contraseña"
        size="lg"
        value={values.password}
        isInvalid={touched.password && errors.password ? true : false}
        errorMessage={touched.password && errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
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
        classNames={{
          inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
        }}
      />

      <CustomInput
        name="repitPass"
        aria-label="Repita la contraseña"
        autocomplete="repeat-password"
        variant="flat"
        placeholder="Repita la contraseña"
        size="lg"
        value={values.repitPass}
        isInvalid={touched.repitPass && errors.repitPass ? true : false}
        errorMessage={touched.repitPass && errors.repitPass}
        onBlur={handleBlur}
        onChange={handleChange}
        type="password"
        classNames={{
          inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
        }}
      />
    </>
  );
};
