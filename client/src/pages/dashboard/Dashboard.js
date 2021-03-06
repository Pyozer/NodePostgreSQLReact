import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { HeaderTitle, Button, Alert, AlignCJustifyB, Badge } from '../../components/UI'
import { UserInfos, UserProjects } from '../../components/User';
import { LoginContext, PageTitle } from '../../utils/Context'
import { setLocalUser } from '../../utils/Storage'
import { fetchData } from '../../utils/Api'
import Message from '../../models/Message';

class Dashboard extends Component {
    state = { message: null, projects: [] }
    componentWillMount() {
        this.setState({ user: this.context.user })
        this.fetchUserData()
    }

    async fetchUserData() {
        try {
            const result = await fetchData('/api/users/me', this.context.authToken)
            const { user } = result.data
            setLocalUser(user)
            this.setState({ user })
        } catch ({ message }) {
            this.setMessage(new Message(message, "danger"))
        }
    }

    setMessage(message) {
        this.setState({ message })
    }

    onProjects = projects => this.setState({projects})

    render() {
        const { message, user, projects } = this.state
        return (
            <PageTitle title="Dashboard">
                <div className="container">
                    <AlignCJustifyB>
                        <HeaderTitle>Dashboard</HeaderTitle>
                        <Link to="/dashboard/edit">
                            <Button><i className="fas fa-user-edit mr-2"></i> Edit profile</Button>
                        </Link>
                    </AlignCJustifyB>

                    <Alert message={message} />

                    <UserInfos user={user} />

                    <AlignCJustifyB className="mt-3">
                        <HeaderTitle>My Projects <small><Badge>{projects.length}</Badge></small></HeaderTitle>
                        <Link to="/dashboard/newproject">
                            <Button><i className="fas fa-plus mr-2"></i> Add project</Button>
                        </Link>
                    </AlignCJustifyB>
                    <UserProjects user={user.nickname} onProjects={this.onProjects} isEdit={true} />
                </div>
            </PageTitle>
        )
    }
}
Dashboard.contextType = LoginContext

export default Dashboard