import styled from 'styled-components'
import { theme } from '@theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Content = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${theme.footer.mobileHeight};
    background-color: ${theme.colors.white};
    border-top: 1px solid ${theme.colors.grayLight};
    padding: 15px 15px 15px 15px;
`

export const GitHubIconWrapper = styled.div`
    margin-bottom: 10px;
`

export const GitHubIcon = styled(FontAwesomeIcon)`
    color: ${theme.colors.grayDark};
    font-size: 25px;
    transition: 0.3s;

    :hover {
        color: ${theme.colors.blueLight};
    }
`

export const BuiltBy = styled.a`
    color: ${theme.colors.grayDark};
    cursor: pointer;
    transition: 0.3s;

    :hover {
        color: ${theme.colors.blueLight};
    }
`
