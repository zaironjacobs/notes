import styled from 'styled-components'
import { theme } from '@theme'

export const Content = styled.nav`
    display: flex;
    justify-content: center;
    margin: 35px 0 35px 0;

    * {
        margin: 0 5px 0 5px;
    }

    .first-child {
        margin: 0 5px 0 0;
    }

    .last-child {
        margin: 0 0 0 5px;
    }

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        background-color: ${theme.colors.grayLighter};
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;

        ${theme.media._480px} {
            width: 45px;
            height: 45px;
        }

        :hover {
            background-color: ${theme.colors.blueLighter};
        }
    }

    .active {
        color: ${theme.colors.white};
        background-color: ${theme.colors.blueLight};
    }

    .isNaN {
        cursor: default;

        :hover {
            background-color: ${theme.colors.grayLighter};
        }
    }

    .disabled-x-than {
        color: ${theme.colors.grayLight};
        cursor: unset;

        :hover {
            background-color: ${theme.colors.grayLighter};
        }
    }
`
