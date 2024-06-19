'use client';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CustomModal, CustomButton } from '@/features/ui';
import { FaRegCheckCircle } from 'react-icons/fa';
import roles from '@/utils/roles';
import EditProfessional from './Forms/EditProfessional';
import EditUser from './Forms/EditUser';

const EditProfileComponent = ({ user, currentSession, interests }) => {
  const { update } = useSession();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const router = useRouter();

  const updateSessionUser = async (newUserValues) => {
    const newSession = {
      ...currentSession,
      user: {
        ...currentSession?.user,
        ...newUserValues,
      },
    };
    await update(newSession);
  };

  const handleModalButton = () => {
    router.push('/');
    setIsSuccessModalOpen(false);
  };

  return (
    <Fragment>
      {user.role === roles.PROFESSIONAL ? (
        <EditProfessional
          userDetail={user}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
          updateSessionUser={updateSessionUser}
        />
      ) : (
        <EditUser
          userDetail={user}
          interests={interests}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
          updateSessionUser={updateSessionUser}
        />
      )}
      <CustomModal
        isOpen={isSuccessModalOpen}
        hideCloseButton
        size="lg"
        className="!p-16 min-[460px]:!p-36 md:!p-40 max-w-[700px] max-h-[550px] center"
      >
        <div className="flex-col center">
          <FaRegCheckCircle size={30} color="#175C7C" />
          <p className="mt-2 tracking-wide">Perfil modificado</p>
          <CustomButton
            onPress={handleModalButton}
            className="mt-10 uppercase bg-secondary-100 text-secondary-400 rounded-none w-full md:w-64"
            variant="flat"
          >
            Volver
          </CustomButton>
        </div>
      </CustomModal>
    </Fragment>
  );
};

export default EditProfileComponent;
