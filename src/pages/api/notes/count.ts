import { executeQuery } from '@libs/db'
import { withSessionRoute } from '@libs/with-session'

export default withSessionRoute(async (req, res) => {
    if (req.method === 'GET') {
        try {
            const userSession = req.session.user
            if (!userSession) {
                return res.status(401).json({ detail: 'Could not fetch notes' })
            }

            const result = (await executeQuery(
                `
                SELECT COUNT(id)
                FROM note
                WHERE user_id = '${userSession.id}';
                `
            )) as any
            const count = result[0]['COUNT(id)']
            return res.status(200).json(count)
        } catch (error) {
            return res.status(500).json({ detail: 'Could not count notes' })
        }
    } else {
        return res.status(405).json({ detail: 'Invalid method' })
    }
})
