import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json({ name: 'Notes' })
    } else {
        return res.status(405).json({ detail: 'Invalid method' })
    }
}
