import React, { Component } from 'react'
import { HeaderTitle, ButtonDeleteAccount } from '../../components/UI'
import { FormCard, Input } from '../../components/Form'
import { PageTitle, LoginContext } from '../../utils/Context'
import { fetchData } from '../../utils/Api'
import Message from '../../models/Message'

class EditProfile extends Component {
    onSubmit = async (data) => {
        if (Object.keys(data).length === 0)
            throw new Error("You must provide at least one modification to update your profile !")

        const result = await fetchData(`/api/users/${this.context.user.uuid}`, this.context.authToken, JSON.stringify(data), 'PUT')
        this.context.updateUser(result.data.user)
        return new Message("Your profile has been successfully updated !", "success")
    }

    render() {
        return (
            <PageTitle title="Edit profile">
                <div className="container">
                    <HeaderTitle backTo="/dashboard">Edit profile</HeaderTitle>
                    <div className="d-flex justify-content-center">
                        <div className="col col-md-8 col-lg-6 ">
                            <LoginContext.Consumer>
                                {({ user }) => (
                                    <FormCard onSubmit={this.onSubmit} btnValue="Update">
                                        <p><small><strong>Ignore a field to not update it</strong></small></p>
                                        <hr />
                                        <Input type="text" label="Nickname" name="nickname" defaultValue={user.nickname} />
                                        <Input type="email" label="Email" name="email" defaultValue={user.email} />
                                        <Input type="password" label="Password" name="password" placeholder="Leave blank to ignore" />
                                        <Input type="password" label="Password confirmation" name="password_confirmation" placeholder="Leave blank to ignore" />
                                    </FormCard>
                                )}
                            </LoginContext.Consumer>
                        </div>
                    </div>
                </div>
                <ButtonDeleteAccount className="position-fixed bottom right p-4" />
            </PageTitle>
        )
    }
}
EditProfile.contextType = LoginContext

export default EditProfile