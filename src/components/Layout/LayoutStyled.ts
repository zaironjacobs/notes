import styled from 'styled-components'
import { theme } from '@theme'

export const Wrapper = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0 15px 0 15px;
    min-height: calc(100vh - ${theme.header.mobileHeight} - ${theme.footer.mobileHeight});
`
