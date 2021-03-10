import {Overlay, Popup} from '@style/PopupNewNoteStyled';
import {CustomSmallButton} from '@component/CustomSmallButton';
import {useState} from 'react';


const PopupNewNote = (props) => {
    const [noteName, setNoteName] = useState('');

    // Create the new note if a name is given
    const create = () => {
        if (noteName !== '') {
            props.createNewNote(noteName);
        }
    }

    // Cancel the action
    const cancel = () => {
        props.setShowNewNotePopup(false);
    }

    // Set the note name from the input
    const dynamicSetNoteName = (event) => {
        setNoteName(event.target.value);
    }

    return (
        <>
            <Overlay>
                <Popup>
                    <div className='create-text'>New note name:</div>
                    <input className='input-note-name'
                           placeholder='New note name'
                           type='text'
                           autoComplete='off'
                           onChange={dynamicSetNoteName}/>
                    <div className='buttons-wrapper'>
                        <CustomSmallButton className='button' onClick={create}>Create</CustomSmallButton>
                        <CustomSmallButton className='button' onClick={cancel}>Cancel</CustomSmallButton>
                    </div>
                </Popup>
            </Overlay>
        </>
    )
}

export default PopupNewNote;