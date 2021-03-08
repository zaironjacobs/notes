import {Overlay} from '@style/PopupNewNoteStyled';
import {useState} from 'react';


const PopupNewNote = (props) => {
    const [noteName, setNoteName] = useState('');

    const create = () => {
        if (noteName !== '') {
            props.createNewNote(noteName);
        }
    }

    const cancel = () => {
        props.setShowNotePopup(false);
    }

    const dynamicChangeNoteName = (event) => {
        setNoteName(event.target.value);
    }

    return (
        <>
            <Overlay>
                <div className='popup'>
                    <div className='create-text'>New note name:</div>
                    <input className='note-name'
                           placeholder='New note name'
                           onChange={dynamicChangeNoteName}/>
                    <button className='button' onClick={create}>Create</button>
                    <button className='button' onClick={cancel}>Cancel</button>
                </div>
            </Overlay>
        </>
    )
}

export default PopupNewNote;