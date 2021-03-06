import {Content} from '@style/MenuStyled';
import Link from 'next/link';
import global from 'global';
import axios, {AxiosResponse} from 'axios';
import {useRouter} from 'next/router';
import {useContext} from 'react';
import IsLoggedInContext from '@component/IsLoggedInContext';


const Menu = (props) => {
    const router = useRouter();
    const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);

    const closeMenu = () => {
        props.setMenuOpen(false);
    }

    const logout = async () => {
        await axios.post(global.api.logout)
            .then(function (response: AxiosResponse) {
                setIsLoggedIn(false);
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
                <ul>
                    {isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.home}>Home</Link></li>}
                    {isLoggedIn && <li onClick={closeMenu}><Link href={global.paths.home}>All notes</Link></li>}
                    {isLoggedIn && <li onClick={async () => await closeMenuAndLogout()}>Logout</li>}
                </ul>
            </Content>
        </>
    );
}

export default Menu;