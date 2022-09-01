import {
    AllNotesCheckbox,
    Wrapper,
    InputCheckbox,
    InputFile,
    NoteName,
    NoteNew,
    NotesHeaderOne,
    NotesHeaderOneLeft,
    NotesHeaderTwo,
    NoteTrash,
    NoteUpload,
    SingleNote,
    Title,
} from './NotesStyled'
import { global } from '@global'
import React, { ChangeEvent, useState } from 'react'
import Head from 'next/head'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteNote, getNotes, getNotesCount, postNote } from '@services/api'
import { Pagination } from '@components/Pagination/Pagination'
import Link from 'next/link'
import { NewNoteModal } from '@components/NewNoteModal'
import { INote, INoteCreate } from '@interfaces'
import { ConfirmationModal } from '@components/ConfirmationModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

export const Notes = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [notesCheckedId, setNotesCheckedId] = useState<string[]>([])
    const [showNewNoteModal, setShowNewNoteModal] = useState<boolean>(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
    const router = useRouter()
    const showTrash = notesCheckedId.length > 0
    const queryClient = useQueryClient()

    const notesQuery = useQuery(['notesQuery', currentPage], () => getNotes(currentPage, global.paginationLimit, false))

    const noteCreateMutation = useMutation(
        'noteCreateMutation',
        (noteCreate: INoteCreate) => {
            return postNote(noteCreate)
        },
        {
            onSuccess: async (id) => {
                // Invalidate and refetch
                await queryClient.invalidateQueries('notesCountQuery')
                await queryClient.invalidateQueries('notesQuery')

                router.push(`/notes/${base64Encode(id)}?editable=true`).then()
            },
        }
    )

    const noteDeleteMutation = useMutation(
        'noteDeleteMutation',
        (id: string) => {
            return deleteNote(id)
        },
        {
            onSuccess: async () => {
                // Invalidate and refetch
                await queryClient.invalidateQueries('notesCountQuery')
                await queryClient.invalidateQueries('notesQuery')
            },
        }
    )

    const notesCountQuery = useQuery('notesCountQuery', getNotesCount)

    // Calculate total pages
    const totalPages = calculateTotalPages(notesCountQuery.data || 1)

    // Calculate the total pages
    function calculateTotalPages(notesCount: number) {
        return Math.ceil(notesCount / global.paginationLimit)
    }

    // Delete all checked notes
    async function deleteSelectedNotes() {
        for (const id of notesCheckedId) {
            noteDeleteMutation.mutate(id)
        }
        setShowConfirmationModal(false)

        // Go to previous page if current page becomes empty
        if (notesQuery.data) {
            if (notesCheckedId.length === notesQuery.data.length && currentPage > 1) {
                setCurrentPage((prevCurrentPage) => prevCurrentPage - 1)
            }
        }

        setNotesCheckedId([])
    }

    // Upload notes
    function uploadNote(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files) return

        const file = files[0]
        const fileName: string = file.name.substr(0, file.name.lastIndexOf('.'))
        const fileType: string = file.type
        const fileSize: number = file.size

        if (fileName.length > global.maxNoteNameLength) return
        if (fileSize > global.maxNoteContent) return
        if (fileType !== 'text/plain') return

        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = async () => {
            const fileContent = reader.result as string
            const noteCreate: INoteCreate = { name: fileName, content: fileContent }
            await createNote(noteCreate)
            await notesQuery.refetch()
        }
        reader.onerror = () => {}
    }

    // Add or remove the id of the selected notes to selectedNotesId
    function onNoteCheckboxChange(e: ChangeEvent<HTMLInputElement>, note: INote) {
        if (e.target.checked) {
            note.isChecked = true
            notesCheckedId.push(note.id)
            setNotesCheckedId(notesCheckedId.filter((id) => id))
        } else {
            setNotesCheckedId(notesCheckedId.filter((id) => id !== note.id))
            note.isChecked = false
        }
    }

    // Toggle all notes check
    function toggleNotesCheck() {
        if (!notesQuery.data) return

        // Uncheck or check notes
        const checkNotes = (notes: INote[], isChecked: boolean) => {
            notes.forEach((note) => (note.isChecked = isChecked))
        }

        if (notesCheckedId.length < 1) {
            checkNotes(notesQuery.data, true)
            setNotesCheckedId(() => {
                const selectedNotesId: string[] = []
                notesQuery.data.forEach((note: INote) => {
                    selectedNotesId.push(note.id)
                })
                return selectedNotesId
            })
        } else {
            checkNotes(notesQuery.data, false)
            setNotesCheckedId([])
        }
    }

    // Create a new notes
    function createNote(noteCreate: INoteCreate) {
        noteCreateMutation.mutate(noteCreate)
    }

    // Open new notes modal
    function openNewNoteModal() {
        setShowNewNoteModal(true)
    }

    // Close new notes modal
    function closeNewNoteModal() {
        setShowNewNoteModal(false)
    }

    function openConfirmationModal() {
        setShowConfirmationModal(true)
    }

    function closeConfirmationModal() {
        setShowConfirmationModal(false)
    }

    function base64Encode(id: string) {
        return Buffer.from(id).toString('base64')
    }

    return (
        <>
            <Head>
                <title>{`My notes – ${global.siteName}`}</title>
            </Head>

            <Wrapper>
                {/* Confirmation Popup */}
                {showConfirmationModal && (
                    <ConfirmationModal
                        text="Delete all selected notes?"
                        action={deleteSelectedNotes}
                        closeModal={closeConfirmationModal}
                    />
                )}

                {/* New notes modal */}
                {showNewNoteModal && <NewNoteModal createNote={createNote} closeModal={closeNewNoteModal} />}

                {/* Header One */}
                <NotesHeaderOne>
                    <Title>My notes</Title>
                    <NotesHeaderOneLeft>
                        {showTrash && (
                            <NoteTrash onClick={openConfirmationModal}>
                                <FontAwesomeIcon icon={faTrash} />
                            </NoteTrash>
                        )}
                        <label htmlFor="file-input">
                            <NoteUpload>
                                <FontAwesomeIcon icon={faFileUpload} />
                                <InputFile id="file-input" onChange={uploadNote} />
                            </NoteUpload>
                        </label>
                        <NoteNew onClick={openNewNoteModal}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </NoteNew>
                    </NotesHeaderOneLeft>
                </NotesHeaderOne>

                {/* Header Two */}
                {notesQuery.data && notesQuery.data.length > 0 && (
                    <NotesHeaderTwo>
                        <AllNotesCheckbox
                            checked={notesCheckedId.length === notesQuery.data.length}
                            onChange={toggleNotesCheck}
                        ></AllNotesCheckbox>
                    </NotesHeaderTwo>
                )}

                {/* Notes */}
                {notesQuery.data &&
                    notesQuery.data.map((note) => (
                        <SingleNote key={note.id}>
                            <InputCheckbox checked={note.isChecked} onChange={(e) => onNoteCheckboxChange(e, note)} />
                            <Link href={`/notes/${base64Encode(note.id)}`}>
                                <NoteName>{note.name}</NoteName>
                            </Link>
                        </SingleNote>
                    ))}

                {/* Pagination */}
                {notesQuery.data && notesQuery.data.length > 0 && (
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                )}
            </Wrapper>
        </>
    )
}
