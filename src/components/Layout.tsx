import Head from 'next/head';
import global from 'global';
import React from 'react';


const Layout = ({children}) => {

    return (
        <>
            <Head>
                <title>{global.siteName}</title>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8'/>
                <link rel="icon" type="image/png" sizes="32x32" href='/favicon-32x32.png'/>
                <link rel="icon" type="image/png" sizes="16x16" href='/favicon-16x16.png'/>
                <link rel="apple-touch-icon" sizes="180x180" href='/apple-touch-icon.png'/>
                <link rel="manifest" href='/site.webmanifest'/>
                <meta name='description' content='Notes'/>
                <link rel='preconnect' href='https://fonts.gstatic.com'/>
                <link href='https://fonts.googleapis.com/css2?family=Audiowide&display=swap'
                      rel='stylesheet'/>
                <link href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap'
                      rel='stylesheet'/>
                <link
                    rel='stylesheet'
                    href='https://use.fontawesome.com/releases/v5.15.1/css/all.css'
                    integrity='sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp'
                    crossOrigin='anonymous'/>
            </Head>

            {/* Children */}
            {children}
        </>
    );
}

export default Layout;