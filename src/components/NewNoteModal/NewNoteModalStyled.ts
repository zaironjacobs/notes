import styled from 'styled-components'
import { theme } from '@theme'

export const Overlay = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
`

export const Modal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    padding: 20px;
    max-width: 325px;
    width: 100%;
    height: auto;
    border-radius: 20px;
    font-weight: 500;
    background: white;
    z-index: 9999;
`

export const Title = styled.h3`
    text-align: center;
    margin-bottom: 15px;
    width: 100%;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Input = styled.input`
    box-shadow: rgba(0, 0, 0, 0.07) 0 2px 4px 0 inset;
    border: 1px solid ${theme.colors.grayLight};
    border-radius: ${theme.borderRadius};
    padding: 10px;
    margin-bottom: 0.5rem;
    width: 100%;
`

export const InputWrapper = styled.div`
    margin-bottom: 1rem;
`

export const InputError = styled.p`
    color: ${theme.colors.redLight};
    font-size: 14px;
`
