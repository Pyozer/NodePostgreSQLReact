import React from 'react';
import { Input } from '.';

const UserInputs = ({ user }) => (
    <>
        <Input type="text" label="Nickname" name="nickname" defaultValue={user ? user.nickname : ''} />
        <Input type="email" label="Email" name="email" defaultValue={user ? user.email : ''} />
        <Input type="text" label="Url profile picture" name="profile_picture" defaultValue={user ? user.profile_picture : ''} />
        <Input type="password" label="Password" name="password" placeholder={user ? 'Leave blank to ignore' : 'Password'} />
        <Input type="password" label="Password confirmation" name="password_confirmation" placeholder={user ? 'Leave blank to ignore' : 'Password confirmation'} />
    </>
)

export default UserInputs;