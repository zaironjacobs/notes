import Head from 'next/head'
import { global } from '@global'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Footer } from '@components/Layout/Footer/Footer'
import { Header } from '@components/Layout/Header/Header'
import { Menu } from '@components/Layout/Menu'
import { Wrapper } from '@components/Layout/LayoutStyled'

interface ILayoutProps {
    children: ReactNode
    menuOpen: boolean
    setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const Layout = ({ children, menuOpen, setMenuOpen }: ILayoutProps) => {
    return (
        <>
            {/* Title */}
            <Head>
                <title>{global.siteName}</title>
            </Head>

            {/* Menu */}
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {/* Header */}
            <Header setMenuOpen={setMenuOpen} />

            {/* Page content */}
            <Wrapper>{children}</Wrapper>

            {/* Footer */}
            <Footer />
        </>
    )
}
