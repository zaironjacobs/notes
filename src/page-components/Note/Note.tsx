import { NextRouter, useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { INote, INoteUpdate } from '@interfaces'
import { global } from '@global'
import {
    Back,
    Form,
    Loading,
    NoteEdit,
    NoteHeader,
    NoteInput,
    NoteLock,
    NoteNameWrapper,
    NoteOptionsWrapper,
    NoteSave,
    NoteTextArea,
    NoteTrash,
    Wrapper,
} from '@page-components/Note/NoteStyled'
import Head from 'next/head'
import { ConfirmationModal } from '@components/ConfirmationModal/ConfirmationModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleLeft, faEdit, faLock, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useMutation, useQuery } from 'react-query'
import { deleteNote, getNote, updateNote } from '@services/api'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from '@contexts/User'

interface INoteFormValues {
    name: string
    content: string
}

const schema = yup.object().shape({
    name: yup.string().required('Required'),
    content: yup.string().max(global.maxNoteContent),
})

export const Note = () => {
    const router: NextRouter = useRouter()
    const base64NoteId = router.query.id as string
    const noteId = Buffer.from(base64NoteId, 'base64').toString()
    const [showDeleteNoteConfirmationModal, setShowDeleteNoteConfirmationModal] = useState<boolean>(false)
    const [note, setNote] = useState<INote>(undefined as any)
    const editable = router.query.editable as string
    const [noteIsEditable, setNoteIsEditable] = useState<boolean>(editable?.toLowerCase() === 'true' || false)
    const user = useContext(UserContext)

    const {
        register,
        setFocus,
        reset,
        watch,
        formState: { errors },
    } = useForm<INoteFormValues>({
        resolver: yupResolver(schema),
    })

    // Set form initial values
    useEffect(() => {
        if (note) {
            reset({ name: note.name, content: note.content })
        }
    }, [reset, note])

    // Set focus
    useEffect(() => {
        // setFocus('content')
    }, [setFocus])

    useEffect(() => {
        const subscription = watch((data) => {
            const noteFormValues: INoteFormValues = {
                name: data.name || '',
                content: data.content || '',
            }
            onSubmitForm(noteFormValues)
        })
        return () => subscription.unsubscribe()
    }, [watch])

    useQuery(['noteQuery', user.id], () => getNote(noteId), {
        onSuccess: (note) => {
            setNote(note)
        },
    })

    // Save note
    const saveNote = () => {
        if (noteIsEditable) {
            const noteUpdate: INoteUpdate = {
                id: noteId,
                name: note.name,
                content: note.content,
            }
            noteUpdateMutation.mutate(noteUpdate)
        }
    }

    const noteUpdateMutation = useMutation(['noteUpdateMutation', user.id], (noteUpdate: INoteUpdate) => {
        return updateNote(noteUpdate)
    })

    const noteDeleteMutation = useMutation(
        ['noteDeleteMutation', user.id],
        (id: string) => {
            return deleteNote(id)
        },
        {
            onSuccess: async () => {
                router.push('/notes').then()
            },
        }
    )

    // Delete notes
    async function deleteCurrentNote() {
        noteDeleteMutation.mutate(noteId)
    }

    // Go to previous page
    const goToPreviousPage = async () => {
        router.push('/notes').then()
    }

    // Save
    function onSaveClick() {
        saveNote()
    }

    // Trash
    function onTrashClick() {
        if (noteIsEditable) {
            openDeleteNoteConfirmationModal()
        }
    }

    // Lock
    function onLockClick() {
        setNoteIsEditable(false)
    }

    // Edit
    function onEditClick() {
        setNoteIsEditable(true)
    }

    // Open confirmation modal
    function openDeleteNoteConfirmationModal() {
        setShowDeleteNoteConfirmationModal(true)
    }

    // Close confirmation modal
    function closeDeleteNoteConfirmationModal() {
        setShowDeleteNoteConfirmationModal(false)
    }

    // Submit form
    function onSubmitForm(noteFormValues: INoteFormValues) {
        setNote((prev) => {
            prev.name = noteFormValues.name
            prev.content = noteFormValues.content
            return prev
        })
    }

    return (
        <>
            <Head>
                <title>{`${note?.name || ''} – ${global.siteName}`}</title>
            </Head>

            <Wrapper>
                {note && (
                    <>
                        {/* Confirmation modal */}
                        {showDeleteNoteConfirmationModal && (
                            <ConfirmationModal
                                text="Are you sure you want to delete this note?"
                                action={deleteCurrentNote}
                                closeModal={closeDeleteNoteConfirmationModal}
                            />
                        )}

                        {/* Header One */}
                        <NoteHeader>
                            <Back icon={faCircleLeft} onClick={goToPreviousPage} />
                            <NoteOptionsWrapper>
                                {!noteIsEditable && (
                                    <NoteEdit onClick={onEditClick}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </NoteEdit>
                                )}
                                {noteIsEditable && (
                                    <NoteLock onClick={onLockClick}>
                                        <FontAwesomeIcon icon={faLock} />
                                    </NoteLock>
                                )}
                                <NoteSave noteIsEditable={noteIsEditable} onClick={onSaveClick}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </NoteSave>
                                <NoteTrash noteIsEditable={noteIsEditable} onClick={onTrashClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </NoteTrash>
                            </NoteOptionsWrapper>
                        </NoteHeader>

                        <Form>
                            <NoteNameWrapper>
                                <NoteInput
                                    placeholder="Name..."
                                    type="text"
                                    autoComplete="off"
                                    disabled={!noteIsEditable}
                                    maxLength={global.maxNoteNameLength}
                                    {...register('name')}
                                />
                            </NoteNameWrapper>

                            <NoteTextArea
                                placeholder="Your ideas here..."
                                disabled={!noteIsEditable}
                                maxLength={global.maxNoteContent}
                                autoFocus
                                {...register('content')}
                            />
                        </Form>
                    </>
                )}
                {!note && <Loading className="loading">Loading....</Loading>}
            </Wrapper>
        </>
    )
}
