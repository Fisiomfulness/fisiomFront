import { useState } from 'react';
import { Button, Tooltip, ScrollShadow } from '@nextui-org/react';
import { IoAddOutline } from 'react-icons/io5';
import ExperienceCard from '../ExperienceCard';
import ExperienceForm from './ExperienceForm';
import DeleteExperience from './DeleteExperience';

const initialValues = {
  title: '',
  company: '',
  startDateMonth: '',
  startDateYear: '',
  endDateMonth: '',
  endDateYear: '',
  description: '',
  current: false,
};

const ProfessionalExperience = ({ experiences = [], professionalId, setProfessional }) => {
  const [experienceId, setExperienceId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [experienceModal, setExperienceModal] = useState({
    isOpen: false,
    isUpdate: false,
    initialValues,
  });

  const handleAddExperience = () => {
    setExperienceModal({
      isOpen: true,
      isUpdate: false,
      initialValues,
    });
  };

  const handleEditExperience = (experience) => {
    setExperienceId(experience._id);
    setExperienceModal({
      isOpen: true,
      isUpdate: true,
      initialValues: {
        // ? To not include _id and timestamps and formatting endDate nulls to empty string (select nextUI warning)
        // ? NextUI select works only with strings
        title: experience.title,
        company: experience.company,
        startDateMonth: experience.startDateMonth?.toString(),
        startDateYear: experience.startDateYear?.toString(),
        endDateMonth: experience.endDateMonth?.toString() || '',
        endDateYear: experience.endDateYear?.toString() || '',
        description: experience.description,
        current: experience.current,
      },
    });
  };

  const handleClose = () => {
    setExperienceId(null);
    setExperienceModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <section className="w-full">
      <ExperienceForm
        isOpen={experienceModal.isOpen}
        isUpdate={experienceModal.isUpdate}
        onClose={handleClose}
        professionalId={professionalId}
        experienceId={experienceId}
        setProfessional={setProfessional}
        initialValues={experienceModal.initialValues}
      />
      <DeleteExperience
        isOpen={deleteModalOpen}
        onClose={() => {
          setExperienceId(null);
          setDeleteModalOpen(false);
        }}
        professionalId={professionalId}
        experienceId={experienceId}
        setProfessional={setProfessional}
      />
      <div className="flex items-center justify-between">
        <h3>Experiencia</h3>
        <Tooltip content="Añadir" size="sm" color="secondary" closeDelay={200}>
          <Button
            isIconOnly
            color="primary"
            size="sm"
            radius="full"
            onPress={handleAddExperience}
            className="mb-2"
          >
            <IoAddOutline size={24} />
          </Button>
        </Tooltip>
      </div>
      <ScrollShadow
        size={15}
        hideScrollBar
        className="flex flex-col gap-2 w-full max-h-[380px]"
      >
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <ExperienceCard
              key={exp._id}
              experience={exp}
              onEdit={() => handleEditExperience(exp)}
              onDelete={() => {
                setExperienceId(exp._id);
                setDeleteModalOpen(true);
              }}
            />
          ))
        ) : (
          <p>Aun no añadiste ninguna experiencia</p>
        )}
      </ScrollShadow>
    </section>
  );
};

export default ProfessionalExperience;
