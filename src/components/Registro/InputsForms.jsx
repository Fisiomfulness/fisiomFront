import { useState } from 'react';
import { useFormikContext } from 'formik';
import { CustomInput } from '@/features/ui';
import { Divider, Select, SelectItem, input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { EyeFilledIcon } from '../CustomComponentForm/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../CustomComponentForm/EyeSlashFilledIcon';
import FileUpload from './FileUpload';

const genderList = [
  { label: 'Femenino', value: 'Femenino' },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Prefiero no responder', value: 'Prefiero no responder' },
];

export const InputsFormRegister = ({
  isProfessional,
  isUpdate,
  submitButtonMessage,
  listInputsValue,
}) => {
  const {
    touched,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-2">
        {listInputsValue(errors, touched).map((inputValue, index) => {
          return (
            <div key={index}>
              <div className="flex gap-2 flex-col sm:flex-row w-full justify-between">
                <CustomInput
                  {...inputValue}
                  value={values[inputValue.name]}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  size="lg"
                  classNames={{
                    inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
                  }}
                  isClearable={isUpdate}
                  onClear={
                    isUpdate
                      ? () => setFieldValue(inputValue.name, '')
                      : undefined
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      {isProfessional ? (
        <CustomInput
          name="license"
          aria-label="Numero de colegiado"
          type="string"
          variant="flat"
          placeholder="Numero de colegiado"
          value={values.license}
          isInvalid={touched?.license && errors.license ? true : false}
          errorMessage={touched?.license && errors.license}
          onBlur={handleBlur}
          onChange={handleChange}
          size="lg"
          classNames={{
            inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
          }}
        />
      ) : null}

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

      <div className="flex flex-col sm:flex-row gap-2 w-full justify-between">
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
          name="confirmPass"
          aria-label="Repita la contraseña"
          autocomplete="repeat-password"
          variant="flat"
          placeholder="Repita la contraseña"
          size="lg"
          value={values.confirmPass}
          isInvalid={touched.confirmPass && errors.confirmPass ? true : false}
          errorMessage={touched.confirmPass && errors.confirmPass}
          onBlur={handleBlur}
          onChange={handleChange}
          type="password"
          classNames={{
            inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
          }}
        />
      </div>

      {isProfessional && !isUpdate ? (
        <>
          <Divider />
          <FileUpload name="curriculum" />
        </>
      ) : null}

      <Button
        className="bg-primary-500 mt-2 text-white uppercase font-semibold rounded-sm"
        type="submit"
        isDisabled={Object.keys(errors).length > 0 || isSubmitting}
        isLoading={isSubmitting}
      >
        {submitButtonMessage}
      </Button>
    </>
  );
};
