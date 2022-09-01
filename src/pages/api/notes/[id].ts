import { executeQuery } from '@libs/db'
import { withSessionRoute } from '@libs/with-session'
import { INote, INoteUpdate } from '@interfaces'

export default withSessionRoute(async (req, res) => {
    // Get note
    if (req.method === 'GET') {
        const userSession = req.session.user
        if (!userSession) return res.status(401).json({ detail: 'Could not fetch notes' })

        const { id } = req.query
        try {
            const result = (await executeQuery(
                `
                    SELECT id, name, content
                    FROM note
                    WHERE id = '${id}'
                      AND user_id = '${userSession.id}';
                `
            )) as any
            const resultNote = result[0]
            const note: INote = {
                id: resultNote.id,
                name: resultNote.name,
                content: resultNote.content,
                isChecked: false,
            }
            return res.status(200).json(note)
        } catch (error) {
            return res.status(500).json({ detail: 'Could not fetch notes' })
        }
    }

    // Delete note
    else if (req.method === 'DELETE') {
        const userSession = req.session.user
        if (!userSession) return res.status(401).json({ detail: 'Could not delete notes' })

        try {
            const { id } = req.query
            const result = await executeQuery(
                `
                        DELETE
                        FROM note
                        WHERE id = '${id}'
                          AND user_id = '${userSession.id}';
                    `
            )
            if (JSON.parse(JSON.stringify(result)).affectedRows !== 1) {
                return res.status(500).json({ detail: 'Error deleting notes' })
            }
            return res.status(200).json({})
        } catch (error) {
            return res.status(500).json({ detail: 'Error deleting notes' })
        }
    }

    // Update note
    else if (req.method === 'PUT') {
        const userSession = req.session.user
        if (!userSession) return res.status(401).json({ detail: 'Could not update note' })

        try {
            const { id } = req.query
            const noteUpdate: INoteUpdate = req.body
            const result = (await executeQuery(
                `
                    UPDATE note
                    SET name    = '${noteUpdate.name}',
                        content = '${noteUpdate.content}'
                    WHERE id = '${id}'
                      AND user_id = '${userSession.id}';
                `
            )) as any
            if (result.affectedRows === 1) {
                return res.status(201).json({})
            } else {
                return res.status(500).json({ detail: 'Could not update note' })
            }
        } catch (error) {
            return res.status(500).json({ detail: 'Could not update note' })
        }
    }

    // Invalid
    else {
        return res.status(405).json({ detail: 'Invalid method' })
    }
})
