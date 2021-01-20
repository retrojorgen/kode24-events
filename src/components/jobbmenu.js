import styled from "styled-components";
import React from "react";
const JobbMenuWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  @media (min-width: 700px) {
    flex-direction: row;
  }
  a {
    display: inline-block;
    padding: 10px 22px;
    background: #111;
    border-radius: 10px;

    text-align: center;
    color: white !important;

    @media (min-width: 700px) {
      text-align: left;
      margin-right: 10px;
    }
    &.action {
      background-color: var(--kode24-purple);
    }
  }
`;

export default () => (
  <JobbMenuWrapper>
    <a href="https://forms.gle/TezisQABkb8ZfWGi7" className="action">
      <span role="img" aria-label="twinkle">
        ✨
      </span>{" "}
      Legg inn ditt event
    </a>
  </JobbMenuWrapper>
);
