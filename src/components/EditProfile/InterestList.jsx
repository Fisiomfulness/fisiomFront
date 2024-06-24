import { useFormikContext } from 'formik';
import { Select, SelectItem } from '@nextui-org/react';

const MAX_INTERESTS = 5;

const InterestList = ({ interests }) => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Select
      label="Intereses"
      selectionMode="multiple"
      placeholder={`Elija hasta ${MAX_INTERESTS} intereses`}
      selectedKeys={values.interests}
      onSelectionChange={(keys) => {
        if (keys.size <= MAX_INTERESTS) {
          setFieldValue('interests', Array.from(keys));
        }
      }}
      radius="sm"
    >
      {interests.map((interest) => (
        <SelectItem key={interest._id}>{interest.name}</SelectItem>
      ))}
    </Select>
  );
};

export default InterestList;
