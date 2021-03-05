import {query} from "@lib/db";
import withSession from '@lib/session';


export default withSession(async (req, res) => {
    if (req.method === 'GET') {
        const user = req.session.get('user');

        try {
            const results = await query(
                `
                    SELECT first_name, last_name, email
                    FROM users
                    WHERE id = user.id
                `,
            );

            const user = results[0];
            return res.status(200).json({message: 'User info fetched', user: user});
        } catch (error) {
            return res.status(500).json({message: 'Could not fetch user info'});
        }
    } else {
        return res.status(405).json({message: 'Only GET'});
    }
});