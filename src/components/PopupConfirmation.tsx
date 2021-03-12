import {useRef, useState} from 'react';
import {Overlay, Popup} from '@style/PopupConfirmationStyled';
import {CustomSmallButton} from '@component/CustomSmallButton';
import useOnClickOutside from '@hook/useOnClickOutside';


const PopupConfirmation = (props) => {
    const [error, setError] = useState('');
    const popupNode = useRef();
    useOnClickOutside(popupNode, () => props.setShowConfirmationPopUp(false));

    // Cancel the action
    const onNo = () => {
        props.setShowConfirmationPopUp(false);
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
                        <CustomSmallButton className='confirmation-button' onClick={onYes}>Yes</CustomSmallButton>
                        <CustomSmallButton className='confirmation-button' onClick={onNo}>No</CustomSmallButton>
                    </div>
                </Popup>
            </Overlay>
        </>
    )
}

export default PopupConfirmation;