import {Overlay, Popup, CreateNoteForm} from '@style/PopupNewNoteStyled';
import {CustomSmallButton} from '@component/CustomSmallButton';
import React, {useRef, useState} from 'react';
import {Formik, useField} from 'formik';
import * as Yup from 'yup';
import useOnClickOutside from '@hook/useOnClickOutside';


const PopupNewNote = (props) => {
    const [error, setError] = useState('');
    const popupNode = useRef();
    useOnClickOutside(popupNode, () => cancel());

    // Create the new note if a name is given
    const createNewNote = (values) => {
        props.createNewNote(values.name)
            .catch((error) => {
                setError(error.response.data.message);
            });
    }

    // Cancel the action
    const cancel = () => {
        props.setShowNewNotePopup(false);
    }

    return (
        <>
            <Overlay>
                <Popup ref={popupNode}>
                    <div className='create-text'>New note name:</div>
                    <Formik
                        initialValues={{
                            name: ''
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .max(30, 'No more than 30 characters')
                                .required('Note name is required')
                        })}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            (async () => {
                                createNewNote(values);
                                setSubmitting(false);
                                resetForm();
                            })();
                        }}
                    >
                        {props => (
                            <CreateNoteForm>
                                <CreateNoteInput label='Note name' name='name' type='text' placeholder='Note name'
                                                 className='create-note-input' autoComplete='off'/>
                                {error && <div className='create-note-server-error'>{error}</div>}
                                <div className='buttons-wrapper'>
                                    <CustomSmallButton type='submit'>
                                        {props.isSubmitting ? 'Please Wait...' : 'Create'}
                                    </CustomSmallButton>
                                    <CustomSmallButton onClick={cancel}>
                                        Cancel
                                    </CustomSmallButton>
                                </div>
                            </CreateNoteForm>
                        )}
                    </Formik>
                </Popup>
            </Overlay>
        </>
    )
}


const CreateNoteInput = ({label, ...props}: { [x: string]: any; name: string }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <input className='create-note-input' {...field} {...props} />
            {meta.error && <div className='create-note-form-error'>{meta.error}</div>}
        </>
    )
}

export default PopupNewNote;