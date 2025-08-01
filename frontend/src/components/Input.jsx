// src/components/Input.jsx
import React from 'react';

const Input = ({
  type = 'text',
  name,
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
  className = '',
  ...rest
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`input input-bordered w-full ${className}`}
        {...rest}
      />
    </div>
  );
};

export default Input;
