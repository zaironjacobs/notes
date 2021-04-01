import React, {useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@component/Layout';
import Notification from '@component/Notification';
import {SWRConfig} from 'swr';
import axios from 'axios';


const App = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isNotificationOn, setIsNotificationOn] = useState(false);
    const [notification, setNotification] = useState('');

    const fetcher = async url => {
        const res = await axios.get(url);

        // If the status code is not in the range 200-299,
        // we still try to parse and throw it.
        if (res.status < 200 && res.status > 299) {
            const error: any = new Error('An error occurred while fetching data.')
            // Extra info
            error.info = await res.data;
            error.status = res.status;
            throw error;
        }

        return res.data;
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