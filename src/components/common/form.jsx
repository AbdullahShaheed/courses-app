import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

export default class Form extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit(); //implementation of this method is in the child class
  };

  //returns errors object or null
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message; //note this mapping from the joi's error object to our errors object
    }

    return errors;
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    const errors = { ...this.state.errors };

    const errorMessaage = this.validateProperty(e.currentTarget);

    if (errorMessaage) errors[name] = errorMessaage;
    else delete errors[name];

    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; //name is a computed property
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  //----- rendering elements -----
  renderButton(label) {
    return (
      <button
        disabled={Object.keys(this.state.errors).length !== 0}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state; //the state property is in the child class, we can refer to it here also just like one class
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        error={errors[name]}
        onChange={this.handleChange}
      ></Input>
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      ></Select>
    );
  }
}
