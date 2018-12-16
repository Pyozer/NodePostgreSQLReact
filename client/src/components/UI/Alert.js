import React from 'react'

const Alert = ({ message, className = "" }) => {
    if (!message || !message.msg) return <></>

    let { type, msg } = message
    type = type || 'danger'
    const textColor = (type === "warning") ? 'dark' : 'white'

    const classes = `alert alert-${type} bg-${type} text-${textColor} shadow rounded ${className}`
    return (
        <div className={classes} role="alert">
            {msg}
        </div>
    )
}
export default Alert