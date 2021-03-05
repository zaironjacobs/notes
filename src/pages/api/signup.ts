import Filter from 'bad-words';
import {query} from '@lib/db';
import {hash} from 'bcrypt';
import withSession from "@lib/session";

const filter = new Filter();


export default withSession(async (req, res) => {
    if (req.method === 'POST') {
        const {firstName, lastName, email, password} = req.body;

        const saltRounds = 10;
        const password_hashed = await hash(password, saltRounds);

        try {
            if (!firstName || !lastName || !email) {
                return res.status(500).json({message: 'All values are required'});
            }

            const result = await query(
                `
                    INSERT INTO users (first_name, last_name, email, password)
                    VALUES (?, ?, ?, ?)
                `,
                [filter.clean(firstName), filter.clean(lastName), email, password_hashed]
            );

            return res.status(200).json({'message': 'Success'});
        } catch (error) {
            if (error.errno === 1062 || error.code === 'ER_DUP_ENTRY') {
                return res.status(500).json({message: 'This e-mail is already in use'});
            } else {
                return res.status(500).json({message: 'Could not create account'});
            }
        }
    } else {
        return res.status(405).json({message: 'Could not create account'});
    }
});