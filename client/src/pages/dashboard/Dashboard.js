import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext, PageTitle } from '../../Context'
import { Card } from '../../components'

class Dashboard extends Component {

    render() {
        return (
            <PageTitle title="Dashboard">
                <div className="container mt-5">
                    <div className="d-flex">
                        <h1 className="flex-grow-1">Dashboard</h1>
                        <div className="align-items-center">
                        <Link to="/dashboard/edit" className="btn btn-primary full-rounded px-4">Edit profile</Link>
                        </div>
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