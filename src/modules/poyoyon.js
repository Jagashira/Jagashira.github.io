import styled, { keyframes } from "styled-components";
export const boundanim = keyframes`
  0%,100% {top: 0;transform: scale(1);}
  30% {top: -25%;}
  50% {transform: scale(1);}
  90% {top: 0;transform: scale(1.2,0.8);}
`;
export const Bound = styled.p`
  span {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 50px;
    margin: auto;

    color: #501bc1;
    text-align: center;

    &:nth-child(1) {
      left: -6.3em;
      animation: ${boundanim} 1.6s 0s infinite;
    }
    &:nth-child(2) {
      left: -4.5em;
      animation: ${boundanim} 1.6s 0.1s infinite;
    }
    &:nth-child(3) {
      left: -3em;
      animation: ${boundanim} 1.6s 0.2s infinite;
    }
    &:nth-child(4) {
      left: -1.5em;
      animation: ${boundanim} 1.6s 0.3s infinite;
    }
    &:nth-child(5) {
      left: 0em;
      animation: ${boundanim} 1.6s 0.4s infinite;
    }
    &:nth-child(6) {
      left: 1.5em;
      animation: ${boundanim} 1.6s 0.5s infinite;
    }
    &:nth-child(7) {
      left: 3em;
      animation: ${boundanim} 1.6s 0.6s infinite;
    }
    &:nth-child(8) {
      left: 4.5em;
      animation: ${boundanim} 1.6s 0.7s infinite;
    }
    &:nth-child(9) {
      left: 6em;
      animation: ${boundanim} 1.6s 0.8s infinite;
    }
  }
`;
