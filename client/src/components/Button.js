import React from 'react'

const Button = ({ children, className = "", variant = "primary", outline = false, ...rest }) => {
    let btnClass = 'btn-'
    if (outline)
        btnClass += 'outline-'
    btnClass += variant

    return (
        <button className={`btn ${btnClass} full-rounded px-4 scale-effect shadow ${className}`} {...rest}>
            {children}
        </button>
    )
}

export default Button