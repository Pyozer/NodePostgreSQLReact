import React, { Component } from 'react'
import { Alert, Button } from '../UI'
import Message from '../../models/Message'

class Form extends Component {
    state = { message: null }

    onSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = {}
        for (let [key, rawVal] of formData.entries()) {
            const val = rawVal.trim()
            if (val.length > 0)
                data[key] = val
        }

        try {
            const resultMsg = await this.props.onSubmit(data)
            if (resultMsg)
                this.setMessage(resultMsg)
        } catch ({ message }) {
            this.setMessage(new Message(message, "danger"))
        }
    }

    setMessage(message) {
        this.setState({ message })
    }

    render() {
        const { message } = this.state
        const { children, submitBtn } = this.props
        return (
            <form onSubmit={this.onSubmit}>
                {message && <Alert message={message} />}

                {children}

                {submitBtn && (
                    <div className="row justify-content-center mt-4">
                        <div className="col col-md-8 col-lg-6 col-xl-4">
                            <Button type="submit" className="btn-block">{submitBtn}</Button>
                        </div>
                    </div>
                )}
            </form>
        )
    }
}

export default Form