import React, { Component } from 'react';
import { LoginContext, PageTitle } from '../Context';
import Card from '../components/Card';

class Dashboard extends Component {

    render() {
        return (
            <PageTitle title="Dashboard">
                <div className="container mt-5">
                    {Object.entries(this.context.user).map(([key, value]) => (
                        <Card key={key} className="mt-4">
                            {key}<br />
                            <strong>{value}</strong>
                        </Card>
                    ))}
                </div>
            </PageTitle>
        );
    }
}
Dashboard.contextType = LoginContext

export default Dashboard;