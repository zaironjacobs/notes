import {useEffect} from 'react';
import {Content} from '@style/NotificationStyled';


const Notification = (props) => {

    // Show the notification for 3 seconds
    useEffect(() => {
        if (props.isNotificationOn) {
            setTimeout(() => {
                props.setIsNotificationOn(false);
            }, 3000);
        }
    }, [props.isNotificationOn]);

    return (
        <>
            <Content isNotificationOn={props.isNotificationOn}>
                {props.notification}
            </Content>
        </>
    )
}

export default Notification;