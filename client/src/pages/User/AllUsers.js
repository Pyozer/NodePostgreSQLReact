import React, { Component } from 'react';
import { PageTitle } from '../../utils/Context';
import { AlignCJustifyB, HeaderTitle } from '../../components/UI';
import { UsersList } from '../../components/User';

class AllUsers extends Component {
    state = { users: [] }

    onUsers = (users) => this.setState({ users })

    render() {
        const { users } = this.state
        return (
            <PageTitle title="All Users">
                <div className="container">
                    <AlignCJustifyB className="mt-3">
                        <HeaderTitle>
                            All users <small><span className="badge badge-primary ml-3">{users.length}</span></small>
                        </HeaderTitle>
                    </AlignCJustifyB>
                    <UsersList onUsers={this.onUsers} />
                </div>
            </PageTitle>
        )
    }
}

export default AllUsers