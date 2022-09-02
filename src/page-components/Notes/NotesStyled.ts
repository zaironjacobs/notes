import styled from 'styled-components'
import { theme } from '@theme'

export const Wrapper = styled.div`
    padding-top: 2rem;
    max-width: 64rem;
    width: 100%;
`

export const NotesHeaderOne = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px 0 10px;
    margin-bottom: 25px;
    height: 40px;
`

export const InputFile = styled.input.attrs({ type: 'file' })`
    display: none;
`

export const NotesHeaderOneLeft = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`

export const NoteNew = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
    margin-left: 25px;
    color: ${theme.colors.greenNormal};

    ::after {
        content: 'new';
        display: block;
        font-size: 14px;
    }

    :hover {
        color: ${theme.colors.greenLight};
    }

    ${theme.media.md} {
        font-size: 34px;
    }
`

export const NoteUpload = styled.div`
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
    transition: 0.3s;
    margin-left: 25px;
    color: ${theme.colors.grayDark};

    ::after {
        content: 'upload';
        display: block;
        font-size: 14px;
    }

    :hover {
        color: ${theme.colors.grayNormal};
    }

    ${theme.media.md} {
        font-size: 34px;
    }
`

export const NoteTrash = styled.div`
    text-align: center;
    align-self: flex-end;
    font-size: 24px;
    font-weight: 600;
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

    ${theme.media.md} {
        font-size: 34px;
    }
`

export const NotesHeaderTwo = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
`

export const AllNotesCheckbox = styled.input.attrs({ type: 'checkbox' })`
    cursor: pointer;
    margin-right: 25px;
`

export const SingleNote = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 18px;
    height: 45px;
    border-bottom: 1px solid ${theme.colors.grayDark};
    margin-bottom: 1rem;
    transition: 0.1s ease-in-out;

    :hover {
        background-color: ${theme.colors.grayLighter};
    }
`

export const InputCheckbox = styled.input.attrs({ type: 'checkbox' })`
    margin-right: 25px;
    cursor: pointer;
`

export const NoteName = styled.a`
    font-weight: 600;
    width: 100%;
    padding: 8px 3px 8px 3px;
    cursor: pointer;

    ${theme.media.md} {
        font-size: 20px;
    }
`

export const Title = styled.h1`
    font-size: 20px;
    font-weight: 600;

    ${theme.media.md} {
        font-size: 32px;
    }
`
