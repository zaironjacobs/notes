import {Content} from '@style/HeaderStyled';
import Burger from '@component/Burger';


const Header = (props) => {
    return (
        <>
            <Content>
                <Burger menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}/>
                <span className='logo'>Notes</span>
            </Content>
        </>
    );
}

export default Header;