import {query} from '@lib/db';
import withSession from '@lib/session';


export default withSession(async (req, res) => {
    // Retrieve all user's notes
    if (req.method === 'POST') {
        try {

            const userFromSession = req.session.get('user');
            if (!userFromSession.isLoggedIn) {
                return res.status(401).json({message: 'Could not fetch notes'});
            }

            const resultSelectNotes = await query(
                `
                    SELECT id, name, content
                    FROM notes
                    WHERE id = ANY
                          (SELECT note_id
                           FROM user_notes
                           WHERE user_id = '${userFromSession.id}')
                    ORDER BY created_at DESC;
                    `
            );
            const responseNotes = [];
            JSON.parse(JSON.stringify(resultSelectNotes)).forEach((note) => {
                responseNotes.push({
                    id: note.id,
                    name: note.name,
                    content: note.content,
                });
            });
            return res.status(200).json({message: 'Notes fetched', notes: responseNotes});
        } catch (error) {
            return res.status(500).json({message: 'Could not fetch notes'});
        }
    } else {
        return res.status(405).json({message: 'An error occurred'});
    }
});