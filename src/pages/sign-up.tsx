import React from 'react'
import { SignUp } from '@page-components/SignUp'
import { withSessionSsr } from '@libs/with-session'

export default SignUp

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
    const user = req.session.user

    if (user) {
        return {
            redirect: {
                destination: '/notes',
                permanent: false,
            },
        }
    }

    return { props: {} }
})
