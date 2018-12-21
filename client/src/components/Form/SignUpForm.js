import React from 'react'
import { SignForm } from '.'
import UserInputs from './UserInputs';

const SignUpForm = () => (
    <SignForm btnValue="Sign Up" requestUrl="/api/auth/register">
        <UserInputs />
    </SignForm>
)

export default SignUpForm