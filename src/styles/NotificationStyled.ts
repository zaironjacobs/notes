import styled from 'styled-components'
import theme from 'theme'

export const Content = styled.div`
    position: fixed;
    bottom: 0;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    color: ${theme.colors.greyDark};
    background-color: ${theme.colors.greyLight};
    transition: transform 0.3s ease-in-out;
    display: ${({ isNotificationOn }) => (isNotificationOn ? 'flex' : 'none')};
`
