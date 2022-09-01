import styled from 'styled-components'
import { theme } from '@theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Wrapper = styled.div`
    max-width: 64rem;
    width: 100%;
`
export const NoteHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px 0 10px;
    margin-top: 15px;
    margin-bottom: 15px;
`

export const NoteEdit = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
    margin-left: 25px;
    color: ${theme.colors.greyDark};

    :hover {
        color: ${theme.colors.greyNormal};
    }

    :after {
        content: 'edit';
        display: block;
        font-size: 14px;
    }

    ${theme.media._768px} {
        font-size: 32px;
    }
`

export const NoteLock = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
    margin-left: 25px;
    color: ${theme.colors.greyDark};

    :hover {
        color: ${theme.colors.greyNormal};
    }

    :after {
        content: 'lock';
        display: block;
        font-size: 14px;
    }

    ${theme.media._768px} {
        font-size: 32px;
    }
`

export const NoteOptionsWrapper = styled.div`
    display: flex;
    justify-content: end;
    position: relative;
`
export const NoteTrash = styled.div`
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    right: 10px;
    margin-left: 25px;
    transition: 0.3s;
    color: ${theme.colors.redNormal};
    cursor: pointer;

    :after {
        content: 'delete';
        display: block;
        font-size: 14px;
    }

    :hover {
        color: ${theme.colors.redLight};
    }

    ${theme.media._768px} {
        font-size: 32px;
    }
`

export const NoteSave = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    right: 0;
    color: ${theme.colors.greenNormal};
    cursor: pointer;
    transition: 0.3s;
    margin-left: 25px;

    :after {
        content: 'save';
        display: block;
        font-size: 14px;
    }

    :hover {
        color: ${theme.colors.greenLight};
    }

    ${theme.media._768px} {
        font-size: 32px;
    }
`

export const NoteNameWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const NoteInput = styled.input`
    font-size: 18px;
    font-weight: 600;
    height: 45px;
    width: 100%;
    padding: 10px;
    color: ${theme.colors.black};
    border: 1px solid ${theme.colors.greyLight};
    border-radius: ${theme.borderRadius};
    cursor: text;
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px 0 inset;

    :disabled {
        color: ${theme.colors.black};
        background-color: ${theme.colors.greyLighter};
        box-shadow: none;
    }
`

export const NoteTextArea = styled.textarea`
    width: 100%;
    height: calc(100vh - ${theme.header.mobileHeight} - 280px);
    margin-top: 10px;
    resize: none;
    padding: 10px;
    font-weight: 400;
    font-size: 18px;
    border: 1px solid ${theme.colors.greyLight};
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.black};
    cursor: text;
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px 0 inset;

    :disabled {
        color: ${theme.colors.black};
        background-color: ${theme.colors.greyLighter};
        box-shadow: none;
    }
`

export const Loading = styled.div`
    margin-top: 1rem;
`

export const Form = styled.form`
    width: 100%;
`

export const Back = styled(FontAwesomeIcon)`
    font-size: 36px;
    color: ${theme.colors.blueNormal};
    cursor: pointer;
    transition: 0.3s;

    :hover {
        color: ${theme.colors.blueLight};
    }

    ${theme.media._768px} {
        font-size: 40px;
    }
`
