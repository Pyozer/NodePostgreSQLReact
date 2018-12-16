import React from 'react';
import UserInfoRender from '../../models/UserInfoRender';
import { Alert, Card } from '../UI';

const UserInfos = ({ user }) => {
    if (!user)
        return <Alert message="No user data" />

    const info = {
        'nickname': new UserInfoRender("Nickname", () => user.nickname),
        'email': new UserInfoRender("Email", () => user.email),
        'createdAt': new UserInfoRender("Date de création", () =>
            new Date(user.createdAt).toLocaleString('fr-FR')
        ),
        'updatedAt': new UserInfoRender("Dernière modification", () =>
            new Date(user.updatedAt).toLocaleString('fr-FR')
        )
    }
    return (
        <div className="row">
            {Object.entries(info).map(([key, value]) => (
                <div key={key} className="p-2 col col-md-6 col-lg-4">
                    <Card>
                        {value.title}<br />
                        <strong>{value.render()}</strong>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default UserInfos;