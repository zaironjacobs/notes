import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import Filter from 'bad-words';
import {query} from '@lib/db';
import {hash} from 'bcrypt';


const filter = new Filter();

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {firstName, lastName, email, password} = req.body;

    const password_hashed = await hash(password, 10);

    try {
        if (!firstName || !lastName || !email) {
            return res.status(400).json({message: 'All values are required'});
        }

        const results = await query(
            `
                INSERT INTO users (first_name, last_name, email, password)
                VALUES (?, ?, ?, ?)
            `,
            [filter.clean(firstName), filter.clean(lastName), email, password_hashed]
        );

        return res.status(200).json({message: 'Success'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export default handler;
