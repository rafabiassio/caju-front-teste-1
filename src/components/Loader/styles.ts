import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div`
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7); 
  z-index: 9999; 
  overflow: hidden;
`;

export const LoaderContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const LoaderImage = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  background-image: url('/caju.ico'); 
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LoaderCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(0deg, #ffffff 50%, #ff8858 100%);
  animation: ${spin} 1s linear infinite;
`;

