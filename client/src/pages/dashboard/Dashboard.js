import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext, PageTitle } from '../../Context'
import { Card, HeaderTitle } from '../../components'
import Button from '../../components/Button';

class Dashboard extends Component {

    render() {
        return (
            <PageTitle title="Dashboard">
                <div className="container mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <HeaderTitle title="Dashboard" />
                        <Link to="/dashboard/edit">
                            <Button>Edit profile</Button>
                        </Link>
                    </div>

                    {Object.entries(this.context.user).map(([key, value]) => (
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