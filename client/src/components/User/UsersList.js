import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Card } from '../UI'
import { fetchData } from '../../utils/Api'
import Message from '../../models/Message';
import ReactAvatar from 'react-avatar';

class UsersList extends Component {
    state = { message: null, users: [] }

    componentWillMount() {
        this.fetchUsersList()
    }

    async fetchUsersList() {
        try {
            const result = await fetchData(`/api/users/`)
            const { users } = result.data
            if (users.length === 0) {
                this.setMessage(new Message("There is no users", "info"))
            } else {
                this.setState({ users })
                if (this.props.onUsers)
                    this.props.onUsers(users)
            }
        } catch ({ message }) {
            this.setMessage(new Message(message, "danger"))
        }
    }

    setMessage(message) {
        this.setState({ message })
    }

    getUsers() {
        let { state, props } = this
        const search = (props.search || "").trim().toLowerCase()
        return state.users.filter(({ uuid, nickname }) =>
            uuid.includes(search) || nickname.toLowerCase().includes(search)
        )
    }

    render() {
        let { message } = this.state
        const users = this.getUsers()

        if (users.length === 0)
            message = new Message(`No user found with "${this.props.search}"`, "info")

        if (message) return <Alert message={message} />

        return (
            <div className="row">
                {users.map(({ uuid, nickname }) => (
                    <div key={uuid} className="p-2 col col-md-6 col-lg-4">
                        <Link to={`/users/${nickname}`} className="no-decoration">
                            <Card className="scale-effect">
                                <div className="d-flex align-items-center">
                                    <ReactAvatar name={nickname} round={true} size={50} />
                                    <h5 className="ml-3">{nickname}</h5>
                                </div>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}

export default UsersList