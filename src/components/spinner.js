import styled, { keyframes } from "styled-components";
const animateWidth = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`;

const Spinner = styled.div`
  position: relative;
  text-align: center;
  &:before {
    content: "";
    width: 0;
    height: 20px;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(45deg, #c431e3, #ff8d00);
    animation: ${animateWidth} 2s linear forwards;
  }
`;

export default Spinner;
