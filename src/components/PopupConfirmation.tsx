import {Overlay} from '@style/PopupConfirmationStyled';


const PopupConfirmation = (props) => {

    const onNo = () => {
        props.setShowPopUp(false);
    }

    const onYes = () => {
        props.customFunction();
    }

    return (
        <>
            <Overlay>
                <div className='popup'>
                    <span className='confirmation-text'>{props.message}</span>
                    <div className='confirmation-buttons-wrapper'>
                        <button className='confirmation-button' onClick={onYes}>Yes</button>
                        <button className='confirmation-button' onClick={onNo}>No</button>
                    </div>
                </div>
            </Overlay>
        </>
    )
}

export default PopupConfirmation;