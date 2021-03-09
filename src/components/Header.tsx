import {Content} from '@style/HeaderStyled';
import Burger from '@component/Burger';
import Link from 'next/link';
import global from 'global';


const Header = (props) => {
    return (
        <>
            <Content>
                <Burger menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}/>
                <Link href={global.paths.home}><span className='logo'>Notes</span></Link>
            </Content>
        </>
    );
}

export default Header;