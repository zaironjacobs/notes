import {query} from '@lib/db';
import withSession from '@lib/session';
import UserInterface from '@interface/User';


export default withSession(async (req, res) => {
    // Count amount of notes a user has
    if (req.method === 'GET') {
        try {

            const userFromSession: UserInterface = req.session.get('user');
            if (!userFromSession.isLoggedIn) {
                return res.status(401).json({message: 'Could not fetch notes'});
            }

            let resultCountNotes = await query(
                `
                    SELECT COUNT(id)
                    FROM notes
                    WHERE id = ANY
                          (SELECT note_id
                           FROM user_notes
                           WHERE user_id = '${userFromSession.id}');
                   `
            );
            resultCountNotes = JSON.parse(JSON.stringify(resultCountNotes))[0]['COUNT(id)']
            return res.status(200).json({message: 'Notes counted', amount: resultCountNotes});
        } catch (error) {
            return res.status(500).json({message: 'Could not count notes'});
        }
    } else {
        return res.status(405).json({message: 'Invalid method'});
    }
});