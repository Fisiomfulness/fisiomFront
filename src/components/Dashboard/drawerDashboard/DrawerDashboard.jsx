/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { BiArrowToLeft } from 'react-icons/bi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';
import { getUser } from '@/utils/utils';
import toast from 'react-hot-toast';
import { dashboardDropdown } from '../data/data';

const DrawerDashboard = () => {
  //!---------------------- H O O K S -------------------
  const [loggingOut, setLoggingOut] = React.useState(false);
  // const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  // React.useEffect(() => {
  // });

  //! Harcodeado por ahora, hasta que el ADMIN esté registrado.
  const user = {
    name: 'Gastón',
    lastname: 'Jacinto',
    genre: 'masc',
  };
  const router = useRouter();
  //!---------------------- F U N C T I O N S -------------------
  // const handleSignOut = async () => {
  //   setLoggingOut(true);
  //   await signOut({
  //     redirect: false,
  //     callbackUrl: '/auth/login',
  //   });
  //   router.push('/auth/login');
  //   setTimeout(() => {
  //     setLoggingOut(false);
  //   }, 5000);
  // };

  //!---------------------- V A R I A B L E S -------------------
  const userGender = user?.genre === 'masc' ? 'Bienvenido' : 'Bienvenida';
  return (
    <div
      className={` absolute top-0 left-0 z-10  h-[100%] pb-16 flex flex-col transition-all  ${
        !open
          ? 'w-[2rem] bg-opacity-100 '
          : 'bg-primary-200 w-[15rem]  bg-opacity-90 '
      }`}
    >
      <button
        onClick={toggleOpen}
        className={`absolute z-[1000] right-0 top-0  w-[2rem] h-[2rem] flex items-center justify-center transition-all `}
      >
        {open ? (
          <BiArrowToLeft className="w-[1.7rem] h-[1.7rem] duration-400 text-black hover:-translate-x-1 " />
        ) : (
          <BiArrowToLeft className="w-[1.7rem] h-[1.7rem] -rotate-180 duration-400 bg-primary-400 rounded-full text-black hover:translate-x-1" />
        )}
      </button>
      <div
        className={`relative h-full p-2 flex flex-col items-center text-primary-900 overflow-auto ${
          open ? '' : 'hidden'
        }`}
      >
        <div className="flex items-center w-full justify-center flex-col mt-1 pt-5 ">
          {/* <img
            src="https://res.cloudinary.com/db7wpgkge/image/upload/v1699670220/evolution-training/cnuybcladukvdvshayd4.png"
            className="w-20 h-20 rounded-full "
          /> */}
          <p className="font-semibold text-black capitalize">
            {userGender},{' '}
            <span className="text-primary-700">
              {user.name} {user.lastname}
            </span>
          </p>
        </div>
        <div className="mt-1  w-full h-[full] pb-10 flex flex-col cursor-default">
          <div className="py-[.5px] mb-1 bg-primary-600"></div>
          {dashboardDropdown.map((option) => {
            return (
              <Listbox
                key={option.tab}
                aria-label="Actions"
                onAction={() => {
                  toggleOpen();
                  // changeTab(option.tab);
                }}
                className="w-full"
              >
                <ListboxItem
                  key={option.tab}
                  startContent={option.icon}
                  className="w-full text-2xl bg-primary-900 bg-opacity-30 transition-all text-primary-900 hover:bg-primary-500 "
                  variant="primary"
                >
                  {option.name}
                </ListboxItem>
              </Listbox>
            );
          })}
        </div>
        <div className="fixed w-[14rem] h-[3rem] rounded-lg bottom-0 flex items-center justify-center">
          {/* <button
            className="group flex items-center gap-2  bg-primary-600 bg-opacity-50 py-1 px-5 rounded-xl text-primary-900 font-bold hover:bg-opacity-100 transition-all"
            // onClick={() => {
            //   handleSignOut();
            // }}
          >
            {loggingOut ? (
              <div className=" w-[1.5rem] h-[1.5rem] animate-spin border-b-2 border white rounded-full"></div>
            ) : (
              <>
                <RiLogoutCircleLine className="w-[1rem] h-[1rem] group-hover:-rotate-180 group-hover:scale-125 transition-all" />{' '}
                Cerrar sesión
              </>
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DrawerDashboard;
