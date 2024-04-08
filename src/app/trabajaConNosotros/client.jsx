"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { CgAttachment } from "react-icons/cg";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import { useState } from "react";

import validation from "./validation";

const TrabajaConNosotrosClient = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [form, setForm] = useState({
    dni: "",
    nroDni: "",
    phone: "",
    email: "",
    cv: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validateError = validation(form);
    console.log("validate", validateError);
    setErrors(validateError);

    if (Object.keys(validateError).length === 0) {
      setForm({
        dni: "",
        nroDni: "",
        phone: "",
        email: "",
        cv: "",
        message: "",
      });
    }
  };

  return (
    <div className="p-14 justify-center w-full">
      <div className="flex items-center gap-10">
        <img width="40" src="/logo_simple.webp" alt="logo" />
        <p>
          Trabajá con <span className="text-[#06B0FF] underline">nosotros</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className=" justify-center w-full">
        <div className=" mt-5 flex flex-row gap-10 items-start justify-start overflow-hidden  min-[360px]:p-0 max-[850px]:flex-col">
          <div className="flex flex-col gap-10 itemes-center w-full">
            <div className="flex flex-col gap-2">
              <div className="flex  justify-between ">
                <label>Tipo de documento</label>
                <label className="text-[#FF0000]">{errors && errors.dni}</label>
              </div>

              <input
                name="dni"
                value={form.dni}
                onChange={handleChange}
                placeholder="DNI"
                className={
                  errors.dni
                    ? "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8 border-[#FF0000]"
                    : "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8"
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex  justify-between ">
                <label>Número de documento</label>
                <label className="text-[#FF0000]">
                  {errors && errors.nroDni}
                </label>
              </div>
              <input
                type="number"
                name="nroDni"
                value={form.nroDni}
                onChange={handleChange}
                placeholder="12.345.678"
                className={
                  errors.nroDni
                    ? "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8 border-[#FF0000]"
                    : "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8"
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex  justify-between ">
                <label>Número de télefono</label>
                <label className="text-[#FF0000]">
                  {errors && errors.phone}
                </label>
              </div>
              <input
                type="number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+09 9 999 999 999"
                className={
                  errors.phone
                    ? "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8 border-[#FF0000]"
                    : "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8"
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-10 itemes-center w-full">
            <div className="flex flex-col gap-2">
              <div className="flex  justify-between ">
                <label>Email</label>
                <label className="text-[#FF0000]">
                  {errors && errors.email}
                </label>
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="mail@mail.com"
                className={
                  errors.email
                    ? "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8 border-[#FF0000]"
                    : "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8"
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex  justify-between ">
                <label>Agrega tu CV</label>
                <label className="text-[#FF0000]">{errors && errors.cv}</label>
              </div>

              <div
                className={
                  errors.cv
                    ? "relative  border border-slate-200 bg-slate-200 rounded-sm px-2 py-1 h-8 border-[#FF0000]"
                    : "relative border border-slate-200 bg-slate-200 rounded-sm px-2 py-1 h-8"
                }
              >
                <input
                  type="text"
                  className="bg-transparent"
                  placeholder="file.pdf"
                  name="cv"
                  value={form.cv}
                  onChange={handleChange}
                />
                <Button
                  isIconOnly
                  className="bg-transparent font-bold py-1 px-2 absolute top-1/2 right transform -translate-y-1/2 text-sky-500 w-10/12"
                >
                  <CgAttachment />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex  justify-between ">
                <label>Mensaje</label>
                <label className="text-[#FF0000]">
                  {errors && errors.message}
                </label>
              </div>
              <textarea
                value={form.message}
                onChange={handleChange}
                name="message"
                placeholder="Mensaje..."
                className={
                  errors.cv
                    ? "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8 border-[#FF0000]"
                    : "border border-slate-200 rounded-sm px-2 bg-slate-200 h-8"
                }
              />
            </div>
          </div>
        </div>
        <div className=" flex mt-5  min-[360px]:p-0 max-[850px]: flex justify-start w-full">
          <Button
            type="submit"
            onPress={onOpen}
            className="text-white bg-[#06B0FF] rounded w-2/4"
            color="primary"
          >
            ENVIAR
          </Button>
          {errors && Object.keys(errors).length > 0 ? (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent className="flex items-center justify-center h-96 w-72">
                {(onClose) => (
                  <>
                    <ModalBody>
                      <div className="flex flex-col items-center justify-center my-28">
                        <IoAlertCircleOutline className="text-5xl text-[#FF0000]" />
                        <p className="font-semibold">Campos Incompletos</p>
                      </div>
                      <Button
                        onPress={onClose}
                        className="w-60 font-medium text-black bg-[#9CD4EE]"
                        color="primary"
                      >
                        VOLVER
                      </Button>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          ) : (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent className="flex items-center justify-center h-96 w-72">
                {(onClose) => (
                  <>
                    <ModalBody>
                      <div className="flex flex-col items-center justify-center my-28">
                        <MdCheckCircleOutline className="text-5xl text-[#175C7C]" />
                        <p className="font-semibold">Mensaje enviado</p>
                      </div>
                      <Button
                        onPress={onClose}
                        className="w-60 font-medium text-black bg-[#9CD4EE]"
                        color="primary"
                      >
                        VOLVER
                      </Button>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </div>
      </form>
    </div>
  );
};

export default TrabajaConNosotrosClient;
