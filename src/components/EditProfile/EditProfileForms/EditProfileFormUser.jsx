"use client";

import { Card, CardBody } from "@nextui-org/react";

function EditProfileFormUser({ user }) {
  // const [isVisible, setIsVisible] = useState(false);
  // const toggleVisibility = () => setIsVisible(!isVisible);
  // // const [edit, setEdit] = useState(initialValues);
  // const [input, setInput] = useState(initialValues);
  // const [errors, setErrors] = useState(initialValues);

  const handleChange = () => {};

  return (
    <Card className="grid gap-6 md:gap-x-4 items-center justify-items-center p-6 md:p-10 md:py-20 rounded-sm w-full max-w-[800px]">
      <CardBody className="center flex-col w-full p-0 gap-8 md:gap-16"></CardBody>
      <span>User Edit</span>
    </Card>
  );
}
export default EditProfileFormUser;
