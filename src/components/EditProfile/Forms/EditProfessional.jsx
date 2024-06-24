import { useState } from 'react';
import { Card } from '@nextui-org/react';
import EditProfessionalMain from './EditProfessionalMain';
import EditProfessionalSecondary from './EditProfessionalSecondary';

const EditProfessional = ({
  userDetail,
  setIsSuccessModalOpen,
  updateSessionUser,
}) => {
  const [professional, setProfessional] = useState(userDetail);
  const [formStep, setFormStep] = useState(1);

  const handleNext = () => setFormStep(2);
  const handleBack = () => setFormStep(1);

  return (
    <Card className="grid h-full justify-items-center rounded-sm w-full py-8 px-auto max-w-[800px] max-h-[1500px] md:py-14 !overflow-y-auto">
      {formStep === 1 ? (
        <EditProfessionalMain
          handleNext={handleNext}
          professional={professional}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
          updateSessionUser={updateSessionUser}
        />
      ) : (
        <EditProfessionalSecondary
          handleBack={handleBack}
          professional={professional}
          setProfessional={setProfessional}
        />
      )}
    </Card>
  );
};

export default EditProfessional;
