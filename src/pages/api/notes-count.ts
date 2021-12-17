import {query} from '@libs/db';
import withSession from '@libs/session';
import UserInterface from '@interfaces/User';


// Get notes count function
export async function getNotesCount(user) {
    let resultCountNotes = await query(
        `
            SELECT COUNT(id)
            FROM note
            WHERE user_id = '${user.id}';
        `
    );

    return {count: JSON.parse(JSON.stringify(resultCountNotes))[0]['COUNT(id)']};
}

export default withSession(async (req, res) => {
    // Count amount of notes a user has
    if (req.method === 'GET') {
        try {

            const userFromSession: UserInterface = req.session.get('user');
            if (!userFromSession.isLoggedIn) {
                return res.status(401).json({message: 'Could not fetch notes'});
            }

            const result = await getNotesCount(userFromSession);

            return res.status(200).json({message: 'Notes counted', count: result.count});
        } catch (error) {
            return res.status(500).json({message: 'Could not count notes'});
        }
    } else {
        return res.status(405).json({message: 'Invalid method'});
    }
});