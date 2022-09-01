import React from 'react'
import { withSessionSsr } from '@libs/with-session'
import { Note } from '@page-components/Note'

export default Note

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
    const user = req.session.user

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return { props: {} }
})
