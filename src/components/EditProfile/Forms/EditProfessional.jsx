import { useState } from 'react';
import { Card } from '@nextui-org/react';
import EditProfessionalMain from './EditProfessionalMain';
import EditProfessionalSecondary from './EditProfessionalSecondary';

const EditProfessional = ({
  userDetail,
  setIsSuccessModalOpen,
  updateSessionUser,
}) => {
  const [formStep, setFormStep] = useState(1);

  const handleNext = () => setFormStep(2);
  const handleBack = () => setFormStep(1);

  return (
    <Card className="grid h-full justify-items-center rounded-sm w-full py-8 max-w-[800px] px-auto md:py-16">
      {formStep === 1 ? (
        <EditProfessionalMain
          handleNext={handleNext}
          userDetail={userDetail}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
          updateSessionUser={updateSessionUser}
        />
      ) : (
        <EditProfessionalSecondary
          userDetail={userDetail}
          handleBack={handleBack}
        />
      )}
    </Card>
  );
};

export default EditProfessional;
