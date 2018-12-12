import React from 'react'

const FullCenter = ({ children, className = "" }) => (
    <div className={"d-flex flex-column align-items-center justify-content-center flex-grow-1 " + className}>
        {children}
    </div>
)

export default FullCenter