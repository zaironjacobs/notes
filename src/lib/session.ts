import {withIronSession} from 'next-iron-session';


export default function withSession(handler) {
    return withIronSession(handler, {
        cookieName: 'auth',
        password: process.env.SECRET,
        cookieOptions: {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600 * 6,
            path: '/'
        },
    });
}