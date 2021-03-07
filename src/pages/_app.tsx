import {useRef, useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@component/Layout';
import useOnClickOutside from '@hook/useOnClickOutside';
import {SWRConfig} from 'swr'
import fetch from 'unfetch';


const App = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuNode = useRef();
    useOnClickOutside(menuNode, () => setMenuOpen(false));
    const fetcher = url => fetch(url).then(r => r.json());

    return (
        <>
            <GlobalStyle/>
            <SWRConfig value={{refreshInterval: 3000, fetcher: fetcher}}>
                <Layout>
                    <props.Component
                        {...props.pageProps}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        menuNode={menuNode}
                    />
                </Layout>
            </SWRConfig>
        </>
    )
}

export default App;