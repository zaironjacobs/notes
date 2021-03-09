import {Overlay, Popup} from '@style/PopupConfirmationStyled';


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
                        <button className='confirmation-button' onClick={onYes}>Yes</button>
                        <button className='confirmation-button' onClick={onNo}>No</button>
                    </div>
                </Popup>
            </Overlay>
        </>
    )
}

export default PopupConfirmation;