import styled from 'styled-components'
import { theme } from '@theme'

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 1rem;
    width: 100%;
`

export const NotFoundCode = styled.p`
    font-size: 100px;
    line-height: 1;
    text-transform: uppercase;

    ${theme.media.md} {
        font-size: 140px;
    }

    ${theme.media.xl} {
        font-size: 160px;
    }
`

export const NotFoundText = styled.p`
    font-size: 20px;
    text-transform: uppercase;

    ${theme.media.md} {
        font-size: 24px;
    }

    ${theme.media.xl} {
        font-size: 26px;
    }
`

export const Button = styled.button`
    cursor: pointer;
    border: none;
    height: 45px;
    max-width: 100px;
    width: 100%;
    border-radius: ${theme.borderRadius};
    outline: none;
    transition: 0.3s;
    font-size: 18px;

    :hover {
        box-shadow: rgba(149, 157, 165, 0.18) 0 8px 24px;
    }

    ${theme.media.md} {
        max-width: 135px;
        height: 50px;
        font-size: 24px;
        padding-bottom: 3px;
    }
`
