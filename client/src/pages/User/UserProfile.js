import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ReactAvatar from 'react-avatar';
import { PageTitle } from '../../utils/Context';
import Message from '../../models/Message';
import { HeaderTitle, Alert, AlignCJustifyC, Badge, ProfilePicture } from '../../components/UI';
import { UserProjects, UserInfos } from '../../components/User';
import { fetchData } from '../../utils/Api';

class UserProfile extends Component {
    state = { message: null, user: {}, projects: [] }

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

    onProjects = (projects) => this.setState({ projects })

    render() {
        const { userId } = this.props.match.params
        const { user, message, projects } = this.state

        const nickname = user.nickname || "User"
        return (
            <PageTitle title={`${nickname} profile`}>
                <div className="container">
                    <AlignCJustifyC className="my-5">
                        <ProfilePicture nickname={nickname} profile_picture={user.profile_picture} size={90} className="mr-4" />
                        <HeaderTitle centerTitle={false}>{nickname}</HeaderTitle>
                    </AlignCJustifyC>

                    {message && <Alert message={message} />}

                    <HeaderTitle centerTitle={false}>Informations</HeaderTitle>
                    <UserInfos user={user} />

                    <HeaderTitle centerTitle={false}>Projects <small><Badge className="ml-3">{projects.length}</Badge></small></HeaderTitle>
                    <UserProjects userId={userId} onProjects={this.onProjects} isEdit={false} />
                </div>
            </PageTitle>
        );
    }
}

export default withRouter(UserProfile);