import React from 'react';

const Badge = ({children, className = "", type = 'primary'}) => (
    <span className={`badge badge-${type} ${className}`}>{children}</span>
)

export default Badge;