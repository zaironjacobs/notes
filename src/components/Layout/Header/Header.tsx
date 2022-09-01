import { Content, Logo } from '@components/Layout/Header/HeaderStyled'
import { Burger } from '@components/Layout/Header/Burger'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

interface IHeaderProps {
    setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const Header = ({ setMenuOpen }: IHeaderProps) => {
    return (
        <Content>
            <Burger setMenuOpen={setMenuOpen} />
            <Link href={'/notes'}>
                <Logo>Notes</Logo>
            </Link>
        </Content>
    )
}
