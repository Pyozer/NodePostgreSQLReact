import React from 'react'

const Card = ({ children, className = "" }) => (
    <div className={`card rounded shadow-sm ${className}`}>
        <div className="card-body">
            {children}
        </div>
    </div>
)

export default Card