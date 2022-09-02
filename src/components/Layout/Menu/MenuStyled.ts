import styled from 'styled-components'
import { theme } from '@theme'

interface IContentProps {
    menuOpen: boolean
}

interface IOverlayProps {
    menuOpen: boolean
}

export const Content = styled.nav<IContentProps>`
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 200px;
    width: 100%;
    background-color: ${theme.colors.blueNormal};
    box-shadow: ${({ menuOpen }) => (menuOpen ? 'rgba(0, 0, 0, 0.15) 0 5px 15px;' : 'rgba(0, 0, 0, 0) 0 5px 15px;')};
    transition: transform 0.3s ease-in-out;
    transform: ${({ menuOpen }) => (menuOpen ? 'translateX(0)' : 'translateX(-100%)')};
    z-index: 999999999;

    ${theme.media.md} {
        max-width: 300px;
    }
`

export const LogoWrapper = styled.div`
    height: 75px;
    margin-left: 30px;
    margin-top: 35px;
    width: fit-content;
    cursor: pointer;
`

export const LogoText = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65px;
    width: 65px;
    font-size: 20px;
    font-weight: 500;
    color: ${theme.colors.white};
    background-color: ${theme.colors.blueLight};
    border-radius: 50%;
    transition: 0.3s;
    text-decoration: unset;

    ${theme.media.md} {
        font-size: 32px;
        height: 85px;
        width: 85px;
    }
`

export const MenuUl = styled.ul`
    list-style-type: none;
    margin: 0 0 0 30px;
    padding: 30px 0 0 0;

    ${theme.media.md} {
        padding: 45px 0 0 0;
    }
`

export const MenuLi = styled.li`
    margin-bottom: 25px;
    color: ${theme.colors.white};
    font-size: 24px;
    font-weight: 400;
    width: fit-content;
    cursor: pointer;

    :last-of-type {
        margin-bottom: 0;
    }
`

export const MenuLiA = styled.a`
    color: ${theme.colors.white};
    font-size: 24px;
    font-weight: 400;
    text-decoration: none;

    ${theme.media.md} {
        font-size: 30px;
    }
`

export const Overlay = styled.div<IOverlayProps>`
    position: absolute;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};
    z-index: 99999999;
`
