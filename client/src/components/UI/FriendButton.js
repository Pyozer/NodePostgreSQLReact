import React, { Component } from 'react';
import Button from './Button';
import { LoginContext } from '../../utils/Context';
import { fetchData } from '../../utils/Api';
import { toast } from 'react-toastify';

class FriendButton extends Component {
    state = { isFriend: null }

    componentWillMount() {
        this.checkFriendships()
    }

    async checkFriendships() {
        try {
            const { user } = this.context
            const result = await fetchData(`/api/users/${user.nickname}/friends/${this.props.user}`)
            const isFriend = result.data.friend ? true : false
            this.setState({ isFriend })
        } catch ({ message }) {
            toast.error(message)
        }
    }

    addFriend = async () => {
        try {
            const { user: friendIdentifier } = this.props
            const { user, authToken } = this.context
            const result = await fetchData(
                `/api/users/${user.nickname}/friends`,
                authToken,
                JSON.stringify({ friendIdentifier }),
                'POST'
            )
            const isFriend = result.data.friend ? true : false
            this.setState({ isFriend })
            if (isFriend)
                toast.success(`${user.nickname} is now your friend !`)
            else
                toast.success(`${user.nickname} has been deleted from your friend list !`)
        } catch ({ message }) {
            toast.error(message)
        }
    }

    render() {
        const { isFriend } = this.state

        if (isFriend === null)
            return <></>

        return <Button variant={isFriend ? 'danger' : 'primary'} outline={isFriend} onClick={this.addFriend}>
            {isFriend ? 'Remove Friend' : 'Add Friend'}
        </Button>
    }
}
FriendButton.contextType = LoginContext

export default FriendButton;