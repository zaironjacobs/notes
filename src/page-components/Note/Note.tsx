import { NextRouter, useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { INoteUpdate } from '@interfaces'
import { global } from '@global'
import {
    Back,
    Form,
    Loading,
    NoteEdit,
    NoteFull,
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
    name: yup.string().max(global.maxNoteNameLength).required('Required'),
    content: yup.string().max(global.maxNoteContent),
})

export const Note = () => {
    const router: NextRouter = useRouter()
    const base64NoteId = router.query.id as string
    const noteId = Buffer.from(base64NoteId, 'base64').toString()
    const [showDeleteNoteConfirmationModal, setShowDeleteNoteConfirmationModal] = useState<boolean>(false)
    const editable = router.query.editable as string
    const [noteIsEditable, setNoteIsEditable] = useState<boolean>(editable?.toLowerCase() === 'true' || false)
    const [noteIsFull, setNoteIsFull] = useState<boolean>(false)
    const user = useContext(UserContext)

    const { register, reset, getValues, watch } = useForm<INoteFormValues>({
        resolver: yupResolver(schema),
    })

    const noteQuery = useQuery(['noteQuery', user.id], () => getNote(noteId), {
        onSuccess: (note) => {
            reset({ name: note.name, content: note.content })
        },
        refetchOnWindowFocus: false,
    })

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

    // Save note
    function saveNote() {
        if (noteIsEditable) {
            const noteUpdate: INoteUpdate = {
                id: noteId,
                name: getValues('name'),
                content: getValues('content'),
            }
            noteUpdateMutation.mutate(noteUpdate)
        }
    }

    // Delete notes
    function deleteCurrentNote() {
        noteDeleteMutation.mutate(noteId)
    }

    // Go to previous page
    function goToPreviousPage() {
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

    // Check if note content is full
    useEffect(() => {
        const subscription = watch((data) => {
            if (data.content) {
                if (data.content.length >= global.maxNoteContent) {
                    setNoteIsFull(true)
                } else {
                    setNoteIsFull(false)
                }
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    return (
        <>
            <Head>
                <title>{`${noteQuery.data?.name || ''} – ${global.siteName}`}</title>
            </Head>
            <Wrapper>
                {noteQuery.data && (
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
                        {noteIsFull && <NoteFull>Note full</NoteFull>}
                    </>
                )}
                {!noteQuery.data && <Loading className="loading">Loading....</Loading>}
            </Wrapper>
        </>
    )
}
