import '@styles/fonts.scss'
import App, { AppContext, AppProps } from 'next/app'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@libs/with-session'
import React, { useState } from 'react'
import { IUser } from '@interfaces'
import { GlobalStyle } from '@styles/GlobalStyle'
import { Layout } from '@components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContext } from '@contexts/User/UserContext'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

fontAwesomeConfig.autoAddCss = false

const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
    user: IUser
}

export const MyApp = ({ Component, pageProps, user }: MyAppProps) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={user}>
                <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
                    <QueryClientProvider client={queryClient}>
                        <Component {...pageProps} />
                    </QueryClientProvider>
                </Layout>
            </UserContext.Provider>
        </>
    )
}

export default MyApp

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)

    if (appContext.ctx.req && appContext.ctx.res) {
        const { user } = await getIronSession(appContext.ctx.req, appContext.ctx.res, sessionOptions)

        return {
            ...appProps,
            user,
        }
    }

    return appProps
}
