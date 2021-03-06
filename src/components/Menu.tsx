import {Content} from '@style/MenuStyled';
import Link from 'next/link';
import global from 'global';
import axios, {AxiosResponse} from 'axios';
import {useRouter} from 'next/router';


const Menu = (props) => {
    const router = useRouter();
    const user = props.user;

    let initials = 'Hi';
    if (user.isLoggedIn) {
        initials = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
    }

    const closeMenu = () => {
        props.setMenuOpen(false);
    }

    const logout = async () => {
        await axios.post(global.api.logout)
            .then(function (response: AxiosResponse) {
                router.push(global.paths.login);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const closeMenuAndLogout = async () => {
        await closeMenu();
        await logout();
    }

    return (
        <>
            <Content menuOpen={props.menuOpen}>

                <div className='name-logo-wrapper'>
                    <span className='name-logo'>{initials}</span>
                </div>

                <ul>
                    {user.isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.home}>Home</Link></li>}
                    {user.isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.home}>All notes</Link></li>}
                    {user.isLoggedIn && <li onClick={async () => await closeMenuAndLogout()}>Logout</li>}
                    {!user.isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.login}>Login</Link></li>}
                    {!user.isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.signUp}>Sign Up</Link></li>}
                </ul>
            </Content>
        </>
    );
}

export default Menu;