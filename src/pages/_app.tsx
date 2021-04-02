import React, {useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@component/Layout';
import Notification from '@component/Notification';
import {SWRConfig} from 'swr';
import axios, {AxiosResponse} from 'axios';


const App = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isNotificationOn, setIsNotificationOn] = useState(false);
    const [notification, setNotification] = useState('');

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

    // Show notification
    const showNotification = (message) => {
        setNotification(message);
        setIsNotificationOn(true);
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
                        showNotification={showNotification}
                    />

                    {/* Bottom Notification */}
                    <Notification notification={notification}
                                  isNotificationOn={isNotificationOn}
                                  setIsNotificationOn={setIsNotificationOn}
                    />
                </Layout>
            </SWRConfig>
        </>
    )
}

export default App;