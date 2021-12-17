import {useRef, useState} from 'react';
import {Overlay, Popup} from '@style/PopupConfirmationStyled';
import {PopupButton} from '@components/PopupButton';
import useOnClickOutside from '@hooks/useOnClickOutside';


const PopupConfirmation = (props) => {
    const [error, setError] = useState('');
    const popupNode = useRef();
    useOnClickOutside(popupNode, () => props.setShowConfirmationPopup(false));

    // Cancel the action
    const onNo = () => {
        props.setShowConfirmationPopup(false);
    }

    // Run the function on confirmation
    const onYes = () => {
        props.customFunction()
            .catch((error) => {
                setError(error.response.data.message);
            });
    }

    return (
        <>
            <Overlay>
                <Popup ref={popupNode}>
                    <span className='confirmation-text'>{props.message}</span>
                    {error && <div className='delete-note-error'>{error}</div>}
                    <div className='buttons-wrapper'>
                        <PopupButton className='confirmation-button' onClick={onYes}>Yes</PopupButton>
                        <PopupButton className='confirmation-button' onClick={onNo}>No</PopupButton>
                    </div>
                </Popup>
            </Overlay>
        </>
    )
}

export default PopupConfirmation;