import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Card, ProfilePicture } from '../UI'
import { fetchData } from '../../utils/Api'
import Message from '../../models/Message';

class UsersList extends Component {
    state = { message: null, users: [] }

    componentWillMount() {
        this.fetchUsersList()
    }

    async fetchUsersList() {
        try {
            const result = await fetchData(this.props.url || `/api/users/`)
            let users = []
            if (result.data.users)
                users = result.data.users
            else if (result.data.friends)
                users = result.data.friends

            if (users.length === 0) {
                if (this.props.search)
                    this.setMessage(new Message(`No user found with "${this.props.search}"`, "info"))
                else
                    this.setMessage(new Message(`No user found`, "info"))
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

        if (message) return <Alert message={message} />

        return <div className="row">
            {users.map(({ uuid, nickname, profile_picture }) => (
                <div key={uuid} className="p-2 col col-md-6 col-lg-4">
                    <Link to={`/users/${nickname}`} className="no-decoration">
                        <Card className="scale-effect">
                            <div className="d-flex align-items-center">
                                <ProfilePicture nickname={nickname} profile_picture={profile_picture} size={50} />
                                <h5 className="ml-3">{nickname}</h5>
                            </div>
                        </Card>
                    </Link>
                </div>
            ))}
        </div>
    }
}

export default UsersList