import {Overlay, Popup} from '@style/PopupConfirmationStyled';
import {CustomSmallButton} from '@component/CustomSmallButton';


const PopupConfirmation = (props) => {

    // Cancel the action
    const onNo = () => {
        props.setShowPopUp(false);
    }

    // Run the function on confirmation
    const onYes = () => {
        props.customFunction();
    }

    return (
        <>
            <Overlay>
                <Popup>
                    <span className='confirmation-text'>{props.message}</span>
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