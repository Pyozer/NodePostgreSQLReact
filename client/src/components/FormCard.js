import React from 'react'
import Card from './Card'

const FormCard = ({ title, error, onSubmit, btnValue, children }) => (
    <Card className="w-100">
        {title && <h3 className="card-title mb-5 text-center">{title}</h3>}

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={onSubmit}>
            {children}

            <div className="row justify-content-center mt-5">
                <div className="col col-md-8 col-lg-6 col-xl-4">
                    <button type="submit" className="btn btn-primary full-rounded btn-block">{btnValue || title}</button>
                </div>
            </div>
        </form>
    </Card>
)

export default FormCard