import { Button, Image } from '@nextui-org/react';
import { useFormikContext } from 'formik';
import { useState } from 'react';

const EditProfilePicture = ({ displayedImage, setDisplayedImage }) => {
  const { values, errors, setFieldValue } = useFormikContext();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 mb-2">
      <input
        id="user-image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target?.files[0];
          if (!file) return;
          setDisplayedImage(URL.createObjectURL(file));
          setFieldValue('image', file);
        }}
      />
      <Image
        src={displayedImage}
        className="size-32 rounded-full border border-gray-300 object-center"
      />
      <Button
        as="label"
        htmlFor="user-image-upload"
        size="sm"
        color="secondary"
        className="font-semibold tracking-wider uppercase flex-col gap-0 h-fit py-1"
      >
        <p>Cargar foto</p>
        <small className="text-[9px] font-sans">(Max 3mb)</small>
      </Button>
      {values.image && values.image instanceof File && (
        <p
          className={`w-[95%] max-w-[300px] px-2 outline-dashed outline-1 outline-offset-2 ${
            errors.image
              ? 'outline-danger-500 text-danger-500'
              : 'outline-gray-400 text-primary-900'
          } truncate text-center`}
        >
          <span
            className={`font-semibold ${
              errors.image ? 'text-danger-500' : 'text-secondary-500'
            }`}
          >
            {errors.image ? 'Imagen invalida: ' : 'Nueva: '}
          </span>
          {values.image?.name}
        </p>
      )}
    </div>
  );
};

export default EditProfilePicture;
