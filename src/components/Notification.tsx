import {useEffect, useState} from 'react';
import {Content} from '@style/NotificationStyled';
import global from 'global';


const Notification = (props) => {
    const [windowTimeout, setWindowTimeout] = useState(null);

    useEffect(() => {
        if (windowTimeout !== null) {
            clearTimeout(windowTimeout);
        }
        if (props.notificationState.isOn && props.notificationState.timeout > 0) {
            setWindowTimeout(setTimeout(() => {
                props.notificationDispatch({type: global.notificationActions.CLOSE_NOTIFICATION});
                setWindowTimeout(null);
            }, props.notificationState.timeout));
        }
    }, [props.notificationState]);

    return (
        <>
            <Content isNotificationOn={props.notificationState.isOn}>
                {props.notificationState.message}
            </Content>
        </>
    )
}

export default Notification;