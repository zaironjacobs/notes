export default {
    siteName: 'Notes',

    paginationLimit: 5,

    // Value must be less than MySQL - MEDIUMTEXT (16777215)
    maxNoteContent: 15000000,

    maxNoteNameLength: 30,

    paths: {
        index: '/',
        signUp: '/signup',
        login: '/login',
        note: '/note',
        notes: '/notes',
        notfound404: '/404'
    },

    api: {
        user: '/api/user',
        signUp: '/api/signup',
        login: '/api/login',
        logout: '/api/logout',
        note: '/api/note',
        notes: '/api/notes',
        notesCount: '/api/notes-count'
    }
};
