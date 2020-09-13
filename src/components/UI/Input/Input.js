import React from "react";
import "./Input.css";

const Input = (props) => {
  let inputElement = null;
  const inputClass = ['InputElement'];
  if(props.invalid && props.touched){
    inputClass.push('Invalid');
  }

  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input
          {...props.elementconfig}
          value={props.value}
          className={inputClass.join(' ')}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementconfig}
          value={props.value}
          className={inputClass.join(' ')}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={inputClass.join(' ')} onChange={props.changed} required>
          <option value="">Select Type</option>
          {props.elementconfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementconfig}
          value={props.value}
          className={inputClass.join(' ')}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
