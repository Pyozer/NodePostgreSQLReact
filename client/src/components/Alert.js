import React from 'react';

const Alert = ({ message }) => (
    !message || !message.msg
        ? <></>
        : (
            <div className={`alert alert-${message.type || 'danger'}`} role="alert">
                {message.msg}
            </div>
        )
)
export default Alert;