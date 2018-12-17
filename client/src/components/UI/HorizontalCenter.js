import React from 'react'

const HorizontalCenter = ({ children, className = "", isColumn = true }) => (
    <div className={`d-flex ${isColumn ? 'flex-column align-items-center' : 'justify-content-center'} ${className}`}>
        {children}
    </div>
)

export default HorizontalCenter