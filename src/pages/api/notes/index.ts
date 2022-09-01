import { executeQuery } from '@libs/db'
import { withSessionRoute } from '@libs/with-session'
import { v4 as uuidv4 } from 'uuid'
import { INote, INoteCreate } from '@interfaces'

export default withSessionRoute(async (req, res) => {
    // Get notes
    if (req.method === 'GET') {
        const userSession = req.session.user
        if (!userSession) return res.status(401).json({ detail: 'Could not fetch notes' })

        try {
            const page = parseInt(req.query.page as string)
            const limit = parseInt(req.query.limit as string)
            const includeContent = Boolean(req.query.includeContent as string)
            const start = page * limit - limit
            let content: string | null = 'content'
            if (!includeContent) content = null

            const result = (await executeQuery(
                `
                        SELECT id, name, ${content}
                        FROM note
                        WHERE user_id = '${userSession.id}'
                        ORDER BY created_at ASC
                        LIMIT ${start}, ${limit};
                        `
            )) as any
            const notes: INote[] = []
            result.forEach((note: any) => {
                notes.push({
                    id: note.id,
                    name: note.name,
                    content: note.content,
                    isChecked: false,
                })
            })
            return res.status(200).json(notes)
        } catch (error) {
            return res.status(500).json({ detail: 'Could not fetch notes' })
        }
    }

    // Create new note
    else if (req.method === 'POST') {
        const userSession = req.session.user
        if (!userSession) return res.status(401).json({ detail: 'Could not create notes' })

        try {
            const noteCreate: INoteCreate = req.body
            const newNoteId = uuidv4()
            await executeQuery(
                `
                    INSERT INTO note (id, user_id, name, content)
                    VALUES ('${newNoteId}', '${userSession.id}', '${noteCreate.name}', '${noteCreate.content}');
                    `
            )
            return res.status(201).json(newNoteId)
        } catch (error) {
            return res.status(500).json({ detail: 'Could not create notes' })
        }
    }

    // Invalid
    else {
        return res.status(405).json({ detail: 'Invalid method' })
    }
})

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '16mb',
        },
    },
}
