import React, { InputHTMLAttributes } from 'react';

type CheckboxProps = { label?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = ({ label, ...restProps }: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" {...restProps} />
      {label}
    </label>
  );
};

export default Checkbox;
