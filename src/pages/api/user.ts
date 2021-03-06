import {query} from '@lib/db';
import withSession from '@lib/session';


export default withSession(async (req, res) => {
    if (req.method === 'GET') {
        const user_session = req.session.get('user');
        if (user_session) {
            try {
                const results = await query(
                    `
                        SELECT first_name, last_name, email
                        FROM users
                        WHERE id = ${user_session.id}
                    `
                );
                const user = results[0];
                user.isLoggedIn = true;
                return res.status(200).json(user);
            } catch (error) {
                return res.status(500).json({message: 'Could not fetch user info'});
            }
        } else {
            res.json({isLoggedIn: false});
        }
    } else {
        return res.status(405).json({message: 'Only GET'});
    }
});