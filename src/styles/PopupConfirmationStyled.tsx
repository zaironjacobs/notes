import styled from 'styled-components';
import theme from 'theme';


export const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999999999999;
`;


export const Popup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  max-width: 325px;
  width: 100%;
  height: auto;
  padding: 20px;
  border-radius: 20px;
  font-weight: 500;
  background: white;

  .confirmation-text {
    text-align: center;
    margin-bottom: 10px;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-evenly;
    margin-top: 10px;
  }

  .delete-note-error {
    text-align: center;
    color: ${theme.colors.redLight};
  }
`;
