import { Button } from '@style/BurgerStyled'

const Burger = (props) => {
    return (
        <>
            <Button menuOpen={props.menuOpen} onClick={() => props.setMenuOpen(!props.menuOpen)}>
                <span />
                <span />
                <span />
            </Button>
        </>
    )
}

export default Burger
