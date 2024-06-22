import { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { PiProhibitFill } from 'react-icons/pi';
import { formikZodValidator } from '@/utils/validations';
import { experienceSchema } from '@/utils/validations/experienceSchema';
import { addExperience, updateExperience } from '@/services/professionals';
import { months } from '@/utils/utils';
import toast from 'react-hot-toast';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => currentYear - i).map(
  (year) => ({
    label: year.toString(),
    value: year,
  })
);

const ExperienceForm = ({
  isOpen,
  isUpdate,
  onClose,
  setExperiences,
  professionalId,
  experienceId,
  initialValues,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ? Al utilizar zod.refine() para validar esto se pierde la interacción en tiempo real con la UI
  // * Por lo tanto se decidió agregarle este custom error al formik
  // * logrando una funcionalidad parecida a la experiencia de Linkedin
  const validateDates = (values) => {
    if (!values.startDateMonth || !values.startDateYear) {
      return { datesError: 'La fecha de inicio es requerida' };
    }

    if (!values.current && (!values.endDateMonth || !values.endDateYear)) {
      return { datesError: 'La fecha de finalización es requerida' };
    }

    if (!values.current && values.endDateYear && values.endDateMonth) {
      const startDate = new Date(values.startDateYear, values.startDateMonth - 1);
      const endDate = new Date(values.endDateYear, values.endDateMonth - 1);

      if (endDate < startDate) {
        return {
          datesError: 'La fecha de finalización no puede ser anterior a la de inicio',
        };
      }
    }

    return {};
  };

  const combinedValidator = (values) => {
    const zodErrors = formikZodValidator(experienceSchema)(values);
    const dateErrors = validateDates(values);
    return { ...zodErrors, ...dateErrors };
  };

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const { experiences } = isUpdate
      ? await updateExperience(professionalId, experienceId, values)
      : await addExperience(professionalId, values);
      setExperiences(experiences);
      onClose();
      toast.success(`Experiencia ${isUpdate ? 'actualizada' : 'añadida'} correctamente`);
    } catch (error) {
      toast.error(error.response?.data.message || 'Oops algo salio mal... vuelva a intentarlo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal placement="center" size="lg" isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validate={combinedValidator}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className="flex flex-col gap-3">
            <ModalContent>
              <ModalHeader>
                <h2>{`${isUpdate ? 'Editar' : 'Añadir'} experiencia`}</h2>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-1">
                  <label>Titulo</label>
                  <Input
                    name="title"
                    value={values.title}
                    radius="sm"
                    size="sm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={touched.title && errors.title ? true : false}
                    errorMessage={touched.title && errors.title}
                  />
                </div>

                <div className="space-y-1">
                  <label>Compañía</label>
                  <Input
                    name="company"
                    value={values.company}
                    radius="sm"
                    size="sm"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={touched.company && errors.company ? true : false}
                    errorMessage={touched.company && errors.company}
                  />
                </div>

                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    size="lg"
                    isSelected={values.current}
                    onValueChange={(isSelected) => {
                      if (isSelected) {
                        setFieldValue('endDateMonth', '');
                        setFieldValue('endDateYear', '');
                      }
                      setFieldValue('current', isSelected);
                    }}
                    classNames={{
                      label: 'text-small',
                    }}
                  >
                    Actualmente tengo este cargo
                  </Checkbox>
                </div>
                <div className="space-y-1">
                  <label>Fecha de inicio</label>
                  <div className="flex items-center gap-2">
                    <Select
                      items={months}
                      label="Mes"
                      name="startDateMonth"
                      selectedKeys={[values.startDateMonth]}
                      radius="sm"
                      size="sm"
                      onChange={handleChange}
                    >
                      {(month) => (
                        <SelectItem key={month.value}>{month.label}</SelectItem>
                      )}
                    </Select>
                    <Select
                      items={years}
                      label="Año"
                      name="startDateYear"
                      selectedKeys={[values.startDateYear]}
                      radius="sm"
                      size="sm"
                      onChange={handleChange}
                    >
                      {(year) => (
                        <SelectItem key={year.value}>{year.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label>Fecha de finalización</label>
                  <div className="flex items-center gap-2">
                    <Select
                      isDisabled={values.current}
                      items={months}
                      label="Mes"
                      name="endDateMonth"
                      selectedKeys={[values.endDateMonth]}
                      radius="sm"
                      size="sm"
                      onChange={handleChange}
                    >
                      {(month) => (
                        <SelectItem key={month.value}>{month.label}</SelectItem>
                      )}
                    </Select>
                    <Select
                      isDisabled={values.current}
                      items={years}
                      label="Año"
                      name="endDateYear"
                      selectedKeys={[values.endDateYear]}
                      radius="sm"
                      size="sm"
                      onChange={handleChange}
                    >
                      {(year) => (
                        <SelectItem key={year.value}>{year.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                </div>

                {errors.datesError && (
                  <div className="flex gap-1 items-center">
                    <PiProhibitFill size={18} className="text-danger-500" />
                    <span className="text-md text-danger-500">
                      {errors.datesError}
                    </span>
                  </div>
                )}

                <div className="space-y-1">
                  <label>Descripción</label>
                  <Textarea
                    name="description"
                    value={values.description}
                    radius="sm"
                    size="sm"
                    placeholder="Breve descripción de las habilidades que desempeñaste en el cargo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={
                      touched.description && errors.description ? true : false
                    }
                    errorMessage={touched.description && errors.description}
                    classNames={{
                      input: 'placeholder:text-gray-400',
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                  isDisabled={Object.keys(errors).length > 0 || isSubmitting}
                >
                  {isUpdate ? 'Guardar' : 'Añadir'}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ExperienceForm;
