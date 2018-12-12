import React, { Component } from 'react'
import { LoginContext, PageTitle } from '../../Context'
import { FormCard, Input, HorizontalCenter, HeaderTitle } from '../../components'

class SignUp extends Component {
    state = { error: null, nickname: "", email: "", password: "", password_confirmation: "" }

    onInputChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()

        try {
            const resultRaw = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state)
            })
            const result = await resultRaw.json()

            if (result.error) {
                this.setState({ error: result.error.message })
            } else {
                this.context.connectUser(result.meta.token, result.data.user)
                this.props.history.push('/dashboard')
            }
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        const { error } = this.state
        return (
            <PageTitle title="Sign Up">
                <HorizontalCenter className="container">
                    <HeaderTitle title="Sign Up" />
                    <div className="col col-md-8 col-lg-6">
                        <FormCard btnValue="Sign In" onSubmit={this.onSubmit} error={error}>
                        <Input label="Nickname" name="nickname" onChange={this.onInputChange} className="mt-4" />
                            <Input label="Email" name="email" type="email" onChange={this.onInputChange} className="mt-3" />
                            <Input label="Password" name="password" type="password" onChange={this.onInputChange} className="mt-3" />
                            <Input label="Password confirmation" name="password_confirmation" type="password" onChange={this.onInputChange} className="mt-3" />
                        </FormCard>
                    </div>
                </HorizontalCenter>
            </PageTitle>
        )
    }
}
SignUp.contextType = LoginContext

export default SignUp