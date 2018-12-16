import React from 'react'
import { Card } from '../UI'
import { Form } from '.'

const FormCard = ({ title, onSubmit, btnValue, children }) => (
    <Card className="w-100">
        {title && <h3 className="card-title mb-5 text-center">{title}</h3>}

        <Form onSubmit={onSubmit} submitBtn={btnValue || title}>
            {children}
        </Form>
    </Card>
)

export default FormCard