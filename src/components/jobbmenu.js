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
    text-decoration: none;
    border: 0;
  }
`;

export default () => (
  <JobbMenuWrapper>
    <a
      href="https://forms.gle/TezisQABkb8ZfWGi7"
      className="action button job-ad-cta"
    >
      <span role="img" aria-label="twinkle">
        ✨
      </span>{" "}
      Legg inn ditt event
    </a>
  </JobbMenuWrapper>
);
