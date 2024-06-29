import { Fragment } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { TiArrowBack } from 'react-icons/ti';
import ProfessionalExperience from './ProfessionalExperience';
import ProfessionalDescription from './ProfessionalDescription';

const EditProfessionalSecondary = ({
  handleBack,
  professional,
  setProfessional,
}) => {
  return (
    <div className="w-full flex flex-col gap-3 overflow-hidden">
      <div className="w-full flex items-center justify-between">
        <Tooltip content="Regresar" size="sm" color="secondary" closeDelay={200}>
          <Button
            isIconOnly
            onClick={handleBack}
            className="bg-transparent self-start"
          >
            <TiArrowBack size={48} className="text-primary-600" />
          </Button>
        </Tooltip>
        <h2 className="flex-grow text-3xl text-center mb-0">Acerca de mi</h2>
      </div>
      <ProfessionalExperience
        experiences={professional.experience}
        professionalId={professional._id}
        setProfessional={setProfessional}
      />
      <ProfessionalDescription
        description={professional.description}
        professionalId={professional._id}
        setProfessional={setProfessional}
      />
    </div>
  );
};

export default EditProfessionalSecondary;
