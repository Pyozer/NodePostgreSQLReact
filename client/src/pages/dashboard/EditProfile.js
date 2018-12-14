import React, { Component } from 'react'
import { FormCard, Input, HeaderTitle } from '../../components'
import { PageTitle, LoginContext } from '../../Context'

class EditProfile extends Component {
    state = { message: null }

    onSubmit = async (e) => {
        e.preventDefault()

        const user = {}

        for (let [name, value] of new FormData(e.target).entries())
            if (value.trim().length > 0)
                user[name] = value.trim()

        if (Object.keys(user).length === 0) {
            this.setMessage("You must provide at least one modification to update your profile !", "danger")
            return
        }

        try {
            const resultRaw = await fetch(`/api/users/${this.context.user.uuid}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.context.authToken}`
                },
                body: JSON.stringify(user)
            })
            const result = await resultRaw.json()

            if (result.error) {
                this.setMessage(result.error.message, "danger")
            } else {
                this.context.updateUser(result.data.user)
                this.setMessage("Your profile has been successfully updated !", "success")
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
            <PageTitle title="Edit profile">
                <div className="container">
                    <HeaderTitle title="Edit profile" backTo="/dashboard" />
                    <div className="d-flex justify-content-center">
                        <div className="col col-md-8 col-lg-6 ">
                            <LoginContext.Consumer>
                                {({ user }) => (
                                    <FormCard message={message} onSubmit={this.onSubmit} btnValue="Update">
                                        <p><small><strong>Ignore a field to not update it</strong></small></p>
                                        <hr />
                                        <Input type="text" label="Nickname" name="nickname" placeholder={user.nickname} />
                                        <Input type="email" label="Email" name="email" placeholder={user.email} />
                                        <Input type="password" label="Password" name="password" placeholder="Leave blank to ignore" />
                                        <Input type="password" label="Password confirmation" name="password_confirmation" placeholder="Leave blank to ignore" />
                                    </FormCard>
                                )}
                            </LoginContext.Consumer>
                        </div>
                    </div>
                </div>
            </PageTitle >
        )
    }
}
EditProfile.contextType = LoginContext

export default EditProfile