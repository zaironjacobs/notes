import { CreateNoteForm, Overlay, Popup } from '@style/PopupNewNoteStyled'
import { PopupButton } from '@components/PopupButton'
import React, { useRef, useState } from 'react'
import { Formik, useField } from 'formik'
import * as Yup from 'yup'
import useOnClickOutside from '@hooks/useOnClickOutside'
import global from 'global'

const PopupNewNote = (props) => {
    const [error, setError] = useState<string>('')
    const popupNode = useRef()
    useOnClickOutside(popupNode, () => cancel())

    // Create the new note if a name is given
    const createNewNote = (values) => {
        props.createNewNote(values.name).catch((error) => {
            setError(error.response.data.message)
        })
    }

    // Cancel the action
    const cancel = () => {
        props.setShowNewNotePopup(false)
    }

    return (
        <>
            <Overlay>
                <Popup ref={popupNode}>
                    <div className="create-text">New note name:</div>
                    <Formik
                        initialValues={{
                            name: '',
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .max(global.maxNoteNameLength, 'No more than 30 characters')
                                .required('Note name is required'),
                        })}
                        validateOnBlur={false}
                        onSubmit={(values, { setSubmitting }) => {
                            ;(async () => {
                                createNewNote(values)
                                setSubmitting(false)
                            })()
                        }}
                    >
                        {(props) => (
                            <CreateNoteForm>
                                <CreateNoteInput
                                    label="Note name"
                                    name="name"
                                    type="text"
                                    placeholder="Note name"
                                    className="create-note-input"
                                    autoComplete="off"
                                    maxLength={30}
                                    autoFocus
                                />
                                {error && <div className="create-note-server-error">{error}</div>}
                                <div className="buttons-wrapper">
                                    <PopupButton type="submit">
                                        {props.isSubmitting ? 'Please Wait...' : 'Create'}
                                    </PopupButton>
                                    <PopupButton onClick={cancel}>Cancel</PopupButton>
                                </div>
                            </CreateNoteForm>
                        )}
                    </Formik>
                </Popup>
            </Overlay>
        </>
    )
}

const CreateNoteInput = ({ label, ...props }: { [x: string]: any; name: string }) => {
    const [field, meta] = useField(props)

    return (
        <>
            <input {...field} {...props} />
            {meta.error && <div className="create-note-form-error">{meta.error}</div>}
        </>
    )
}

export default PopupNewNote
