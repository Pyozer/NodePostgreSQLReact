import React from 'react'
import { Link } from 'react-router-dom'

const HeaderTitle = ({ title, backTo }) => (
    <div className="my-5 d-flex align-items-center justify-content-center">
        {backTo && (
            <Link to="/dashboard">
                <i class="fas fa-arrow-left fa-2x"></i>
            </Link>
        )}
        <h1 className="mb-0 ml-4 flex-grow-1 text-center">{title}</h1>
        {backTo && <div style={{ width: 28 }}></div>}
    </div>
)

export default HeaderTitle