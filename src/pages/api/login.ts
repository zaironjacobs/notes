import {query} from '@libs/db';
import {compare} from 'bcrypt';
import withSession from '@libs/session';
import UserInterface from '@interfaces/User';


export default withSession(async (req, res) => {
    if (req.method === 'POST') {
        const {email, password} = req.body;
        try {
            const results = await query(
                `
                    SELECT id, first_name, last_name, email, password
                    FROM user
                    WHERE email = '${email}';
                `,
            );
            const user = results[0];
            const match = await compare(password, user['password']);
            if (match) {
                const responseUser: UserInterface = {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    isLoggedIn: true
                };
                req.session.set('user', responseUser);
                await req.session.save();
                return res.status(200).json({message: 'Login success'});
            } else {
                return res.status(500).json({message: 'Login failed'});
            }
        } catch (error) {
            return res.status(500).json({message: 'Login failed'});
        }
    } else {
        return res.status(405).json({message: 'Invalid method'});
    }
});