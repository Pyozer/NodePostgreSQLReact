import React from 'react';
import { Input } from '.';

const UserInputs = ({ user, isSignUp = true }) => (
    <>
        <Input label="Nickname" name="nickname" defaultValue={user ? user.nickname : ''} required={isSignUp} />
        <Input type="email" label="Email" name="email" defaultValue={user ? user.email : ''} required={isSignUp} />
        <Input label="Url profile picture" name="profile_picture" defaultValue={user ? user.profile_picture : ''}  />
        <Input type="password" label="Password" name="password" placeholder={user ? 'Leave blank to ignore' : 'Password'} required={isSignUp}  />
        <Input type="password" label="Password confirmation" name="password_confirmation" placeholder={user ? 'Leave blank to ignore' : 'Password confirmation'} required={isSignUp}  />
    </>
)

export default UserInputs;