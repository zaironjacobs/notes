import styled from 'styled-components';
import {Main} from '@style/GlobalStyle';
import theme from 'theme';


export const MainContainer = styled(Main)`
  margin-top: 20px;
  padding: 0 15px 0 15px;
`;


export const NoteHeaderOne = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px 0 10px;
  margin-bottom: 20px;

  .back {
    font-size: 30px;
    color: ${theme.colors.blueNormal};
    cursor: pointer;
    transition: .3s;

    :hover {
      color: ${theme.colors.blueLight};
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
      color: ${theme.colors.greyDark};
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
    transition: .3s;
    color: ${theme.colors.greyDark};

    :hover {
      color: ${theme.colors.greyNormal};
    }
  }

  .note-save {
    font-size: 22px;
    right: 0;
    color: ${theme.colors.greenNormal};
    cursor: pointer;
    transition: .3s;
    margin-left: 20px;

    :hover {
      color: ${theme.colors.greenLight}
    }
  }

  .note-trash {
    font-size: 22px;
    right: 10px;
    margin-left: 20px;
    transition: .3s;
    color: ${theme.colors.redNormal};
    cursor: pointer;

    :hover {
      color: ${theme.colors.redLight}
    }
  }
`;


export const TextArea = styled.textarea`
  width: 100%;
  height: calc(100vh - ${theme.header.mobileHeight} - 155px);
  margin-top: 10px;
  resize: none;
  padding: 10px;
  font-weight: 400;
  font-size: 18px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px 0 inset;

  :disabled {
    color: ${theme.colors.greyDark};
    background-color: unset;
  }
`;