import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { PageTitle } from '../../utils/Context';
import { HeaderTitle, Alert } from '../../components/UI';
import { UserProjects, UserInfos } from '../../components/User';
import { fetchData } from '../../utils/Api';
import Message from '../../models/Message';

class UserProfile extends Component {
    state = { message: null, user: {} }

    componentWillMount() {
        this.fetchUserData()
    }

    async fetchUserData() {
        try {
            const { userId } = this.props.match.params
            const result = await fetchData(`/api/users/${userId}`)
            const { user } = result.data
            this.setState({ user })
        } catch ({ message }) {
            this.setMessage(new Message(message, "danger"))
        }
    }

    setMessage(message) {
        this.setState({ message })
    }

    render() {
        const { userId } = this.props.match.params
        const { user, message } = this.state

        const nickname = user.nickname || "User"
        return (
            <PageTitle title={`${nickname} profile`}>
                <div className="container">
                    <HeaderTitle centerTitle={false}>{nickname}</HeaderTitle>
                    {message && <Alert message={message} />}
                    <UserInfos user={user} />

                    <HeaderTitle centerTitle={false}>{nickname}'s projects</HeaderTitle>
                    <UserProjects userId={userId} isEdit={false} />
                </div>
            </PageTitle>
        );
    }
}

export default withRouter(UserProfile);