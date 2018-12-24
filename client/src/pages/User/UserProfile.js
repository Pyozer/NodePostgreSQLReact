import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { PageTitle, LoginContext } from '../../utils/Context';
import Message from '../../models/Message';
import { HeaderTitle, Alert, AlignCJustifyC, Badge, ProfilePicture, FriendButton, AlignCJustifyB } from '../../components/UI';
import { UserProjects, UserInfos, UsersList } from '../../components/User';
import { fetchData } from '../../utils/Api';

const UserProfile = ({ match }) => (
    <UserProfileContent userId={match.params.userId} />
)

class UserProfileContent extends Component {
    state = { message: null, user: null, projects: [], friends: [] }

    componentWillMount() {
        this.fetchUserData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ user: null })
            this.fetchUserData()
        }
    }

    async fetchUserData() {
        try {
            const result = await fetchData(`/api/users/${this.props.userId}`)
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
        const { user, message, projects, friends } = this.state

        if (!user) return <></>

        const nickname = user.nickname || ""
        const urlFriends = `/api/users/${user.nickname}/friends/`

        const userLogged = this.context.user
        const isFriendBtn = user.uuid && (!userLogged || (userLogged && userLogged.uuid !== user.uuid))

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
                        {isFriendBtn && <FriendButton user={user.nickname} />}
                    </AlignCJustifyB>
                    {user.uuid && <UserInfos user={user} />}

                    <HeaderTitle centerTitle={false}>Projects <small><Badge className="ml-3">{projects.length}</Badge></small></HeaderTitle>
                    <UserProjects user={user.nickname} onProjects={this.onProjects} isEdit={false} />

                    <HeaderTitle centerTitle={false}>
                        Friends <small><span className="badge badge-primary ml-3">{friends.length}</span></small>
                    </HeaderTitle>
                    {user.uuid && <UsersList onUsers={this.onFriends} url={urlFriends} />}
                </div>
            </PageTitle>
        );
    }
}
UserProfileContent.contextType = LoginContext

export default withRouter(UserProfile)