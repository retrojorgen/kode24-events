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
    &.action {
      color: var(--v2-card-always-white);
    }
  }
`;

export default () => (
  <JobbMenuWrapper>
    <a
      href="https://forms.gle/yAEJPk35GqyNHay17"
      className="action button job-ad-cta"
    >
      <span role="img" aria-label="twinkle">
        ✨
      </span>{" "}
      Legg inn ditt event
    </a>
  </JobbMenuWrapper>
);
