import { useState } from 'react';
import { useFormikContext } from 'formik';
import { Select, SelectItem } from '@nextui-org/react';

const MAX_INTERESTS = 5;

const InterestList = ({ interests }) => {
  const { values, setFieldValue } = useFormikContext();
  const [selectedInterests, setSelectedInterests] = useState(new Set(values.interests));

  return (
    <Select
      label="Intereses"
      selectionMode="multiple"
      placeholder={`Elija hasta ${MAX_INTERESTS} intereses`}
      selectedKeys={selectedInterests}
      onSelectionChange={(keys) => {
        if (keys.size <= MAX_INTERESTS) {
          setSelectedInterests(keys);
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
