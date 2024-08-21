'use client';

import { CustomLogo } from '@/features/ui';
import { Button, Card, CardBody, Radio, RadioGroup } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { RegisterProfessional } from './RegisterProfesional';
import { RegisterUser } from './RegisterUsuario';

export const Register = () => {
  const [selected, setSelected] = useState('usuario');
  const [aceptoCondiciones, setAceptoCondiciones] = useState(false);
  const [recibirInformacion, setRecibirInformacion] = useState(false);

  const conditionsAccepted =
    aceptoCondiciones && recibirInformacion ? true : false;

  return (
    <Card className="grid w-full max-w-[1320px] overflow-hidden min-[1160px]:grid-cols-[1fr,1fr] items-center justify-items-center p-6 min-[480px]:p-10 min-[1160px]:py-28 rounded-sm">
      <CardBody className="center flex-col w-full gap-5 lg:gap-8 overflow-hidden">
        <Link href="/">
          <CustomLogo width={220} color="dark" />
        </Link>

        <div className="flex justify-center !w-full">
          <RadioGroup
            className="font-semibold"
            label="Registrarse como:"
            value={selected}
            onValueChange={setSelected}
          >
            <Radio className="text-lg font-normal" value="usuario">
              Usuario
            </Radio>
            <Radio className="text-lg font-normal" value="profesional">
              Profesional
            </Radio>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-2 w-full min-[480px]:w-2/3">
          <label className="text-[11px] flex gap-2">
            <input
              type="checkbox"
              checked={aceptoCondiciones}
              onChange={() => setAceptoCondiciones(!aceptoCondiciones)}
              className="size-5 cursor-pointer"
            />
            <span>
              Acepto los
              <a className="text-primary font-semibold hover:underline cursor-pointer">
                {' '}
                términos y condiciones{' '}
              </a>{' '}
              del servicio de FISIOMFULNESS. Declaro haber leído y entiendo la
              política de privacidad
            </span>
          </label>
          <label className="text-[11px] flex gap-2">
            <input
              type="checkbox"
              checked={recibirInformacion}
              onChange={() => setRecibirInformacion(!recibirInformacion)}
              className="size-5 cursor-pointer"
            />
            <span>
              Doy mi consentimiento y acepto recibir información sobre los{' '}
              <a className="text-primary font-semibold hover:underline cursor-pointer">
                servicios y novedades de FISIOMFULNESS. Qué significa esto?
              </a>
            </span>
          </label>
          <div className="flex flex-row justify-center items-center gap-4 my-4">
            <p className="text-sm">¿Ya esta registrado?</p>
            <Button
              className="bg-primary-500 text-white rounded-md font-semibold"
              as={Link}
              href="/login"
            >
              Ingresar
            </Button>
          </div>
        </div>
      </CardBody>
      {selected === 'usuario' ? (
        <RegisterUser conditionsAccepted={conditionsAccepted} />
      ) : (
        <RegisterProfessional conditionsAccepted={conditionsAccepted} />
      )}
    </Card>
  );
};
