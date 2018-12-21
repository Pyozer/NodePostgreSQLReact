import React from 'react';
import ReactAvatar from 'react-avatar';

const ProfilePicture = ({ nickname, profile_picture, size = "100", className = "", ...rest }) => {
    if (!nickname && !profile_picture)
        return <ReactAvatar size={size} name="" {...rest} />

    return <ReactAvatar
        size={size}
        round={true}
        src={profile_picture}
        name={!profile_picture ? nickname : null}
        className={`shadow-sm ${className}`}
        {...rest}
    />
};

export default ProfilePicture;