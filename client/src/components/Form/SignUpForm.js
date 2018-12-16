import React from 'react'
import { Input, SignForm } from '.'

const SignUpForm = () => (
    <SignForm btnValue="Sign Up" requestUrl="/api/auth/register">
        <Input label="Nickname" name="nickname" />
        <Input label="Email" name="email" type="email" className="mt-3" />
        <Input label="Password" name="password" type="password" className="mt-3" />
        <Input label="Password confirmation" name="password_confirmation" type="password" className="mt-3" />
    </SignForm>
)

export default SignUpForm