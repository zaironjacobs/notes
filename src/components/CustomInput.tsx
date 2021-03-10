import styled from 'styled-components';
import theme from 'theme';


export const CustomInput = styled.input`
  font-size: 18px;
  height: 45px;
  width: 100%;
  padding: 10px;
  color: ${theme.colors.black}
  font-weight: 500;
  border: 1px solid ${theme.colors.greyLight};
  border-radius: ${theme.borderRadius};
  cursor: text;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px 0 inset;

  :disabled {
    color: ${theme.colors.black};
    background-color: ${theme.colors.greyLighter};
    box-shadow: none;
  }
`;