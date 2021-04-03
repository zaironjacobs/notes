import React, {useReducer, useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@component/Layout';
import Notification from '@component/Notification';
import {SWRConfig} from 'swr';
import axios, {AxiosResponse} from 'axios';
import global from 'global';


const App = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Reducer for notification
    const initialState = {message: '', isOn: false, timeout: 0};
    const notificationReducer = (notificationState, notificationAction) => {
        switch (notificationAction.type) {
            case global.notificationActions.TEMP_NOTIFICATION:
                return {
                    message: notificationAction.payload.message,
                    isOn: true,
                    timeout: notificationAction.payload.timeout
                };
            case global.notificationActions.PERM_NOTIFICATION:
                return {
                    message: notificationAction.payload.message,
                    isOn: true,
                    timeout: notificationAction.payload.timeout
                };
            case global.notificationActions.CLOSE_NOTIFICATION:
                return initialState;
            default:
                return initialState;
        }
    }
    const [notificationState, notificationDispatch] = useReducer(notificationReducer, initialState);

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