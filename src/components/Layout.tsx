import Head from 'next/head'
import global from 'global'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>{global.siteName}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="description" content="Notes" />
            </Head>

            {/* Children */}
            {children}
        </>
    )
}

export default Layout
