import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Card, Button } from '../../components/UI'
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
            const result = await fetchData(`/api/users/${userId}/projects`)
            const { projects } = result.data
            if (projects.length === 0) {
                this.setMessage(new Message("This user has no project.", "info"))
            } else {
                this.setState({ projects })
                if (this.props.onProjects)
                    this.props.onProjects(projects)
            }

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

        const isEdit = this.props.isEdit || false

        return (
            <div className="row">
                {projects.map(({ id, name, description, created_at, updated_at }) => (
                    <div key={id} className="p-2 col col-md-6 col-lg-4">
                        <Card>
                            <h4 className="font-weight-bold">{name}</h4>
                            { description }
                            <hr />
                            <p>
                                Created : <strong>{new Date(created_at).toLocaleString('fr')}</strong>
                                <br />
                                Last update : <strong>{new Date(updated_at).toLocaleString('fr')}</strong>
                            </p>
                            {isEdit && (
                                <div className="d-flex justify-content-end">
                                    <Link to={`/dashboard/editproject/${id}`}>
                                        <Button outline={true}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}

export default UserProjects