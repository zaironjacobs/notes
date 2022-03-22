import { Main, NotesHeaderOne, NotesHeaderTwo, PageWrapper, UserNote } from '@styles/NotesStyled'
import global from 'global'
import withSession from '@libs/session'
import Menu from '@components/Menu'
import Header from '@components/Header'
import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import PopupNewNote from '@components/PopupNewNote'
import PopupConfirmation from '@components/PopupConfirmation'
import Head from 'next/head'
import Footer from '@components/Footer'
import UserInterface from '@interfaces/User'
import NoteInterface from '@interfaces/Note'
import Pagination from '@components/Pagination'
import useSWR from 'swr'
import { getNotesCount } from '@api/notes-count'

const Notes = (props) => {
    const router: NextRouter = useRouter()
    const [currentPage, setCurrentPage] = useState<number>(props.currentPage)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [checkedNotesId, setCheckedNotesId] = useState<string[]>([])
    const [showNewNotePopup, setShowNewNotePopup] = useState<boolean>(false)
    const [showConfirmationPopup, setShowConfirmationPopup] = useState<boolean>(false)
    const [showTrash, setShowTrash] = useState<boolean>(false)

    const {
        data: notesCountData,
        error: notesCountDataError,
        mutate: mutateNotesCountData,
    } = useSWR(global.api.notesCount)

    const {
        data: notesData,
        error: notesError,
        mutate: mutateNotesData,
    } = useSWR(`${global.api.notes}?page=${currentPage}&limit=${global.paginationLimit}&includeContent=false`)

    // On notesCountData change, update total pages shown
    useEffect(() => {
        if (!notesCountData || notesCountDataError) return
        setTotalPages(calculateTotalPages(notesCountData.count))
    }, [notesCountData, notesCountDataError])

    // On checkedNotesId change, show or hide the trash icon
    useEffect(() => {
        if (checkedNotesId.length > 0) {
            setShowTrash(true)
        } else {
            setShowTrash(false)
        }
    }, [checkedNotesId])

    // Display notes
    const UserNotes = () => {
        if (notesError) {
            return (
                <>
                    <div className="notes-server-error">Error</div>
                </>
            )
        }
        if (!notesData) {
            return (
                <>
                    <div className="notes-loading">Loading...</div>
                </>
            )
        }
        return notesData.notes.map((note, index: number) => (
            <UserNote key={index}>
                <input
                    className="note-checkbox"
                    id={note.id}
                    type="checkbox"
                    checked={note.isChecked}
                    onChange={(e) => {
                        onNoteCheckBoxChange(e, note)
                    }}
                />
                <Link
                    href={`${global.paths.note}/${Buffer.from(note.id).toString('base64')}?previous=${currentPage}`}
                    passHref
                >
                    <span className="note-name">{note.name}</span>
                </Link>
            </UserNote>
        ))
    }

    // Create a new note
    const createNewNote = (name: string) => {
        return createNotePromise(name, '')
            .then(async (response: AxiosResponse) => {
                const newNotesCountData: { count: number } = await mutateNotesCountData()
                const newNoteId: string = response.data.id
                const page: number = calculateTotalPages(newNotesCountData.count)
                await router.push(
                    `${global.paths.note}/${Buffer.from(newNoteId).toString('base64')}?previous=${page}&editable=true`
                )
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    // Delete all notes from selectedNotesId
    const deleteSelectedNotes = () => {
        let notificationMessage: string = ''
        if (checkedNotesId.length > 1) {
            notificationMessage = 'Notes deleted'
        } else {
            notificationMessage = 'Note deleted'
        }
        return deleteNotesPromise()
            .then(async (response: AxiosResponse) => {
                await refreshNotes()
                props.notificationDispatch({
                    type: global.notificationActions.SHOW_NOTIFICATION,
                    payload: {
                        message: notificationMessage,
                        timeout: global.notificationTimeout,
                    },
                })
                setShowConfirmationPopup(false)

                // Go to previous page if current page becomes empty
                if (checkedNotesId.length == notesData.notes.length && currentPage > 1) {
                    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1)
                }

                setCheckedNotesId([])
            })

            .catch((error) => {
                return Promise.reject(error)
            })
    }

    // Delete notes promise
    const deleteNotesPromise = () => {
        return axios.delete(global.api.note, {
            data: { noteIds: checkedNotesId },
        })
    }

    // Create note promise
    const createNotePromise = (name: string, content) => {
        return axios.post(global.api.note, { name: name, content: content })
    }

    // Upload a note
    const uploadNote = (event) => {
        const file = event.target.files[0]
        const fileName: string = file.name.substr(0, file.name.lastIndexOf('.'))
        const fileType: string = file.type
        const fileSize: number = parseInt(file.size)
        if (fileName.length > global.maxNoteNameLength) {
            props.showNotification('Could not upload text file, file name exceeds 30 characters')
            return
        }
        if (fileSize > global.maxNoteContent) {
            props.showNotification('Could not upload text file, maximum file size exceeded')
            return
        }
        if (fileType !== 'text/plain') {
            props.showNotification('Only text files are supported')
            return
        }
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = async (event) => {
            const fileContent: string | ArrayBuffer = event.target.result
            const note = { noteName: fileName, noteContent: fileContent }
            try {
                props.notificationDispatch({
                    type: global.notificationActions.SHOW_NOTIFICATION,
                    payload: { message: 'Uploading text file...', timeout: -1 },
                })
                await createNotePromise(note.noteName, note.noteContent)
                await refreshNotes()
                props.notificationDispatch({
                    type: global.notificationActions.SHOW_NOTIFICATION,
                    payload: {
                        message: 'Text file uploaded',
                        timeout: global.notificationTimeout,
                    },
                })
            } catch (error) {
                props.notificationDispatch({
                    type: global.notificationActions.SHOW_NOTIFICATION,
                    payload: {
                        message: 'Could not upload file',
                        timeout: global.notificationTimeout,
                    },
                })
            }
        }
        reader.onerror = () => {
            props.notificationDispatch({
                type: global.notificationActions.SHOW_NOTIFICATION,
                payload: {
                    message: 'Could not upload file',
                    timeout: global.notificationTimeout,
                },
            })
            return
        }
    }

    // Refresh notes
    const refreshNotes = async () => {
        await mutateNotesData()
        await mutateNotesCountData()
    }

    // Add or remove the id of the selected note to selectedNotesId
    const onNoteCheckBoxChange = (e, note: NoteInterface) => {
        if (e.target.checked) {
            note.isChecked = true
            checkedNotesId.push(note.id)
            setCheckedNotesId(checkedNotesId.filter((id) => id))
        } else {
            setCheckedNotesId(checkedNotesId.filter((id) => id !== note.id))
            note.isChecked = false
        }
    }

    // Toggle all notes check
    const toggleAllNotesCheck = () => {
        if (checkedNotesId.length < 1) {
            checkAllNotes(notesData.notes, true)
            setCheckedNotesId(() => {
                const selectedNotesId = []
                notesData.notes.forEach((note) => {
                    selectedNotesId.push(note.id)
                })
                return selectedNotesId
            })
        } else {
            checkAllNotes(notesData.notes, false)
            setCheckedNotesId([])
        }
    }

    // Uncheck or check notes
    const checkAllNotes = (notes: NoteInterface[], isChecked: boolean) => {
        notes.forEach((note) => {
            note.isChecked = isChecked
        })
    }

    return (
        <>
            {/* Menu */}
            <div ref={props.menuNode}>
                <Menu menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} user={props.user} />
            </div>

            {/* Header */}
            <Header menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} />

            {/* Main */}
            <Main>
                <Head>
                    <title>My notes – {global.siteName}</title>
                </Head>
                <PageWrapper>
                    {/* Confirmation Popup */}
                    {showConfirmationPopup && (
                        <PopupConfirmation
                            message="Delete all selected notes?"
                            customFunction={deleteSelectedNotes}
                            setShowConfirmationPopup={setShowConfirmationPopup}
                        />
                    )}

                    {/* New note Popup */}
                    {showNewNotePopup && (
                        <PopupNewNote createNewNote={createNewNote} setShowNewNotePopup={setShowNewNotePopup} />
                    )}

                    {/* Header One */}
                    <NotesHeaderOne>
                        <div className="my-notes">My notes</div>
                        <div className="notes-header-one-left">
                            {showTrash && (
                                <div
                                    className="notes-trash"
                                    onClick={() => {
                                        setShowConfirmationPopup(true)
                                    }}
                                >
                                    <i className="fas fa-trash" />
                                </div>
                            )}
                            <label className="note-upload">
                                <i className="fas fa-file-upload" />
                                <input className="input-note-upload" type="file" onChange={uploadNote} />
                            </label>
                            <div className="note-new" onClick={() => setShowNewNotePopup(true)}>
                                <i className="fas fa-plus-circle" />
                            </div>
                        </div>
                    </NotesHeaderOne>

                    {/* Header Two */}
                    {!notesError && notesData?.notes.length > 0 && (
                        <NotesHeaderTwo>
                            <input
                                className="notes-checkbox"
                                id="notes-checkbox"
                                type="checkbox"
                                checked={checkedNotesId.length === notesData?.notes.length}
                                onChange={toggleAllNotesCheck}
                            />
                            <span className="notes-name">Name</span>
                        </NotesHeaderTwo>
                    )}

                    {/* Notes */}
                    <UserNotes />

                    {/* Pagination */}
                    {notesData?.notes.length > 0 && (
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                    )}
                </PageWrapper>
            </Main>

            {/* Footer */}
            <Footer />
        </>
    )
}

// Calculate the total pages
const calculateTotalPages = (notesAmount) => {
    return Math.ceil(notesAmount / global.paginationLimit)
}

export default Notes

export const getServerSideProps = withSession(async ({ req, res, query }) => {
    // If user does not exist, redirect to login
    const user: UserInterface = req.session.get('user')
    if (!user) {
        return {
            redirect: {
                destination: global.paths.login,
                permanent: false,
            },
        }
    }

    // Get notes count
    let notesCountData
    try {
        notesCountData = await getNotesCount(user)
    } catch (error) {
        notesCountData = { count: 0 }
    }

    // Get current page to set from query
    let currentPage = query.page
    const totalPages = calculateTotalPages(notesCountData.count)
    if (currentPage === undefined || isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        currentPage = 1
    }

    return { props: { user, currentPage } }
})
