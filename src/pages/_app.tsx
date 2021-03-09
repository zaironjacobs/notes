import {useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@component/Layout';


const App = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <GlobalStyle/>
            <Layout>
                <props.Component
                    {...props.pageProps}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />
            </Layout>
        </>
    )
}

export default App;