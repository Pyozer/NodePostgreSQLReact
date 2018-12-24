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

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url)
            this.fetchUsersList()
    }

    async fetchUsersList() {
        try {
            const { url, search, onUsers } = this.props
            const result = await fetchData(url || `/api/users/`)
            const { data } = result
            let users = []
            if (data.users)
                users = data.users
            else if (data.friends)
                users = data.friends

            if (users.length === 0) {
                if (search)
                    this.setMessage(new Message(`No user found with "${search}"`, "info"))
                else
                    this.setMessage(new Message(`Empty list`, "info"))
            } else {
                this.setState({ users, message: null })
            }
            if (onUsers)
                onUsers(users)
        } catch ({ message }) {
            this.setMessage(new Message(message, "danger"))
        }
    }

    setMessage(message) {
        this.setState({ message })
    }

    getUsers(search = "") {
        const searchF = search.trim().toLowerCase()
        return this.state.users.filter(({ uuid, nickname }) =>
            uuid.includes(searchF) || nickname.toLowerCase().includes(searchF)
        )
    }

    render() {
        let { message, search } = this.state
        const users = this.getUsers(search || "")

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