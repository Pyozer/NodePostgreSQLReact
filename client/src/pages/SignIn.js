import React, { Component } from 'react'
import { LoginContext } from '../Context';
import Input from '../components/Input';
import FormCard from '../components/FormCard';
import FullCenter from '../components/FullCenter';

class SignIn extends Component {
    state = { error: null, nickname: "", password: "" }

    onInputChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onError(error) {
        this.setState({ error: error })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultRaw = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state)
            })
            const result = await resultRaw.json()

            if (result.error) {
                this.onError(result.error.message)
            } else {
                this.context.connectUser(result.meta.token, result.data.user)
                this.props.history.push('/dashboard')
            }
        } catch (err) {
            this.onError(err.message)
        }
    }

    render() {
        const { error } = this.state
        return (
            <FullCenter className="container">
                <div className="col col-md-8 col-lg-6">
                    <FormCard title="Sign In" onSubmit={this.onSubmit} error={error}>
                        <Input label="Nickname" name="nickname" onChange={this.onInputChange} className="mt-4" />
                        <Input label="Password" name="password" type="password" onChange={this.onInputChange} className="mt-3" />
                    </FormCard>
                </div>
            </FullCenter>
        )
    }
}
SignIn.contextType = LoginContext

export default SignIn