import styled from "styled-components"

// This is an eleemnt imported by various components when executing a fetch.

//Element fixed in center of screen

//Styling

const Loading = styled.div `
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 10rem;
    height: 10rem;
    border: 6px solid #f3f3f3;
    border-top: 11px solid #383636;
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
    @keyframes spinner {
      0% {
      transform: rotate(0deg);
      }
      100% {
      transform: rotate(360deg);
      }
    }
  `

export default Loading //Default loading 



export const Loading2 = styled.div ` //Static Loading animation
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #383636;
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
    @keyframes spinner {
      0% {
      transform: rotate(0deg);
      }
      100% {
      transform: rotate(360deg);
      }
    }
  ` 