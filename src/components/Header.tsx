import { Content } from '@styles/HeaderStyled'
import Burger from '@components/Burger'
import Link from 'next/link'
import global from 'global'

const Header = (props) => {
    return (
        <>
            <Content>
                <Burger menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} />
                <Link href={global.paths.notes}>
                    <a className="logo">
                        <span>Notes</span>
                    </a>
                </Link>
            </Content>
        </>
    )
}

export default Header
