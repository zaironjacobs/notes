import { executeQuery } from '@libs/db'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { withSessionRoute } from '@libs/with-session'
import { IUserCreate } from '@interfaces'

export default withSessionRoute(async (req, res) => {
    if (req.method === 'POST') {
        const userCreate: IUserCreate = req.body.userCreate
        const saltRounds = 10
        const passwordHashed = await hash(userCreate.password, saltRounds)
        try {
            await executeQuery(
                `
                INSERT INTO user (id, first_name, last_name, email, password)
                VALUES (
                '${uuidv4()}', 
                '${userCreate.firstName}', 
                '${userCreate.lastName}', 
                '${userCreate.email}', 
                '${passwordHashed}');
                `
            )
            return res.status(201).json({})
        } catch (error: any) {
            if (error.errno === 1062 || error.code === 'ER_DUP_ENTRY') {
                return res.status(500).json({ detail: 'This e-mail is already in use' })
            } else {
                return res.status(500).json({ detail: 'Could not create account' })
            }
        }
    } else {
        return res.status(405).json({ detail: 'Invalid method' })
    }
})
