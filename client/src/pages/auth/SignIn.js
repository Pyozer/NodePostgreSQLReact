import React, { Component } from 'react'
import { LoginContext, PageTitle } from '../../Context'
import { Input, FormCard, HeaderTitle, HorizontalCenter } from '../../components'

class SignIn extends Component {
    state = { message: null, nickname: "", password: "" }

    onInputChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()

        try {
            const resultRaw = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state)
            })
            const result = await resultRaw.json()

            if (result.error) {
                this.setMessage(result.error.message, "danger")
            } else {
                this.context.connectUser(result.meta.token, result.data.user)
                this.props.history.push('/dashboard')
            }
        } catch ({ message }) {
            this.setMessage(message, "danger")
        }
    }

    setMessage(msg, type) {
        this.setState({
            message: { msg, type }
        })
    }

    render() {
        const { message } = this.state
        return (
            <PageTitle title="Sign In">
                <HorizontalCenter className="container">
                    <HeaderTitle title="Sign In" />
                    <div className="col col-md-8 col-lg-6">
                        <FormCard btnValue="Sign In" onSubmit={this.onSubmit} message={message}>
                            <Input label="Nickname" name="nickname" onChange={this.onInputChange} className="mt-4" />
                            <Input label="Password" name="password" type="password" onChange={this.onInputChange} className="mt-3" />
                        </FormCard>
                    </div>
                </HorizontalCenter>
            </PageTitle>
        )
    }
}
SignIn.contextType = LoginContext

export default SignIn