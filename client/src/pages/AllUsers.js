import React from 'react'
import { UsersList } from '../components/User';
import { AlignCJustifyB, HeaderTitle } from '../components/UI';
import { PageTitle } from '../utils/Context';

const AllUsers = () => (
    <PageTitle title="All Users">
        <div className="container">
            <AlignCJustifyB className="mt-3">
                <HeaderTitle title="All users" />
            </AlignCJustifyB>
            <UsersList />
        </div>
    </PageTitle>
)

export default AllUsers