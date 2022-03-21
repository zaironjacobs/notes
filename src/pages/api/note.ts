import { query } from '@libs/db'
import withSession from '@libs/session'
import { v4 as uuidv4 } from 'uuid'
import NoteInterface from '@interfaces/Note'
import UserInterface from '@interfaces/User'

export default withSession(async (req, res) => {
    // Retrieve a user note
    if (req.method === 'GET') {
        const userFromSession: UserInterface = req.session.get('user')
        if (!userFromSession.isLoggedIn) {
            return res.status(401).json({ message: 'Could not fetch note' })
        }

        try {
            const noteId: string = req.query.id
            const resultSelectNote = await query(
                `
                    SELECT id, name, content
                    FROM note
                    WHERE id = '${noteId}'
                      AND user_id = '${userFromSession.id}';
                `
            )
            const note = resultSelectNote[0]
            const responseNote: NoteInterface = {
                id: note.id,
                name: note.name,
                content: note.content,
                isChecked: false,
            }
            return res.status(200).json({ message: 'Note fetched', note: responseNote })
        } catch (error) {
            return res.status(500).json({ message: 'Could not fetch note' })
        }
    }

    // Delete a user note
    else if (req.method === 'DELETE') {
        const userFromSession: UserInterface = req.session.get('user')
        if (!userFromSession.isLoggedIn) {
            return res.status(401).json({ message: 'Could not delete note' })
        }

        try {
            const noteIds = req.body.noteIds

            for (const noteId of noteIds) {
                const resultDeleteNote = await query(
                    `
                        DELETE
                        FROM note
                        WHERE id = '${noteId}'
                          AND user_id = '${userFromSession.id}';
                    `
                )
                if (JSON.parse(JSON.stringify(resultDeleteNote)).affectedRows !== 1) {
                    return res.status(500).json({ message: 'Error deleting note(s)' })
                }
            }
            return res.status(200).json({ message: 'Note(s) deleted' })
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting note(s)' })
        }
    }

    // Update a user note
    else if (req.method === 'PUT') {
        const userFromSession: UserInterface = req.session.get('user')
        if (!userFromSession.isLoggedIn) {
            return res.status(401).json({ message: 'Could not update note' })
        }

        try {
            const note: NoteInterface = req.body.note
            const resultUpdateNote = await query(
                `
                    UPDATE note
                    SET name    = '${note.name}',
                        content = '${note.content}'
                    WHERE id = '${note.id}'
                      AND user_id = '${userFromSession.id}';
                `
            )
            if (JSON.parse(JSON.stringify(resultUpdateNote)).affectedRows == 1) {
                return res.status(201).json({ message: 'Note updated' })
            } else {
                return res.status(500).json({ message: 'Could not update note' })
            }
        } catch (error) {
            return res.status(500).json({ message: 'Could not update note' })
        }
    }

    // Create a new note
    else if (req.method === 'POST') {
        const userFromSession: UserInterface = req.session.get('user')
        if (!userFromSession.isLoggedIn) {
            return res.status(401).json({ message: 'Could not create note' })
        }

        try {
            const { name, content } = req.body
            const newNoteId = uuidv4()
            const resultInsertNoteId = await query(
                `
                    INSERT INTO note (id, user_id, name, content)
                    VALUES ('${newNoteId}', '${userFromSession.id}', '${name}', '${content}');
                `
            )
            return res.status(201).json({ message: 'Success', id: newNoteId })
        } catch (error) {
            return res.status(500).json({ message: 'Could not create note' })
        }
    } else {
        // Invalid method
        return res.status(405).json({ message: 'Invalid method' })
    }
})

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '16mb',
        },
    },
}
