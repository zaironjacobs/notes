import { Login } from '@page-components/Login'
import { withSessionSsr } from '@libs/with-session'

export default Login

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
