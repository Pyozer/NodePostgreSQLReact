import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { HeaderTitle, ButtonDeleteProject, Alert } from '../../components/UI'
import { FormCard, Input } from '../../components/Form'
import { PageTitle, LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'
import Message from '../../models/Message'

class EditProject extends Component {
    constructor(props) {
        super(props)
        const { projectId } = this.props.match.params
        this.state = {
            project: { id: projectId, name: "" },
            message: null
        }
    }

    componentWillMount() {
        this.fetchUserData()
    }

    async fetchUserData() {
        try {
            const { user, authToken } = this.context
            const { id } = this.state.project

            const result = await fetchData(`/api/users/${user.uuid}/projects/${id}`, authToken)
            const { project } = result.data
            this.setState({ project })
        } catch ({ message }) {
            this.setMessage(new Message(message, "danger"))
        }
    }

    setMessage(message) {
        this.setState({ message })
    }

    onSubmit = async (data) => {
        if (Object.keys(data).length === 0)
            throw new Error("You must provide at least one modification to update your project !")

        const { user, authToken } = this.context
        const { id } = this.state.project

        const result = await fetchData(
            `/api/users/${user.uuid}/projects/${id}`,
            authToken,
            JSON.stringify(data),
            'PUT'
        )
        const { project } = result.data
        this.setState({ project })

        return new Message("Your project has been successfully updated !", "success")
    }

    render() {
        const { message, project } = this.state
        const { id, name } = project

        return (
            <PageTitle title="Edit project">
                <div className="container">
                    <HeaderTitle title="Edit project" backTo="/dashboard" />
                    <div className="d-flex justify-content-center">
                        <div className="col col-md-8 col-lg-6 ">
                            {message
                                ? <Alert message={message} />
                                : (
                                    <FormCard onSubmit={this.onSubmit} btnValue="Update">
                                        <p><small><strong>Ignore a field to not update it</strong></small></p>
                                        <hr />
                                        <Input type="text" label="Name" name="name" placeholder={name} defaultValue={name} />
                                    </FormCard>
                                )}
                        </div>
                    </div>
                </div>
                <ButtonDeleteProject className="position-fixed bottom right p-4" projectId={id} />
            </PageTitle>
        )
    }
}
EditProject.contextType = LoginContext

export default withRouter(EditProject)