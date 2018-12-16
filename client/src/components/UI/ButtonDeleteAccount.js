import React, { Component } from 'react'
import { LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'
import { ButtonDeleteModal } from '.'
import { toast } from 'react-toastify';

class ButtonDeleteAccount extends Component {

    deleteUserAccount = async () => {
        try {
            const { user, authToken, logoutUser } = this.context
            await fetchData(`/api/users/${user.uuid}`, authToken, null, 'DELETE')
            toast.success("Your account have been successfully deleted.");
            logoutUser()
        } catch ({ message }) {
            toast.error(message)
        }
    }

    render() {
        const { className } = this.props
        return (
            <ButtonDeleteModal onDelete={this.deleteUserAccount} title="Delete Account" className={className}>
                <p>
                    <strong>Are you sure you want to delete your account ?</strong>
                    <br />
                    This action is irreversible, your account can not be restored
                </p>
            </ButtonDeleteModal>
        )
    }
}
ButtonDeleteAccount.contextType = LoginContext

export default ButtonDeleteAccount