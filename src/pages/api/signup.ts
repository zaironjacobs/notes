import {query} from '@libs/db';
import {hash} from 'bcrypt';
import withSession from '@libs/session';
import {v4 as uuidv4} from 'uuid';


export default withSession(async (req, res) => {
    // Signup user
    if (req.method === 'POST') {
        const {firstName, lastName, email, password} = req.body;
        const saltRounds = 10;
        const password_hashed = await hash(password, saltRounds);
        try {
            if (!firstName || !lastName || !email) {
                return res.status(500).json({message: 'All values are required'});
            }
            const resultInsertUser = await query(
                `
                    INSERT INTO user (id, first_name, last_name, email, password)
                    VALUES ('${uuidv4()}', '${firstName}', '${lastName}', '${email}', '${password_hashed}');
                `,
            );
            return res.status(201).json({message: 'Success'});
        } catch (error) {
            if (error.errno === 1062 || error.code === 'ER_DUP_ENTRY') {
                return res.status(500).json({message: 'This e-mail is already in use'});
            } else {
                return res.status(500).json({message: 'Could not create account'});
            }
        }
    } else {
        return res.status(405).json({message: 'Invalid method'});
    }
});