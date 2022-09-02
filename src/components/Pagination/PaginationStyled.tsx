import styled from 'styled-components'
import { theme } from '@theme'

interface IBoxFirstProps {
    backIsEnabled: boolean
}

interface IBoxLastProps {
    nextIsEnabled: boolean
}

interface IBoxInnerProps {
    active: boolean
    isNaN: boolean
}

export const Wrapper = styled.nav`
    display: flex;
    justify-content: center;
    margin: 35px 0 35px 0;

    * {
        margin: 0 5px 0 5px;
    }
`

export const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: ${theme.colors.grayLighter};
    font-size: 16px;
    border-radius: 5px;

    ${theme.media.sm} {
        width: 45px;
        height: 45px;
    }
`

export const BoxPrevious = styled(Box)<IBoxFirstProps>`
    margin: 0 5px 0 0;
    cursor: ${(props) => (props.backIsEnabled ? 'pointer' : undefined)};
    color: ${(props) => (props.backIsEnabled ? undefined : theme.colors.grayLight)};

    :hover {
        background-color: ${(props) => (props.backIsEnabled ? theme.colors.blueLighter : theme.colors.grayLighter)};
    }
`

export const BoxNext = styled(Box)<IBoxLastProps>`
    margin: 0 0 0 5px;
    cursor: ${(props) => (props.nextIsEnabled ? 'pointer' : undefined)};
    color: ${(props) => (props.nextIsEnabled ? undefined : theme.colors.grayLight)};

    :hover {
        background-color: ${(props) => (props.nextIsEnabled ? theme.colors.blueLighter : theme.colors.grayLighter)};
    }
`

export const BoxInner = styled(Box)<IBoxInnerProps>`
    color: ${(props) => (props.active ? theme.colors.white : undefined)};
    background-color: ${(props) => (props.active ? theme.colors.blueLight : undefined)};
    cursor: ${(props) => (props.isNaN ? 'default' : 'pointer')};

    :hover {
        background-color: ${(props) => (props.isNaN ? undefined : theme.colors.blueLighter)};
    }
`
