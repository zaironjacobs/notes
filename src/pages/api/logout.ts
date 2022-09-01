import { withSessionRoute } from '@libs/with-session'

export default withSessionRoute(async (req, res) => {
    // Logout
    if (req.method === 'POST') {
        req.session.destroy()
        return res.status(200).json({})
    } else {
        return res.status(405).json({ message: 'Invalid method' })
    }
})
