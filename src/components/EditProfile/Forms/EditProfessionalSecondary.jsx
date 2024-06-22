import { Fragment } from 'react';
import { Button } from '@nextui-org/react';
import { TiArrowBack } from 'react-icons/ti';
import ProfessionalExperience from './ProfessionalExperience';
import ProfessionalDescription from './ProfessionalDescription';

const EditProfessionalSecondary = ({ userDetail, handleBack }) => {
  return (
    <div className="w-full flex flex-col gap-3 overflow-hidden">
      <div className="w-full flex items-center justify-between">
        <Button
          isIconOnly
          onClick={handleBack}
          className="bg-transparent self-start"
        >
          <TiArrowBack size={48} className="text-primary-600" />
        </Button>
        <h2 className="flex-grow text-3xl text-center mb-0">Acerca de mi</h2>
      </div>
      <ProfessionalExperience
        professionalId={userDetail._id}
        iniExperiences={userDetail.experience}
      />
      <ProfessionalDescription professionalId={userDetail._id} />
    </div>
  );
};

export default EditProfessionalSecondary;
