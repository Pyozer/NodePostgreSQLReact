import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import { HeaderTitle } from '../../components/UI'
import { FormCard, ProjectInputs } from '../../components/Form'
import { PageTitle, LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'

class NewProject extends Component {
    onSubmit = async (data) => {
        const { authToken } = this.context

        await fetchData(
            `/api/projects`,
            authToken,
            JSON.stringify(data),
            'POST'
        )
        toast.success(`Project "${data.name}" successfully created`);
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <PageTitle title="Add new project">
                <div className="container">
                    <HeaderTitle backTo="/dashboard">Add new project</HeaderTitle>
                    <div className="d-flex justify-content-center">
                        <div className="col col-md-8 col-lg-6 ">
                            <FormCard onSubmit={this.onSubmit} btnValue="Create">
                                <ProjectInputs />
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