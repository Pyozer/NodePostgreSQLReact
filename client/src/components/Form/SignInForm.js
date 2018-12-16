import React from 'react'
import { SignForm, Input } from '.'

const SignInForm = () => (
    <SignForm btnValue="Sign In" requestUrl="/api/auth/login">
        <Input label="Nickname" name="nickname" />
        <Input label="Password" name="password" type="password" className="mt-3" />
    </SignForm>
)

export default SignInForm