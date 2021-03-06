import {query} from '@lib/db';
import {compare} from 'bcrypt';
import withSession from '@lib/session';


export default withSession(async (req, res) => {
    if (req.method === 'POST') {
        const {email, password} = req.body;

        try {
            const results = await query(
                `
                    SELECT *
                    FROM users
                    WHERE EMAIL = '${email}'
                `,
            );

            const user = results[0];
            const match = await compare(password, user['password']);
            if (match) {
                req.session.set('user', {isLoggedIn: true, id: user.id});
                await req.session.save();
                return res.status(200).json({message: 'Login success'});
            } else {
                return res.status(500).json({message: 'Login failed'});
            }
        } catch (error) {
            return res.status(500).json({message: 'Login failed'});
        }
    } else {
        return res.status(405).json({message: 'Only POST'});
    }
});