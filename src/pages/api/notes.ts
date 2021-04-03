import {query} from '@lib/db';
import withSession from '@lib/session';
import UserInterface from '@interface/User';
import NoteInterface from '@interface/Note';


// Get notes
export async function getNotes(user: UserInterface, page: string, paginationLimit: string, includeContent: string) {
    const start: number = parseInt(page) * parseInt(paginationLimit) - parseInt(paginationLimit);

    let content: string = 'content';
    if (includeContent === 'false') {
        content = null;
    }

    const resultSelectNotes = await query(
        `
                    SELECT id, name, ${content}
                    FROM notes
                    WHERE id = ANY
                          (SELECT note_id
                           FROM user_notes
                           WHERE user_id = '${user.id}')
                    ORDER BY created_at ASC
                    LIMIT ${start}, ${paginationLimit};
                    `
    );
    const response: NoteInterface[] = [];
    JSON.parse(JSON.stringify(resultSelectNotes)).forEach((note) => {
        response.push({
            id: note.id,
            name: note.name,
            content: note.content,
            isChecked: false
        });
    });
    return {notes: response};
}

export default withSession(async (req, res) => {
    // Retrieve user notes
    if (req.method === 'GET') {
        try {

            const userFromSession: UserInterface = req.session.get('user');
            if (!userFromSession.isLoggedIn) {
                return res.status(401).json({message: 'Could not fetch notes'});
            }

            const page: string = req.query.page;
            const limit: string = req.query.limit;
            const includeContent: string = req.query.includeContent;

            const result = await getNotes(userFromSession, page, limit, includeContent);

            return res.status(200).json({message: 'Notes fetched', notes: result.notes});
        } catch (error) {
            return res.status(500).json({message: 'Could not fetch notes'});
        }
    } else {
        return res.status(405).json({message: 'Invalid method'});
    }
});