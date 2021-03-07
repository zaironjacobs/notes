import styled from 'styled-components';
import {Main} from '@style/GlobalStyle';
import theme from 'theme';


export const MainContainer = styled(Main)`
  margin-top: 10px;
  padding: 0 15px 0 15px;
`;


export const TextArea = styled.textarea`
  width: 100%;
  height: calc(100vh - ${theme.header.mobileHeight} - 115px);
  margin-top: 10px;
  resize: none;
  padding: 10px;
  font-weight: 400;
  font-size: 18px;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px 0 inset;
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
  padding: 0 10px 0 10px;

  .note-name {
    margin-right: auto;
    font-size: 20px;
    font-weight: 600;
    position: relative;
  }

  .note-options {
    display: flex;
    position: relative;
  }

  .note-save {
    font-size: 22px;
    right: 0;
    color: green;
    cursor: pointer;
  }

  .note-trash {
    font-size: 22px;
    right: 10px;
    margin-left: 30px;
    color: red;
    cursor: pointer;
  }
`;