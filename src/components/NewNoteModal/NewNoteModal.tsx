import {
    Form,
    Input,
    InputError,
    InputWrapper,
    Modal,
    Overlay,
    Title,
} from '@components/NewNoteModal/NewNoteModalStyled'
import React, { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { useOnClickOutside } from '@hooks/use-on-click-outside'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@components/Button'
import { INoteCreate } from '@interfaces'

const schema = yup.object().shape({
    name: yup.string().required('Required'),
    content: yup.string().default(''),
})

interface IPopupNewNote {
    createNote: (noteCreate: INoteCreate) => void
    closeModal: () => void
}

export const NewNoteModal = ({ createNote, closeModal }: IPopupNewNote) => {
    const [error, setError] = useState<string>(undefined as any)
    const modal = useRef<HTMLDivElement>(null)

    useOnClickOutside([modal], () => closeModal())

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm<INoteCreate>({
        resolver: yupResolver(schema),
    })

    // Set focus on name
    useEffect(() => {
        setFocus('name')
    }, [setFocus])

    async function onSubmitForm(noteCreate: INoteCreate) {
        await createNote(noteCreate)
        closeModal()
    }

    return (
        <Overlay>
            <Modal ref={modal}>
                <Title>Create new note</Title>
                <Form onSubmit={handleSubmit(onSubmitForm)}>
                    <InputWrapper>
                        <Input type="text" placeholder="Name" {...register('name')} />
                        {errors.name && <InputError>{errors.name.message}</InputError>}
                    </InputWrapper>
                    <Button type="submit">Create</Button>
                </Form>
            </Modal>
        </Overlay>
    )
}
