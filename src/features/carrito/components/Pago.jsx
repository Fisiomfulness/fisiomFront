"use client";

import {
  CustomAlert,
  CustomButton,
  CustomInput,
  CustomModal,
} from "@/features/ui";

import { RadioGroup, Radio } from "@nextui-org/react";
import TablaServicios from "./TablaServicios";
import { useEffect, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { useStep } from "@custom-react-hooks/all";

function TablaPagar() {
  return (
    <div className="overflow-x-auto w-full p-3 bg-zinc-200 rounded-md">
      <table className="min-w-max mx-auto bg-transparent">
        <thead>
          <tr className="[&_th]:py-3">
            <th scope="col">Información de tu compra</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="[&_tr_td]:py-2 text-left">
          <tr>
            <td>servicio</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>servicio</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>servicio</td>
            <td>$100</td>
          </tr>
          <tr className="border-t border-primary">
            <td className="font-bold">total</td>
            <td>$300</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CustomRadio({ children, ...otherProps }) {
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: [
          "inline-flex flex-row items-center justify-start gap-2",
          "min-w-[280px] m-0 cursor-pointer px-5 py-3 font-normal",
          "border-1 border-primary rounded-sm",
          "data-[selected=true]:bg-zinc-200 hover:bg-zinc-200",
        ],
        control: "w-4 h-4 bg-primary",
        label: "text-base",
        wrapper: "!border-secondary !bg-zinc-200",
      }}
      size="sm"
    >
      {children}
    </Radio>
  );
}

const metodosDePago = [
  {
    value: "credito",
    label: "Tarjeta de crédito",
  },
  {
    value: "debito",
    label: "Tarjeta de débito",
  },
];
const formaDePago = [
  {
    value: "paypal",
    label: "Paypal",
  },
  {
    value: "mercadoPago",
    label: "Mercado pago",
  },
  {
    value: "tambo",
    label: "Tambo",
  },
];

function Group({ label, values }) {
  return (
    <RadioGroup label={label} classNames={{ label: "text-inherit" }}>
      {values.map((value) => (
        <CustomRadio key={value.value} value={value.value}>
          {value.label}
        </CustomRadio>
      ))}
    </RadioGroup>
  );
}

function FirstModal({ onClose }) {
  return (
    <>
      <p className="border-b border-primary w-fit mb-4 text-lg font-semibold">
        Elige tu método de pago
      </p>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-6">
          <Group label="Método de pago" values={metodosDePago} />
          <Group label="Otras formas de pago" values={formaDePago} />
        </div>
        <div className="flex flex-col gap-4 w-72">
          <TablaPagar />
          <CustomInput
            label="Cupon de descuento"
            placeholder="Ingresa el codigo de tu cupon"
          />
          <CustomButton onPress={onClose}>Pagar</CustomButton>
        </div>
      </div>
    </>
  );
}

function SecondModal({ onOpenChange, onCheck, onBack }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isInvalid, setIsInvalid] = useState({
    titular: false,
    tarjeta: false,
    vencimiento: false,
    ccv: false,
  });

  useEffect(() => {
    if (isSubmit) {
      onCheck();
      onOpenChange();
    }
  }, [isSubmit, onOpenChange, onCheck]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { titular, tarjeta, vencimiento, ccv } = event.target;

    const draft = {
      ...isInvalid,
      titular: !titular.value,
      tarjeta: !tarjeta.value,
      vencimiento: !vencimiento.value,
      ccv: !ccv.value,
    };

    if (Object.values(draft).every((value) => value === false)) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }

    setIsInvalid(draft);
  };

  return (
    <>
      <p className="mb-3 cursor-pointer w-fit" onClick={() => onBack()}>
        <IoIosArrowBack className="-ml-1.5 inline text-primary w-5 h-5" />{" "}
        Volver a elegir tu método de pago
      </p>
      <p className="border-b border-primary w-fit text-lg font-semibold">
        Ingresá tus datos
      </p>
      <form onSubmit={handleSubmit} className="pt-4 w-80 flex flex-col gap-2">
        <CustomInput
          name="titular"
          defaultValue="***** *****"
          label="Titular de la tarjeta"
          isInvalid={isInvalid.titular}
        />
        <CustomInput
          name="tarjeta"
          defaultValue="**** **** **** ****"
          isInvalid={isInvalid.tarjeta}
          label="Número de tarjeta"
        />
        <div className="flex flex-row justify-between">
          <CustomInput
            name="vencimiento"
            defaultValue="**/**"
            isInvalid={isInvalid.vencimiento}
            label="Vencimiento"
            classNames={{
              base: "w-32",
              label: "m-0 font-normal text-base !text-inherit",
              input: "!w-[100px]",
            }}
          />
          <CustomInput
            name="ccv"
            defaultValue="***"
            isInvalid={isInvalid.ccv}
            label="ccv"
            classNames={{
              base: "w-32",
              label: "m-0 font-normal text-base !text-inherit",
              input: "!w-[100px]",
            }}
          />
        </div>
        <CustomButton className="mt-4" type="submit">
          Pagar
        </CustomButton>
      </form>
    </>
  );
}

const Step = Object.freeze({
  // NOTE: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca1008#additional-zero-value-field-names
  None: 0,
  ChoosePayment: 1,
  InputCard: 2,
  ConfirmPayment: 3,
});

const content = {
  loading: (
    <p>
      Confirmando pago, <span className="font-bold italic">aguarde</span>
    </p>
  ),
  error: (
    <div className="text-center">
      <p>Datos inválidos</p>
      <p>intente nuevamente</p>
    </div>
  ),
  success: <p>Pago realizado con exito</p>,
};

function ModalBase() {
  const [status, setStatus] = useState("");
  const { currentStep, goToStep, nextStep, prevStep, reset } = useStep({});

  useEffect(() => {
    if (status !== "loading") return;

    const timeout = setTimeout(() => {
      setStatus("success");
      // setStatus("error");
    }, 1500);

    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <>
      <CustomButton onPress={() => goToStep(Step.ChoosePayment)}>
        Asigna tu metodo de pago
      </CustomButton>
      <CustomModal
        isOpen={currentStep === Step.ChoosePayment}
        onOpenChange={reset}
      >
        <FirstModal onClose={nextStep} />
      </CustomModal>
      <CustomModal isOpen={currentStep === Step.InputCard} onOpenChange={reset}>
        <SecondModal
          onOpenChange={nextStep}
          onBack={prevStep}
          onCheck={() => setStatus("loading")}
        />
      </CustomModal>
      <CustomAlert
        isOpen={currentStep === Step.ConfirmPayment}
        onOpenChange={reset}
        status={status}
        onClose={status === "success" ? reset : prevStep}
      >
        {content[status]}
      </CustomAlert>
    </>
  );
}

export default function Pago() {
  return (
    <>
      <TablaServicios />
      <ModalBase />
    </>
  );
}
