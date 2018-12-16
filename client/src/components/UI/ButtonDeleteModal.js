import React from 'react'
import { Modal, ModalBody, ModalFooter } from './Modal'
import { Button } from '.'

const ButtonDeleteModal = ({ onDelete, children, title = "Delete", className = "", btnNo = "Cancel", btnYes = "Delete"}) => {
    const modalId = `modal${title.replace(/\s/g, '')}`

    return (
        <>
            <div className={className}>
                <button
                    className="btn btn-danger btn-fab scale-effect shadow"
                    title={title}
                    data-toggle="modal"
                    data-target={`#${modalId}`}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>

            <Modal title={title} id={modalId}>
                <ModalBody>
                    { children }
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" outline={true} data-dismiss="modal">{btnNo}</Button>
                    <Button variant="danger" data-dismiss="modal" onClick={onDelete}>{btnYes}</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ButtonDeleteModal