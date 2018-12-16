import React from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../../utils/Context'
import { HorizontalCenter, HeaderTitle } from '../../components/UI'
import { SignInForm } from '../../components/Form'

const SignIn = () => (
    <PageTitle title="Sign In">
        <HorizontalCenter className="container">
            <HeaderTitle title="Sign In" />
            <div className="col col-md-8 col-lg-6">
                <SignInForm />
                <p className="mt-4">
                    Don't have an account ? <Link to="/auth/signUp" className="text-primary font-weight-bold">Sign Up</Link>
                </p>
            </div>
        </HorizontalCenter>
    </PageTitle>
)

export default SignIn