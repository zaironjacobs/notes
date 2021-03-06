import {Content} from '@style/HeaderStyled';
import Burger from '@component/./Burger';


const Header = ({menuOpen, setMenuOpen}) => {
    return (
        <>
            <Content>
                <Burger menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <span className='logo'>Notes</span>
            </Content>
        </>
    );
}

export default Header;