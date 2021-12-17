import React, {useReducer, useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@components/Layout';
import Notification from '@components/Notification';
import {SWRConfig} from 'swr';
import axios, {AxiosResponse} from 'axios';
import global from 'global';
import NotificationStateInterface from '@interfaces/NotificationState';


const App = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Reducer for notification
    const notificationReducer = (notificationState, notificationAction) => {
        const newNotificationState: NotificationStateInterface = {message: '', isOn: false, timeout: 0};
        switch (notificationAction.type) {
            case global.notificationActions.SHOW_NOTIFICATION:
                newNotificationState.message = notificationAction.payload.message;
                newNotificationState.isOn = true;
                newNotificationState.timeout = notificationAction.payload.timeout;
                return newNotificationState;
            case global.notificationActions.CLOSE_NOTIFICATION:
                return newNotificationState;
            default:
                return newNotificationState;
        }
    }
    const initialNotificationState: NotificationStateInterface = {message: '', isOn: false, timeout: 0};
    const [notificationState, notificationDispatch] = useReducer(notificationReducer, initialNotificationState);

    // Fetcher for SWR
    const fetcher = async url => {
        const response: AxiosResponse = await axios.get(url);

        // If the status code is not in the range 200-299,
        // we still try to parse and throw it.
        if (response.status < 200 && response.status > 299) {
            const error: any = new Error('An error occurred while fetching data.')
            // Extra info
            error.info = await response.data;
            error.status = response.status;
            throw error;
        }

        return response.data;
    }

    return (
        <>
            <GlobalStyle/>
            <SWRConfig value={{fetcher}}>
                <Layout>
                    <props.Component
                        {...props.pageProps}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        notificationDispatch={notificationDispatch}
                    />

                    {/* Bottom Notification */}
                    <Notification
                        notificationState={notificationState}
                        notificationDispatch={notificationDispatch}
                    />
                </Layout>
            </SWRConfig>
        </>
    )
}

export default App;