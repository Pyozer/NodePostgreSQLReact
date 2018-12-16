import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext, PageTitle } from '../../utils/Context'
import { Card, HeaderTitle } from '../../components'
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { setLocalUser } from '../../utils/Storage';
import { fetchData } from '../../utils/Api';

class InfoRender {
    constructor(title, render) {
        this.title = title
        this.render = render
    }
}

class Dashboard extends Component {
    componentWillMount() {
        this.setState({ message: null, user: this.context.user })
        this.fetchUserData()
    }

    async fetchUserData() {
        try {
            const result = await fetchData('/api/users/me', this.context.authToken)
            const { user } = result.data
            setLocalUser(user)
            this.setState({ user })
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
        const { message, user } = this.state

        const info = {
            'nickname': new InfoRender("Nickname", () => user.nickname),
            'email': new InfoRender("Email", () => user.email),
            'createdAt': new InfoRender("Date de création", () => new Date(user.createdAt).toLocaleString('fr-FR')),
            'updatedAt': new InfoRender("Dernière modification", () => new Date(user.updatedAt).toLocaleString('fr-FR')),
        }

        return (
            <PageTitle title="Dashboard">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <HeaderTitle title="Dashboard" />
                        <Link to="/dashboard/edit">
                            <Button>Edit profile</Button>
                        </Link>
                    </div>

                    <Alert message={message} />

                    <div className="row">
                        {Object.entries(info).map(([key, value]) => (
                            <div key={key} className="p-2 col col-md-6 col-lg-4">
                                <Card>
                                    {value.title}<br />
                                    <strong>{value.render()}</strong>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
            </PageTitle>
        )
    }
}
Dashboard.contextType = LoginContext

export default Dashboard