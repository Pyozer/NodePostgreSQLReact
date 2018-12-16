import React, { Component } from 'react'
import { FormCard } from '.'
import { LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'

class SignForm extends Component {
    onSubmit = async (data) => {
        const { requestUrl, history } = this.props
        const result = await fetchData(requestUrl, null, JSON.stringify(data), 'POST')
        this.context.connectUser(result.meta.token, result.data.user)
        history.push('/dashboard')
    }

    render() {
        const { btnValue, children } = this.props
        return (
            <FormCard btnValue={btnValue} onSubmit={this.onSubmit}>
                {children}
            </FormCard>
        )
    }
}
SignForm.contextType = LoginContext

export default SignForm