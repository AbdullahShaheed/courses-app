import React from "react";

const Input = ({ value, name, label, type, placeholder, error, onChange }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        value={value} //with this assignment, we convert the input element to a controlled element in order to have a single source of truth which is the state in the parent
        onChange={onChange} //What the user types, this handler will update the state in the parent, so the value of input element will updated accordingly
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
