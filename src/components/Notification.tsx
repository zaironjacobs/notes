import {Content} from '@style/NotificationStyled';


const Notification = (props) => {

    return (
        <>
            <Content showMessage={props.showMessage}>
                {props.message}
            </Content>
        </>
    )
}

export default Notification;