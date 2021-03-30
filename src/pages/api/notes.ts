import {query} from '@lib/db';
import withSession from '@lib/session';
import UserInterface from '@interface/User';
import NoteInterface from '@interface/Note';


export default withSession(async (req, res) => {
    // Retrieve user notes
    if (req.method === 'GET') {
        try {

            const userFromSession: UserInterface = req.session.get('user');
            if (!userFromSession.isLoggedIn) {
                return res.status(401).json({message: 'Could not fetch notes'});
            }

            const currentPage: string = req.query.page;
            const paginationLimit: string = req.query.limit;
            const startLimit: number = parseInt(currentPage) * parseInt(paginationLimit) - parseInt(paginationLimit);

            const resultSelectNotes = await query(
                `
                    SELECT id, name, content
                    FROM notes
                    WHERE id = ANY
                          (SELECT note_id
                           FROM user_notes
                           WHERE user_id = '${userFromSession.id}')
                    ORDER BY created_at ASC
                    LIMIT ${startLimit}, ${paginationLimit};
                    `
            );
            const responseNotes: NoteInterface[] = [];
            JSON.parse(JSON.stringify(resultSelectNotes)).forEach((note) => {
                responseNotes.push({
                    id: note.id,
                    name: note.name,
                    content: note.content,
                    isChecked: false
                });
            });
            return res.status(200).json({message: 'Notes fetched', notes: responseNotes});
        } catch (error) {
            return res.status(500).json({message: 'Could not fetch notes'});
        }
    } else {
        return res.status(405).json({message: 'Invalid method'});
    }
});