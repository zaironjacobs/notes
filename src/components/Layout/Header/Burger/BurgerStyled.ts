import styled from 'styled-components'
import { theme } from '@theme'

export const Button = styled.button`
    position: absolute;
    left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    &:focus {
        outline: none;
    }
`

export const Span = styled.span`
    width: 2rem;
    height: 0.25rem;
    background-color: ${theme.colors.white};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
`
