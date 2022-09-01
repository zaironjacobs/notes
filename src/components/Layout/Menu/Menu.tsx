import { Content, LogoText, LogoWrapper, MenuLi, MenuLiA, MenuUl, Overlay } from '@components/Layout/Menu/MenuStyled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useOnClickOutside } from '@hooks/use-on-click-outside'
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { logout } from '@services/api'
import { UserContext } from '@contexts/User'

interface IMenuProps {
    menuOpen: boolean
    setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const Menu = ({ menuOpen, setMenuOpen }: IMenuProps) => {
    const router = useRouter()
    const menuNode = useRef<any>(undefined as any)
    useOnClickOutside([menuNode], () => setMenuOpen(false))
    const [initials, setInitials] = useState<string>('You')
    const user = useContext(UserContext)

    useEffect(() => {
        if (!user) return
        setInitials(user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase())
    }, [user])

    // Close menu
    function closeMenu() {
        setMenuOpen(false)
    }

    // Logout
    async function onLogoutClick() {
        closeMenu()
        await logout()
            .then(() => router.push('/login').then())
            .catch(() => {})
    }

    return (
        <>
            <Content menuOpen={menuOpen} ref={menuNode}>
                <LogoWrapper>
                    <Link href={'/notes'}>
                        <LogoText>
                            <span onClick={closeMenu}>{initials}</span>
                        </LogoText>
                    </Link>
                </LogoWrapper>
                <MenuUl>
                    {user && (
                        <>
                            <MenuLi onClick={closeMenu}>
                                <Link href={'/notes'}>
                                    <MenuLiA>My notes</MenuLiA>
                                </Link>
                            </MenuLi>
                            <MenuLi onClick={async () => await onLogoutClick()}>
                                <MenuLiA>Logout</MenuLiA>
                            </MenuLi>
                        </>
                    )}
                    {!user && (
                        <>
                            <MenuLi onClick={closeMenu}>
                                <Link href={'/login'}>
                                    <MenuLiA>Login</MenuLiA>
                                </Link>
                            </MenuLi>
                            <MenuLi onClick={closeMenu}>
                                <Link href={'/sign-up'}>
                                    <MenuLiA>Sign Up</MenuLiA>
                                </Link>
                            </MenuLi>
                        </>
                    )}
                </MenuUl>
            </Content>
            <Overlay menuOpen={menuOpen} />
        </>
    )
}
