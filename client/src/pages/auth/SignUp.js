import React from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../../utils/Context'
import { HorizontalCenter, HeaderTitle } from '../../components/UI'
import { SignUpForm } from '../../components/Form'

const SignUp = () => (
    <PageTitle title="Sign Up">
        <HorizontalCenter className="container">
            <HeaderTitle title="Sign Up" />
            <div className="col col-md-8 col-lg-6">
                <SignUpForm />
                <p className="mt-4">
                    Already have an account ? <Link to="/auth/signIn" className="text-primary font-weight-bold">Sign In</Link>
                </p>
            </div>
        </HorizontalCenter>
    </PageTitle>
)

export default SignUp