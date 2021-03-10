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
  height: 40px;

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