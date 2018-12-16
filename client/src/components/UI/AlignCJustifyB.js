import React from 'react'

const AlignCJustifyB = ({ children, className = "" }) => (
    <div className={`d-flex align-items-center justify-content-between ${className}`}>
        {children}
    </div>
)

export default AlignCJustifyB