import React from 'react'
import { Link } from 'react-router-dom'

const HeaderTitle = ({ title, backTo, centerTitle = true, className = "" }) => (
    <div className={`my-5 d-flex align-items-center justify-content-center ${className}`}>
        {backTo && (
            <Link to="/dashboard">
                <i className="fas fa-arrow-left fa-2x scale-effect mr-3"></i>
            </Link>
        )}
        <h1 className={`mb-0 flex-grow-1 font-weight-bold${centerTitle ? ' text-center' : ''}`}>{title}</h1>
        {backTo && <div style={{ width: 28 }}></div>}
    </div>
)

export default HeaderTitle