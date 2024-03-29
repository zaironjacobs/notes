import styled from 'styled-components';
import theme from 'theme';


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
`;