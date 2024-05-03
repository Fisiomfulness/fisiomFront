'use client';
import { CustomLogo } from '@/features/ui';
import { Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';;
import UserLoginComponent from './UserLoginComponent';

export const Login = () => {
  return (
    <Card className="flex p-2 py-5 items-center h-auto w-full min-[440px]:w-4/5 md:w-[1028px] min-h-[512px] rounded-sm">
      <CardBody className="flex justify-between items-center w-full md:flex-row md:w-4/5 md:gap-10">
        <div className="flex flex-col justify-center items-center">
          <Link href="/" className="pb-16">
            <CustomLogo width={220} color="dark" />
          </Link>
        </div>
        <UserLoginComponent />
      </CardBody>
    </Card>
  );
};
