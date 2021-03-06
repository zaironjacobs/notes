import {useState, useRef} from 'react';
import Head from 'next/head';
import global from 'global';
import {Content} from '@style/LayoutStyled';
import useOnClickOutside from '@hook/useOnClickOutside';


const Layout = ({children}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuNode = useRef();
    useOnClickOutside(menuNode, () => setMenuOpen(false));

    return (
        <>
            <Head>
                <title>{global.siteName}</title>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8'/>
                <link rel='preconnect' href='https://fonts.gstatic.com'/>
                <link href='https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap'
                      rel='stylesheet'/>
                <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet"/>
                <link
                    rel='stylesheet'
                    href='https://use.fontawesome.com/releases/v5.15.1/css/all.css'
                    integrity='sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp'
                    crossOrigin='anonymous'/>
            </Head>

            <Content>
                {children}
            </Content>
        </>
    );
}

export default Layout;