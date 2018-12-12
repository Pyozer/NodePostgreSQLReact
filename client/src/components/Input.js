import React from 'react';

const Input = ({ type = "text", label, name, id, onChange, value, placeholder = "", className = "", inputClass = "" }) => (
    <div className={"form-group " + className}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
            type={type}
            className={"form-control full-rounded " + inputClass}
            value={value}
            name={name}
            id={id || name}
            placeholder={placeholder || label}
            onChange={onChange} />
    </div>
)

export default Input;