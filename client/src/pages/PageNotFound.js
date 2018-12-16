import React from 'react'
import { PageTitle } from '../utils/Context'
import { FullCenter, HeaderTitle } from '../components/UI';

const PageNotFound = () => (
    <PageTitle title="Page Not Found">
        <FullCenter>
            <HeaderTitle title="Page not found !" />
        </FullCenter>
    </PageTitle>
)

export default PageNotFound