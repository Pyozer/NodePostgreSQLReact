import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'
import { ButtonDeleteModal } from '.'
import { toast } from 'react-toastify';

class ButtonDeleteProject extends Component {

    deleteProject = async () => {
        try {
            const { user, authToken } = this.context
            const { projectId } = this.props
            await fetchData(`/api/users/${user.uuid}/projects/${projectId}`, authToken, null, 'DELETE')
            toast.success("Project successfully deleted.");
            this.props.history.push('/dashboard')
        } catch ({ message }) {
            toast.error(message)
        }
    }

    render() {
        const { className } = this.props
        return (
            <ButtonDeleteModal onDelete={this.deleteProject} title="Delete Project" className={className}>
                <p>
                    <strong>Are you sure you want to delete this project ?</strong>
                    <br />
                    This action is irreversible, your project can not be restored
                </p>
            </ButtonDeleteModal>
        )
    }
}
ButtonDeleteProject.contextType = LoginContext

export default withRouter(ButtonDeleteProject)