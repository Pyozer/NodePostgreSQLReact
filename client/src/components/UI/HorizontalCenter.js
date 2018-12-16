import React from 'react'

const HorizontalCenter = ({ children, className = "" }) => (
    <div className={`d-flex flex-column align-items-center ${className}`}>
        {children}
    </div>
)

export default HorizontalCenter