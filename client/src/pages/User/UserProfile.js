import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { PageTitle, LoginContext } from '../../utils/Context';
import Message from '../../models/Message';
import { HeaderTitle, Alert, AlignCJustifyC, Badge, ProfilePicture, FriendButton, AlignCJustifyB } from '../../components/UI';
import { UserProjects, UserInfos, UsersList } from '../../components/User';
import { fetchData } from '../../utils/Api';

class UserProfile extends Component {
    state = { message: null, user: {}, projects: [], friends: [] }

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
    onFriends = (friends) => this.setState({ friends })

    render() {
        const { userId } = this.props.match.params
        const { user, message, projects, friends } = this.state

        const nickname = user.nickname || ""
        const urlFriends = `/api/users/${user.nickname}/friends/`

        const userConnected = this.context.user

        return (
            <PageTitle title={`${nickname} profile`}>
                <div className="container">
                    <AlignCJustifyC className="my-5">
                        <ProfilePicture nickname={nickname} profile_picture={user.profile_picture} size={90} className="mr-4" />
                        <HeaderTitle centerTitle={false}>{nickname}</HeaderTitle>
                    </AlignCJustifyC>

                    {message && <Alert message={message} />}

                    <AlignCJustifyB>
                        <HeaderTitle centerTitle={false}>Informations</HeaderTitle>
                        {user.uuid && userConnected.uuid !== user.uuid && <FriendButton user={user.uuid} />}
                    </AlignCJustifyB>
                    {user.uuid && <UserInfos user={user} />}

                    <HeaderTitle centerTitle={false}>Projects <small><Badge className="ml-3">{projects.length}</Badge></small></HeaderTitle>
                    <UserProjects userId={userId} onProjects={this.onProjects} isEdit={false} />

                    <HeaderTitle centerTitle={false}>
                        Friends <small><span className="badge badge-primary ml-3">{friends.length}</span></small>
                    </HeaderTitle>
                    {user.uuid && <UsersList onUsers={this.onFriends} url={urlFriends} />}
                </div>
            </PageTitle>
        );
    }
}
UserProfile.contextType = LoginContext

export default withRouter(UserProfile);