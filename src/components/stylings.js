import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const PageWrapper = styled.div`
  position: relative;
  display: flex;

  .close-block {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100% - 240px);
    height: 100%;
    z-index: 10001;
    display: none;
    &.opened {
      display: block;
    }
  }
`;

const ContentListing = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  @media (min-width: 700px) {
    padding: 0 0;
  }
  .listing-info h1 {
    text-align: center;
    font-family: var(--fontMono);
    font-weight: 500;
  }
  .description {
    color: #777777;
  }
  .listings {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    li {
      display: block;
      animation: ${fadeIn} 0.5s ease-in-out;
    }
  }
`;

const OpacityWrapper = styled.div`
  opacity: 0.5;
`;

export { ContentListing, PageWrapper, OpacityWrapper };
