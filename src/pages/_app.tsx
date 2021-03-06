import {useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@component/Layout';
import IsLoggedInContext from '@component/IsLoggedInContext';


const App = ({Component, pageProps}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <GlobalStyle/>
            <IsLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </IsLoggedInContext.Provider>
        </>
    )
}

export default App;