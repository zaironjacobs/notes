import { executeQuery } from '@libs/db'
import { compare } from 'bcrypt'
import { withSessionRoute } from '@libs/with-session'

export default withSessionRoute(async (req, res) => {
    // Login
    if (req.method === 'POST') {
        const { email, password } = req.body
        try {
            const result = (await executeQuery(
                `
                SELECT id, first_name, last_name, email, password
                FROM user
                WHERE email = '${email}';
                `
            )) as any
            const dbUser = result[0]
            const match = await compare(password, dbUser.password)
            if (match) {
                req.session.user = {
                    id: dbUser.id,
                    firstName: dbUser.first_name,
                    lastName: dbUser.last_name,
                    email: dbUser.email,
                }
                await req.session.save()
                return res.status(200).json({})
            } else {
                return res.status(500).json({ detail: 'Login failed' })
            }
        } catch (error) {
            return res.status(500).json({ detail: 'Login failed' })
        }
    } else {
        return res.status(405).json({ detail: 'Invalid method' })
    }
})
