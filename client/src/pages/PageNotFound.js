import React from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../utils/Context'
import { FullCenter, Button } from '../components/UI';

const PageNotFound = () => (
    <PageTitle title="Page Not Found">
        <FullCenter className="py-5">
            <h2 className="display-4 font-weight-bold text-primary text-shadow broke-effect-start">You broke internet !</h2>

            <h3 className="h3 font-weight-light text-center mt-5">
                The page you are looking for not exists :/
            </h3>

            <Link to="/">
                <Button outline={true} className="btn-lg px-5 mt-4">Go Home</Button>
            </Link>
        </FullCenter>
    </PageTitle>
)

export default PageNotFound