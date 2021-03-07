import {query} from '@lib/db';
import withSession from '@lib/session';


export default withSession(async (req, res) => {
    // Retrieve a user's note
    if (req.method === 'POST') {

        const userFromSession = req.session.get('user');
        if (!userFromSession.isLoggedIn) {
            return res.status(500).json({message: 'Could not fetch note'});
        }

        try {
            const noteId = req.body.id;
            const resultSelectNote = await query(
                `
                        SELECT id, name, content
                        FROM notes
                        WHERE id =
                              (SELECT note_id
                               FROM user_notes
                               WHERE user_id = '${userFromSession.id}'
                               AND note_id = '${noteId}');
                    `
            );
            const note = resultSelectNote[0];
            const responseNote = {
                id: note.id,
                name: note.name,
                content: note.content,
            };
            return res.status(200).json({message: 'Note fetched', note: responseNote});
        } catch (error) {
            return res.status(500).json({message: 'Could not fetch note'});
        }

    }

    // Delete a note
    else if (req.method === 'DELETE') {

        const userFromSession = req.session.get('user');
        if (!userFromSession.isLoggedIn) {
            return res.status(500).json({message: 'Could not fetch note'});
        }

        try {
            const noteId = req.body.id;
            const resultDeleteNote = await query(
                `
                        DELETE 
                        FROM notes
                        WHERE id =
                              (SELECT note_id
                               FROM user_notes
                               WHERE user_id = '${userFromSession.id}'
                               AND note_id = '${noteId}');
                    `
            );
            if (JSON.parse(JSON.stringify(resultDeleteNote)).affectedRows == 1) {
                return res.status(200).json({message: 'Note deleted'});
            } else {
                return res.status(500).json({message: 'Could not delete note'});
            }
        } catch (error) {
            return res.status(500).json({message: 'Could not delete note'});
        }

    } else {

        // Invalid method
        return res.status(500).json({message: 'Invalid method'});
    }
});