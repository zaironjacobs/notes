import { Notes } from '@page-components/Notes'
import { withSessionSsr } from '@libs/with-session'

export default Notes

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
