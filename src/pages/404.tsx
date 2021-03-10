import React from 'react';
import {NotFoundWrapper, MainContainer, Button} from '@style/404Styled';
import Head from 'next/head';
import global from 'global';
import Link from 'next/link';


const Custom404 = () => {
    return (
        <>
            <MainContainer>
                <Head>
                    <title>Page not found – {global.siteName}</title>
                    <meta name='description' content='page not found'/>
                </Head>
                <NotFoundWrapper>
                    <div className='not-found-404'>404</div>
                    <div className='not-found-page'>Page Not Found</div>
                </NotFoundWrapper>
                <Button><Link href={global.paths.login}>🡠 Notes</Link></Button>
            </MainContainer>
        </>
    );
}

export default Custom404;