import styled from 'styled-components';
import {Main as M, PageWrapper as PW} from '@style/GlobalStyle';
import theme from 'theme';


export const Main = styled(M)``;


export const PageWrapper = styled(PW)``;


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

    ${theme.media._768px} {
      font-size: 38px;
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
    max-width: 950px;
    width: 100%;
    margin-right: 20px;
  }

  .note-options-wrapper {
    display: flex;
    position: relative;
  }

  .note-edit {
    text-align: center;
    font-size: 22px;
    cursor: pointer;
    transition: .3s;
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
  }

  .note-save {
    text-align: center;
    font-size: 22px;
    right: 0;
    color: ${theme.colors.greenNormal};
    cursor: pointer;
    transition: .3s;
    margin-left: 15px;

    :after {
      content: 'save';
      display: block;
      font-size: 14px;
    }

    :hover {
      color: ${theme.colors.greenLight}
    }

    ${theme.media._768px} {
      font-size: 32px;
    }
  }

  .note-trash {
    text-align: center;
    font-size: 22px;
    right: 10px;
    margin-left: 15px;
    transition: .3s;
    color: ${theme.colors.redNormal};
    cursor: pointer;

    :after {
      content: 'delete';
      display: block;
      font-size: 14px;
    }

    :hover {
      color: ${theme.colors.redLight}
    }

    ${theme.media._768px} {
      font-size: 32px;
    }
  }
`;