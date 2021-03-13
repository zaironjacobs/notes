import {query} from '@lib/db';
import withSession from '@lib/session';
import UserInterface from '@interface/User';


export default withSession(async (req, res) => {
    // Fetch user
    if (req.method === 'POST') {

        const userFromSession = req.session.get('user');
        if (!userFromSession.isLoggedIn) {
            return res.status(401).json({message: 'Could not fetch user info'});
        }

        try {
            const resultSelectUser = await query(
                `
                        SELECT first_name, last_name, email
                        FROM users
                        WHERE id = '${userFromSession.id}';
                    `
            );
            const user = resultSelectUser[0];
            const responseUser: UserInterface = {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                isLoggedIn: true,
            };
            return res.status(200).json({message: 'User info fetched', user: responseUser});
        } catch (error) {
            return res.status(500).json({message: 'Could not fetch user info'});
        }
    } else {
        return res.status(405).json({message: 'Invalid method'});
    }
});