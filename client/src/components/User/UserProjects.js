import React, { Component } from 'react'
import { Alert, Card } from '../../components/UI'
import { LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'
import Message from '../../models/Message';

class UserProjects extends Component {
    state = { message: null, projects: [] }
    componentWillMount() {
        this.fetchUserProjects()
    }

    async fetchUserProjects() {
        try {
            const { userId } = this.props
            const result = await fetchData(`/api/users/${userId}/projects`, this.context.authToken)
            const { projects } = result.data
            this.setState({ projects })
            if (projects.length === 0)
                this.setMessage(new Message("This user has no project.", "info"))
        } catch ({ message }) {
            this.setMessage(new Message(message, "danger"))
        }
    }

    setMessage(message) {
        this.setState({ message })
    }

    render() {
        const { message, projects } = this.state

        if (message) return <Alert message={message} />

        return (
            <div className="row">
                {projects.map(project => (
                    <div key={project.id} className="p-2 col col-md-6 col-lg-4">
                        <Card>
                            <h5>{project.name}</h5>
                            <hr />
                            Created: <strong>{new Date(project.createdAt).toLocaleString('fr')}</strong>
                            <br />
                            Last update: <strong>{new Date(project.updatedAt).toLocaleString('fr')}</strong>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}
UserProjects.contextType = LoginContext

export default UserProjects