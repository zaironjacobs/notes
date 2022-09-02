import styled from 'styled-components'
import { theme } from '@theme'

export const Content = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${theme.header.mobileHeight};
    background-color: ${theme.colors.blueNormal};
    padding: 0 15px 0 15px;
`

export const Logo = styled.a`
    font-family: ${theme.fonts.audiowide}, sans-serif;
    color: ${theme.colors.white};
    font-size: 24px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 3px;
    cursor: pointer;

    :hover {
        text-decoration: unset;
    }

    ${theme.media.md} {
        font-size: 32px;
    }
`
