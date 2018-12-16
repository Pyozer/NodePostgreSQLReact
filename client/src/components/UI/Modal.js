import React from 'react'

export const Modal = ({ title, id, children }) => (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Title`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id={`${id}Title`}>{title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <i className="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                {children}
            </div>
        </div>
    </div>
)

export const ModalBody = ({ children }) => (
    <div className="modal-body">
        {children}
    </div>
)

export const ModalFooter = ({ children }) => (
    <div className="modal-footer">
        {children}
    </div>
)

export default { Modal, ModalBody, ModalFooter }