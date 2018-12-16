import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter } from './Modal'
import { LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'
import { Button } from '.'

class ButtonDeleteAccount extends Component {

    deleteUserAccount = async () => {
        try {
            const { user, authToken, logoutUser } = this.context
            await fetchData(`/api/users/${user.uuid}`, authToken, null, 'DELETE')
            logoutUser()
        } catch ({ message }) {
            alert(message)
        }
    }

    render() {
        const { className } = this.props
        return (
            <>
                <div className={className || ""}>
                    <button
                        className="btn btn-danger btn-fab scale-effect shadow"
                        title="Delete account"
                        data-toggle="modal"
                        data-target="#modalDeleteAccount">
                        <i className="far fa-trash-alt"></i>
                    </button>
                </div>

                <Modal title="Delete Account" id="modalDeleteAccount">
                    <ModalBody>
                        <p>
                            <strong>Are you sure you want to delete your account ?</strong>
                            <br />
                            This action is irreversible, your account can not be restored
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" outline={true} data-dismiss="modal">Cancel</Button>
                        <Button variant="danger" data-dismiss="modal" onClick={this.deleteUserAccount}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
ButtonDeleteAccount.contextType = LoginContext

export default ButtonDeleteAccount