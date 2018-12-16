import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { HeaderTitle } from '../../components/UI'
import { FormCard, Input } from '../../components/Form'
import { PageTitle, LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'

class NewProject extends Component {
    onSubmit = async (data) => {
        const { user, authToken } = this.context

        await fetchData(
            `/api/users/${user.uuid}/projects`,
            authToken,
            JSON.stringify(data),
            'POST'
        )
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <PageTitle title="Add new project">
                <div className="container">
                    <HeaderTitle title="Add new project" backTo="/dashboard" />
                    <div className="d-flex justify-content-center">
                        <div className="col col-md-8 col-lg-6 ">
                            <FormCard onSubmit={this.onSubmit} btnValue="Create">
                                <Input type="text" label="Name" name="name" placeholder="Project name" />
                            </FormCard>
                        </div>
                    </div>
                </div>
            </PageTitle>
        )
    }
}
NewProject.contextType = LoginContext

export default withRouter(NewProject)