export default {
    siteName: 'Notes',

    paginationLimit: 5,

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
