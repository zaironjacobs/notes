import { Button, Span } from '@components/Layout/Header/Burger/BurgerStyled'
import { Dispatch, SetStateAction } from 'react'

interface IBurgerProps {
    setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const Burger = ({ setMenuOpen }: IBurgerProps) => {
    return (
        <Button onClick={() => setMenuOpen((prev) => !prev)}>
            <Span />
            <Span />
            <Span />
        </Button>
    )
}
