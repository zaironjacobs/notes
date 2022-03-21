import { useEffect, useState } from 'react'
import { Content } from '@style/NotificationStyled'
import global from 'global'

const Notification = (props) => {
    const [windowTimeout, setWindowTimeout] = useState(null)
    const { notificationState, notificationDispatch } = props

    const windowTimeoutIsNull = windowTimeout !== null

    useEffect(() => {
        if (notificationState.isOn && notificationState.timeout > 0) {
            setWindowTimeout(
                setTimeout(() => {
                    notificationDispatch({
                        type: global.notificationActions.CLOSE_NOTIFICATION,
                    })
                    setWindowTimeout(null)
                }, notificationState.timeout)
            )
        }
    }, [notificationState, notificationDispatch])

    return (
        <>
            <Content isNotificationOn={props.notificationState.isOn}>{props.notificationState.message}</Content>
        </>
    )
}

export default Notification
