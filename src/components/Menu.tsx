import {Content, Overlay} from '@style/MenuStyled';
import Link from 'next/link';
import global from 'global';
import axios, {AxiosResponse} from 'axios';
import {useRouter} from 'next/router';
import useOnClickOutside from '@hook/useOnClickOutside';
import {useRef} from 'react';


const Menu = (props) => {
    const router = useRouter();
    const user = props.user;
    const menuNode = useRef();
    useOnClickOutside(menuNode, () => props.setMenuOpen(false));

    let initials = 'Hi';
    if (user.isLoggedIn) {
        initials = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
    }

    // Close menu
    const closeMenu = () => {
        props.setMenuOpen(false);
    }

    // Logout
    const logout = async () => {
        await axios.post(global.api.logout)
            .then(function (response: AxiosResponse) {
                router.push(global.paths.login);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Close the menu and logout the user
    const closeMenuAndLogout = async () => {
        await closeMenu();
        await logout();
    }

    return (
        <>
            <Content menuOpen={props.menuOpen} ref={menuNode}>
                <div className='name-logo-wrapper'>
                    <Link href={global.paths.home}>
                        <span onClick={closeMenu} className='name-logo'>{initials}</span>
                    </Link>
                </div>
                <ul>
                    {user.isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.home}>Home</Link></li>}
                    {user.isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.notes}>My notes</Link></li>}
                    {user.isLoggedIn && <li onClick={async () => await closeMenuAndLogout()}><a>Logout</a></li>}
                    {!user.isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.login}>Login</Link></li>}
                    {!user.isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.signUp}>Sign Up</Link></li>}
                </ul>
            </Content>
            <Overlay menuOpen={props.menuOpen}/>
        </>
    );
}

export default Menu;