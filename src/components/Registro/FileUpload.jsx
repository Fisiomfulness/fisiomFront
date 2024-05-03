import { useField, useFormikContext } from 'formik';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({ name }) {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0]);
    },
    [setFieldValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        className={`px-3 py-2 outline-none hover:cursor-pointer border-2 border-zinc-300 ${
          meta.error
            ? '!border-danger-300/70'
            : meta.value && '!border-primary-500/80'
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} accept={['.pdf']} />
        {isDragActive ? (
          <p className="text-center">Suelta tu curriculum aqui...</p>
        ) : (
          <p className={`text-center italic ${meta.value?.name && 'truncate'}`}>
            {meta.value?.name || 'Suelta o haz click para subir tu curriculum'}
          </p>
        )}
      </div>
      {meta.error && (
        <p className="text-danger-500 text-sm text-center mt-1">{meta.error}</p>
      )}
    </div>
  );
}

export default FileUpload;
