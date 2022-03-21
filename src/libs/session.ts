import { withIronSession } from 'next-iron-session'

const withSession = (handler) => {
    return withIronSession(handler, {
        cookieName: 'auth',
        password: process.env.SECRET,
        cookieOptions: {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600 * 24,
            path: '/',
        },
    })
}

export default withSession
