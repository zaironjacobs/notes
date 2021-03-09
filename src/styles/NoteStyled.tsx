import styled from 'styled-components';
import {Main} from '@style/GlobalStyle';
import theme from 'theme';


export const MainContainer = styled(Main)`
  margin-top: 20px;
  padding: 0 15px 0 15px;
`;


export const TextArea = styled.textarea`
  width: 100%;
  height: calc(100vh - ${theme.header.mobileHeight} - 135px);
  margin-top: 10px;
  resize: none;
  padding: 10px;
  font-weight: 400;
  font-size: 18px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px 0 inset;

  :disabled {
    background-color: unset;
  }
`;


export const NoteHeaderOne = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px 0 10px;
  margin-bottom: 10px;

  .note-back {
    font-size: 30px;
    color: ${theme.colors.starCommandBlue};
    cursor: pointer;

    :hover {
      i {
        transition: .3s;
        color: ${theme.colors.royalBlueLight};
      }
    }
  }
`;


export const NoteHeaderTwo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px 0 0;
  justify-content: space-between;

  .note-name-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 750px;
    width: 100%;
    margin-right: 20px;
  }

  .note-name-input {
    font-size: 18px;
    height: 45px;
    width: 100%;
    padding: 10px;
    color: ${theme.colors.black};
    font-weight: 500;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px 0 inset;

    :disabled {
      background-color: unset;
      box-shadow: none;
    }
  }

  .note-options-wrapper {
    display: flex;
    position: relative;
  }

  .note-edit {
    font-size: 22px;
    cursor: pointer;
  }

  .note-save {
    font-size: 22px;
    right: 0;
    color: green;
    cursor: pointer;
    margin-left: 20px;
  }

  .note-trash {
    font-size: 22px;
    right: 10px;
    margin-left: 20px;
    color: red;
    cursor: pointer;
  }
`;