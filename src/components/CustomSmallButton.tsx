import styled from 'styled-components';
import theme from 'theme';


export const CustomSmallButton = styled.button`
  cursor: pointer;
  border: none;
  height: 35px;
  max-width: 100px;
  width: 100%;
  border-radius: ${theme.borderRadius};
  outline: none;
  transition: 0.3s;
  font-size: 18px;
  font-weight: 400;
  background-color: ${theme.colors.greyLight};

  a {
    color: ${theme.colors.greyDark};
    text-decoration: none;
  }

  :hover {
    box-shadow: rgba(149, 157, 165, 0.25) 0 8px 24px;
  }
`;