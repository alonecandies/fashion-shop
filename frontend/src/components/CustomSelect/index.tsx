import React, { useState } from 'react';
import Select from 'react-select';

type Option = {
  value: number;
  label: string;
};

interface Props {
  placeholder: string;
  listOptions: Option[];
  defaultValue: any;
  handleChange: Function;
}

const CustomSelect: React.FC<Props> = ({
  placeholder,
  listOptions,
  defaultValue,
  handleChange
}) => {
  const [loading] = useState(false);

  const handleChangeValue = (newValue: Option) => {
    handleChange(newValue.value);
  };

  return (
    <Select
      isDisabled={loading}
      isLoading={loading}
      onChange={handleChangeValue}
      options={listOptions}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
