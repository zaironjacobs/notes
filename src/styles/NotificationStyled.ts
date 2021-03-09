import styled from 'styled-components';


export const Content = styled.div`
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #a5c4ff;
  transition: transform 0.3s ease-in-out;
  display: ${({showMessage}) => showMessage ? 'flex' : 'none'};
`;