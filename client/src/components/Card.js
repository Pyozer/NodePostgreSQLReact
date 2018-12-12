import React from 'react';

const Card = ({ children, className = "" }) => {
    return (
        <div className={"card rounded shadow " + className}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;