import styled from 'styled-components';
import theme from 'theme';


export const Content = styled.div`
  position: absolute;
  display: flex;
  height: 100vh;
  max-width: 200px;
  width: 100%;
  background-color: ${theme.colors.royalBlueLight};
  z-index: 999999;
  transition: transform 0.3s ease-in-out;
  transform: ${({menuOpen}) => menuOpen ? 'translateX(0)' : 'translateX(-100%)'};

  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    width: 100%;
    margin: 70px 0 0 30px;
    padding: 30px 0 0 0;

    li {
      margin-bottom: 25px;
      color: ${theme.colors.lightGrey};
      font-size: 24px;
      font-weight: 400;
      cursor: pointer;

      a {
        color: ${theme.colors.lightGrey};
        font-size: 24px;
        font-weight: 400;
      }

      :last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

