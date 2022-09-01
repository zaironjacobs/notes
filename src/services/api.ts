import axios, { AxiosResponse } from 'axios'
import { INote, INoteCreate, INoteUpdate, IUser, IUserCreate } from '@interfaces'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

/**
 * Sign-Up
 *
 * @param {IUserCreate} userCreate The new user data
 */
export async function signUp(userCreate: IUserCreate) {
    await axios({
        url: `${apiUrl}/sign-up`,
        method: 'post',
        data: { userCreate },
    })
}

/**
 * Login
 *
 * @param {string} email The email
 * @param {string} password The password
 */
export async function login(email: string, password: string) {
    await axios({
        url: `${apiUrl}/login`,
        method: 'post',
        data: { email, password },
    })
}

/**
 * Logout
 */
export async function logout() {
    await axios({
        url: `${apiUrl}/logout`,
        method: 'post',
    })
}

/**
 * Get user
 *
 * @return {Promise<IUser>}
 */
export async function getUser() {
    const { data }: AxiosResponse<IUser> = await axios({
        url: `${apiUrl}/users/me`,
        method: 'get',
    })

    return data
}

/**
 * Get a note
 *
 * @param {string} id
 * @return {Promise<INote>} Note
 */
export async function getNote(id: string) {
    const { data }: AxiosResponse<INote> = await axios({
        url: `${apiUrl}/notes/${id}`,
        method: 'get',
    })

    return data
}

/**
 * Get notes
 *
 * @param {number} page The page
 * @param {limit} page The limit
 * @param {includeContent} includeContent Whether to include note content or not
 * @return {Promise<INote[]>} Notes
 */
export async function getNotes(page: number, limit: number, includeContent: boolean) {
    const { data }: AxiosResponse<INote[]> = await axios({
        url: `${apiUrl}/notes?page=${page}&limit=${limit}&includeContent=${includeContent}`,
        method: 'get',
    })

    return data
}

/**
 * Get notes count
 *
 * @return Promise<number>
 */
export async function getNotesCount() {
    const { data }: AxiosResponse<number> = await axios({
        url: `${apiUrl}/notes/count`,
        method: 'get',
    })

    return data
}

/**
 * Create note
 *
 * @param {INoteCreate} noteCreate
 * @return Promise<string>
 */
export async function postNote(noteCreate: INoteCreate) {
    const { data }: AxiosResponse<string> = await axios({
        url: `${apiUrl}/notes`,
        data: noteCreate,
        method: 'post',
    })

    return data
}

/**
 * Update note
 *
 * @param {INoteUpdate} noteUpdate The note to update
 */
export async function updateNote(noteUpdate: INoteUpdate) {
    await axios({
        url: `${apiUrl}/notes/${noteUpdate.id}`,
        data: noteUpdate,
        method: 'put',
    })
}

/**
 * Delete notes
 *
 * @param {string} id
 */
export async function deleteNote(id: string) {
    await axios({
        url: `${apiUrl}/notes/${id}`,
        method: 'delete',
    })
}
