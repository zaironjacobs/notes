import styled from 'styled-components'
import { theme } from '@theme'

export const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    margin: 1rem 0 1rem 0;
`

export const Form = styled.form`
    max-width: 375px;
    display: flex;
    width: 100%;
    flex-direction: column;
`

export const InputWrapper = styled.div`
    margin-bottom: 1rem;
`

export const Input = styled.input`
    width: 100%;
    height: 45px;
    padding: 8px;
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.grayDark};
    margin-top: 20px;

    :first-of-type {
        margin-top: 0;
    }
`

export const InputError = styled.p`
    color: ${theme.colors.redLight};
    font-size: 14px;
    margin-top: 5px;

    :before {
        content: '\\00a0';
    }
`
export const NoAccountWrapper = styled.div`
    margin: 20px 0 20px 0;
`

export const Error = styled.p`
    margin-top: 0.5rem;
    text-align: center;
    color: ${theme.colors.redLight};
`
