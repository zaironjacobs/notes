import React, {useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@component/Layout';
import Notification from '@component/Notification';


const App = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isNotificationOn, setIsNotificationOn] = useState(false);
    const [notification, setNotification] = useState('');

    const showNotification = (message) => {
        setNotification(message);
        setIsNotificationOn(true);
    }

    return (
        <>
            <GlobalStyle/>
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
                              setIsNotificationOn={setIsNotificationOn}/>
            </Layout>
        </>
    )
}

export default App;