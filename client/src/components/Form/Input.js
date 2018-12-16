import React from 'react'

const Input = ({ type = "text", label, name, id, onChange, value, placeholder = "", className = "", inputClass = "", ...rest }) => {
    const inputProps = rest
    if (value)
        inputProps.value = value
    return (
        <div className={"form-group " + className}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                className={"form-control full-rounded " + inputClass}
                name={name}
                id={id || name}
                placeholder={placeholder || label}
                onChange={onChange}
                {...inputProps} />
        </div>
    )
}

export default Input