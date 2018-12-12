import React, { Component } from 'react';


class Dashboard extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem('token')
        if (!token)
            this.props.history.push('/')
        
    }

    componentDidMount() {
        // ici
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Dashboard;