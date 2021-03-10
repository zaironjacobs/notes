import {query} from '@lib/db';
import withSession from '@lib/session';
import {v4 as uuidv4} from 'uuid';


export default withSession(async (req, res) => {
    // Create a new note
    if (req.method === 'POST') {

        const userFromSession = req.session.get('user');
        if (!userFromSession.isLoggedIn) {
            return res.status(401).json({message: 'Could not create note'});
        }

        try {
            const {name, content} = req.body;
            const newNoteId = uuidv4();
            const resultInsertNoteId = await query(
                `
                        INSERT INTO notes (id, name, content)
                        VALUES ('${newNoteId}', '${name}', '${content}');
                    `,
            );
            const newUserNotesId = uuidv4();
            const resultInsertUserNote = await query(
                `
                    INSERT INTO user_notes (id, user_id, note_id)
                    VALUES (?, ?, ?)
                `,
                [newUserNotesId, userFromSession.id, newNoteId]
            );
            return res.status(201).json({message: 'Success', id: newNoteId});
        } catch (error) {
            return res.status(500).json({message: 'Could not create note'});
        }
    } else {

        // Invalid method
        return res.status(405).json({message: 'Invalid method'});
    }
});