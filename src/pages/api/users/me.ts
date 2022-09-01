import { executeQuery } from '@libs/db'
import { withSessionRoute } from '@libs/with-session'
import { IUser } from '@interfaces'

export default withSessionRoute(async (req, res) => {
    // Get user
    if (req.method === 'GET') {
        const userSession = req.session.user
        if (!userSession) return res.status(401).json({ message: 'Could not fetch user info' })

        try {
            const result = (await executeQuery(
                `
                    SELECT first_name, last_name, email
                    FROM user
                    WHERE id = '${userSession.id}';
                `
            )) as any
            const resultUser = result[0]
            const user: IUser = {
                id: resultUser.id,
                firstName: resultUser.first_name,
                lastName: resultUser.last_name,
                email: resultUser.email,
            }
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ detail: 'Could not fetch user info' })
        }
    } else {
        return res.status(405).json({ detail: 'Invalid method' })
    }
})
