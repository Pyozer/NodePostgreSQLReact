import React, { Component } from 'react'
import { FormCard, Input, HeaderTitle } from '../../components'
import { PageTitle, LoginContext } from '../../Context'

class EditProfile extends Component {
    state = { error: null }

    onSubmit = (e) => {

    }

    render() {
        const { error } = this.state
        return (
            <PageTitle title="Edit profile">
                <div className="container">
                    <HeaderTitle title="Edit profile" backTo="/dashboard" />
                    <div className="d-flex justify-content-center">
                        <div className="col col-md-8 col-lg-6 ">
                            <LoginContext.Consumer>
                                {({ user }) => (
                                    <FormCard error={error} onSubmit={this.onSubmit} btnValue="Update">
                                        <Input type="text" label="Nickname" name="nickname" value={user.nickname} />
                                        <Input type="email" label="Email" name="email" value={user.email} />
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

export default EditProfile