'use client';
import { Button } from '@nextui-org/react';

const error = ({ reset }) => {
  return (
    <div className="my-auto flex flex-col items-center">
      <h2>Oops, hubo un error!</h2>
      <Button color="primary" type="button" onClick={() => reset()}>
        Volver a intentar
      </Button>
    </div>
  );
};

export default error;
