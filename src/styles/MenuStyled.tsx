import styled from 'styled-components';
import theme from 'theme';


export const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 200px;
  width: 100%;
  background-color: ${theme.colors.royalBlueLight};
  box-shadow: ${({menuOpen}) => menuOpen ? 'rgba(0, 0, 0, 0.15) 0 5px 15px;' : 'rgba(0, 0, 0, 0) 0 5px 15px;'};
  transition: transform 0.3s ease-in-out;
  transform: ${({menuOpen}) => menuOpen ? 'translateX(0)' : 'translateX(-100%)'};
  z-index: 999999999;

  ul {
    list-style-type: none;
    margin: 0 0 0 30px;
    padding: 30px 0 0 0;

    li {
      margin-bottom: 25px;
      color: ${theme.colors.lightGrey};
      font-size: 24px;
      font-weight: 400;
      width: fit-content;
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

  .name-logo-wrapper {
    height: 75px;
    margin-left: 30px;
    margin-top: 35px;
    width: fit-content;
    cursor: pointer;
  }

  .name-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65px;
    width: 65px;
    font-size: 20px;
    font-weight: 500;
    color: ${theme.colors.white};
    background-color: ${theme.colors.starCommandBlue};
    border-radius: 50%;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({menuOpen}) => menuOpen ? 'block' : 'none'};
  z-index: 99999999;
`;

