import styled from 'styled-components'
import { theme } from '@theme'

export const Button = styled.button`
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: ${theme.borderRadius};
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    color: ${theme.colors.white};
    background-color: ${theme.colors.blueNormal};
    cursor: pointer;
    font-size: 20px;
    max-width: 385px;
    width: 100%;
    font-weight: 400;
    outline: none;
    transition: 0.3s;
    border: none;

    :hover {
        background-color: ${theme.colors.blueLight};
    }
`
