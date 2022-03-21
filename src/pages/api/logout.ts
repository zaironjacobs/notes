import withSession from '@libs/session'

export default withSession(async (req, res) => {
    // Logout user
    if (req.method === 'POST') {
        req.session.destroy()
        return res.status(200).json({ message: 'Logged out' })
    } else {
        return res.status(405).json({ message: 'Invalid method' })
    }
})
