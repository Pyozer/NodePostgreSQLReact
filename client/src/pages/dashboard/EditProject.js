import React, { Component } from 'react'
import { HeaderTitle, ButtonDeleteAccount } from '../../components/UI'
import { FormCard, Input } from '../../components/Form'
import { PageTitle, LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'
import Message from '../../models/Message'

class EditProject extends Component {
    constructor(props) {
        super(props)
        this.state = { project: { name: "" }, message: null }
    }
    
    componentWillMount() {
        this.fetchUserData()
    }

    async fetchUserData() {
        try {
            const { user, authToken } = this.context
            const { projectId } = this.props.match.params

            const result = await fetchData(`/api/users/${user.uuid}/projects/${projectId}`, authToken)
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
        const { projectId } = this.props.match.params

        const result = await fetchData(
            `/api/users/${user.uuid}/projects/${projectId}`,
            authToken,
            JSON.stringify(data),
            'PUT'
        )
        const { project } = result.data
        this.setState({ project })

        return new Message("Your project has been successfully updated !", "success")
    }

    render() {
        const { name } = this.state.project

        return (
            <PageTitle title="Edit project">
                <div className="container">
                    <HeaderTitle title="Edit project" backTo="/dashboard" />
                    <div className="d-flex justify-content-center">
                        <div className="col col-md-8 col-lg-6 ">
                            <FormCard onSubmit={this.onSubmit} btnValue="Update">
                                <p><small><strong>Ignore a field to not update it</strong></small></p>
                                <hr />
                                <Input type="text" label="Name" name="name" placeholder={name} defaultValue={name} />
                            </FormCard>
                        </div>
                    </div>
                </div>
                <ButtonDeleteAccount className="position-fixed bottom right p-4" />
            </PageTitle>
        )
    }
}
EditProject.contextType = LoginContext

export default EditProject