import {query} from '@lib/db';
import withSession from '@lib/session';
import {v4 as uuidv4} from 'uuid';


export default withSession(async (req, res) => {
    // Retrieve a user's note
    if (req.method === 'POST') {

        const userFromSession = req.session.get('user');
        if (!userFromSession.isLoggedIn) {
            return res.status(500).json({message: 'Could not create note'});
        }

        const {name, content} = req.body;
        const newNoteId = uuidv4();
        try {
            const resultInsertNoteId = await query(
                `
                        INSERT INTO notes (id, name, content)
                        VALUES ('${newNoteId}', '${name}', '${content}');
                    `,
            );
            const resultInsertUserNote = await query(
                `
                    INSERT INTO user_notes (id, user_id, note_id)
                    VALUES (?, ?, ?)
                `,
                [uuidv4(), userFromSession.id, newNoteId]
            );
            return res.status(200).json({message: 'Success'});
        } catch (error) {
            return res.status(500).json({message: 'Could not create note'});
        }

    } else {
        return res.status(500).json({message: 'An error occurred'});
    }
});