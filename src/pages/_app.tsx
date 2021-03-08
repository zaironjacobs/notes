import {useRef, useState} from 'react';
import {GlobalStyle} from '@style/GlobalStyle';
import Layout from '@component/Layout';
import useOnClickOutside from '@hook/useOnClickOutside';


const App = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuNode = useRef();
    useOnClickOutside(menuNode, () => setMenuOpen(false));
    const fetcher = url => fetch(url).then(r => r.json());

    return (
        <>
            <GlobalStyle/>
            <Layout>
                <props.Component
                    {...props.pageProps}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    menuNode={menuNode}
                />
            </Layout>
        </>
    )
}

export default App;