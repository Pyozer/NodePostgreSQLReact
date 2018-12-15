import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext, PageTitle } from '../../utils/Context'
import { Card, HeaderTitle } from '../../components'
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { setLocalUser } from '../../utils/Storage';
import { fetchData } from '../../utils/Api';

class Dashboard extends Component {
    componentWillMount() {
        this.setState({ message: null, user: this.context.user })
        this.fetchUserData()
    }

    async fetchUserData() {
        try {
            const result = await fetchData('/api/users/me', this.context.authToken)
            const { user } = result.data
            setLocalUser(user)
            this.setState({ user })
        } catch ({ message }) {
            this.setMessage(message, "danger")
        }
    }

    setMessage(msg, type) {
        this.setState({
            message: { msg, type }
        })
    }

    render() {
        const { message, user } = this.state
        return (
            <PageTitle title="Dashboard">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <HeaderTitle title="Dashboard" />
                        <Link to="/dashboard/edit">
                            <Button>Edit profile</Button>
                        </Link>
                    </div>

                    <Alert message={message} />

                    {Object.entries(user).map(([key, value]) => (
                        <Card key={key} className="mt-4">
                            {key}<br />
                            <strong>{value}</strong>
                        </Card>
                    ))}
                </div>
            </PageTitle>
        )
    }
}
Dashboard.contextType = LoginContext

export default Dashboard