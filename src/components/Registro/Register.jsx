'use client';

import { useEffect, useState } from 'react';
import { CustomLogo } from '@/features/ui';
import { Card, CardBody, RadioGroup, Radio } from '@nextui-org/react';
import Link from 'next/link';
import RegistroProfesional from './RegisterProfesional';
import RegistroUsuario from './RegisterUsuario';

function Register() {
  const [selected, setSelected] = useState('usuario');
  const [aceptoCondiciones, setAceptoCondiciones] = useState(false);
  const [recibirInformacion, setRecibirInformacion] = useState(false);

  const verifyCondicions = () => {
    return aceptoCondiciones && recibirInformacion ? true : false;
  };

  return (
    <Card className="flex items-center h-auto w-full min-[440px]:w-4/5 md:w-[1028px] min-h-[512px]">
      <CardBody className="flex justify-between items-center w-full md:flex-row md:w-4/5">
        <div className="flex flex-col justify-center items-center">
          <Link href="/" className="pb-16">
            <CustomLogo width={220} color="dark" />
          </Link>
          <div className="flex justify-center">
            <RadioGroup
              className="font-semibold"
              label="Registrate como:"
              value={selected}
              onValueChange={setSelected}
            >
              <Radio className="font-semibold text-lg" value="usuario">
                Usuario
              </Radio>
              <Radio className="font-semibold text-lg" value="profesional">
                Profesional
              </Radio>
            </RadioGroup>
          </div>

          <div className="py-8 w-2/3 flex flex-col gap-2">
            <label className="text-[9px] flex items-center gap-2">
              <input
                type="checkbox"
                checked={aceptoCondiciones}
                onChange={() => setAceptoCondiciones(!aceptoCondiciones)}
                className="size-5"
              />
              <span>
                Acepto los
                <a className="text-primary"> términos y condiciones </a> del
                servicio de FISIOMFULNESS. Declaro haber leído y entiendo la
                política de privacidad
              </span>
            </label>
            <label className="text-[9px] flex items-center gap-2">
              <input
                type="checkbox"
                checked={recibirInformacion}
                onChange={() => setRecibirInformacion(!recibirInformacion)}
                className="size-5"
              />
              <span>
                Doy mi consentimiento y acepto recibir información sobre los{' '}
                <a className="text-primary">
                  servicios y novedades de FISIOMFULNESS. Qué significa esto?
                </a>
              </span>
            </label>
          </div>
        </div>

        {selected === 'usuario' ? (
          <RegistroUsuario Condicions={verifyCondicions} />
        ) : (
          <RegistroProfesional Condicions={verifyCondicions} />
        )}
      </CardBody>
    </Card>
  );
}

export default Register;
