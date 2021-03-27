import React from "react";

const Select = ({ name, value, label, options, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value} //with this assignment, we convert the input element to a controlled element in order to have a single source of truth which is the state in the parent
        id={name}
        onChange={onChange}
        className="form-control"
      >
        <option value=""></option>

        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
