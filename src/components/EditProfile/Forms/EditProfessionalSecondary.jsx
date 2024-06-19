import { Fragment } from 'react';
import { Button } from '@nextui-org/react';
import { TiArrowBack } from 'react-icons/ti';
import ProfessionalExperience from './ProfessionalExperience';
import ProfessionalDescription from './ProfessionalDescription';

const EditProfessionalSecondary = ({ userDetail, handleBack }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full flex items-center justify-between">
        <Button
          isIconOnly
          onClick={handleBack}
          className="bg-transparent self-start"
        >
          <TiArrowBack size={34} className="text-primary-600" />
        </Button>
        <h2 className="flex-grow text-center mb-0">Acerca de mi</h2>
      </div>
      <ProfessionalExperience experiences={userDetail.experience} />
      <ProfessionalDescription />
    </div>
  );
};

export default EditProfessionalSecondary;
