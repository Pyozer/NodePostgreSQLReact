import React, { Component } from 'react';
import { PageTitle } from '../../utils/Context';
import { AlignCJustifyB, HeaderTitle, HorizontalCenter } from '../../components/UI';
import { UsersList } from '../../components/User';
import { Form, Input } from '../../components/Form';

class AllUsers extends Component {
    state = { users: [], search: "" }

    onUsers = (users) => this.setState({ users })

    onSearch = (e) => this.setState({ search: e.target.value })

    render() {
        const { users, search } = this.state
        return (
            <PageTitle title="All Users">
                <div className="container">
                    <AlignCJustifyB className="mt-3">
                        <HeaderTitle>
                            All users <small><span className="badge badge-primary ml-3">{users.length}</span></small>
                        </HeaderTitle>
                        <Input placeholder="Search user" type="text" onChange={this.onSearch} />
                    </AlignCJustifyB>
                    <UsersList onUsers={this.onUsers} search={search} />
                </div>
            </PageTitle>
        )
    }
}

export default AllUsers