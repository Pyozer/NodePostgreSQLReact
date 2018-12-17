import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { HeaderTitle, ButtonDeleteProject, Alert } from '../../components/UI'
import { FormCard, Input } from '../../components/Form'
import { PageTitle, LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'
import Message from '../../models/Message'
import { toast } from 'react-toastify';

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

            const result = await fetchData(`/api/projects/${id}`, authToken)
            const { project } = result.data
            if (project.userId !== user.uuid) {
                toast.error('This project is no yours, you cannot edit it !')
                this.props.history.push('/')
            } else {
                this.setState({ project })
            }
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

        const result = await fetchData(
            `/api/projects/${this.state.project.id}`,
            this.context.authToken,
            JSON.stringify(data),
            'PUT'
        )
        this.setState({ project: result.data.project })

        return new Message("Your project has been successfully updated !", "success")
    }

    render() {
        const { message, project } = this.state
        const { id, name } = project

        return (
            <PageTitle title="Edit project">
                <div className="container">
                    <HeaderTitle backTo="/dashboard">Edit project</HeaderTitle>
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
                {!message && <ButtonDeleteProject className="position-fixed bottom right p-4" projectId={id} />}
            </PageTitle>
        )
    }
}
EditProject.contextType = LoginContext

export default withRouter(EditProject)