import React from 'react'

const AlignCJustifyB = ({ children, className = "", ...rest }) => (
    <div className={`d-flex align-items-center justify-content-center ${className}`} {...rest}>
        {children}
    </div>
)

export default AlignCJustifyB