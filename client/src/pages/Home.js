import React from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../utils/Context'
import { FullCenter } from '../components/UI';

const Home = () => (
    <PageTitle title="Home">
        <FullCenter className="py-5">
            <h1 className="display-3 font-weight-bold text-primary text-shadow scale-effect">Welcome !</h1>

            <div className="h3 font-weight-light text-center mt-5">
                In "All users", you can see registered users and their profile.<br />
                Each user can have projects.
                <br /><br />
                You can create your account <Link to="auth/signUp" title="Sign Up"><strong>here</strong></Link>
                <br />
                If you already have an account you can login <Link to="/auth/signIn" title="Sign In"><strong>here</strong></Link>
            </div>
        </FullCenter>
    </PageTitle>
)

export default Home