import React from "react";
import styled from "styled-components";
import CompanyImage from "./companyImage";
const EventWrapper = styled.a`
  padding: 1.25rem;
  border-radius: 10px;
  background: var(--v2-card-background);
  display: flex;
  width: 100%;
  -webkit-box-align: stretch;
  align-items: stretch;
  margin-bottom: 10px;
  cursor: pointer;
  &.premium {
    background: linear-gradient(
      45deg,
      var(--card-highlight-gradient-left),
      var(--card-highlight-gradient-right)
    );
    &:hover {
      filter: brightness(1.2);
    }
  }
  h3 {
    background-color: transparent;
    padding: 0px;
    margin-bottom: 0.4rem;
    color: var(--v2-card-paragraph-color);
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-top: 0px;
    letter-spacing: 0.1em;
    border-radius: 10px;
    display: inline-block;
    font-weight: 400;
    font-family: var(--fontMono);
  }
  h2 {
    margin: 0px 0px 0.4rem 0;
    padding: 0px;
    font-weight: normal;
    letter-spacing: 0px;
    font-size: 1.1rem;
    color: var(--v2-card-headline-color);
    @media screen and (min-width: 700px) {
      font-size: 1.4rem;
    }
  }
  p {
    margin: 0px 0px 1rem 0;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
  .pill,
  .time {
    display: inline-block;
    background-color: var(--v2-card-background-level-2);
    padding: 4px 10px;
    border-radius: 10px;
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
    font-size: 0.8rem;
  }
  .icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-right: 10px;
    margin-right: 5px;
    transform: translateY(2px);
  }
`;

export default (props) => (
  <EventWrapper
    target="_blank"
    href={props.event.link}
    className={`${props.premium ? "premium" : ""}`}
  >
    <CompanyImage background={props.event.photo} />
    <div className="listing-info">
      <h3>{props.event.arrangedBy}</h3>
      <h2>{props.event.name}</h2>
      <p className="description">{props.event.description}</p>
      <div className="date-and-format">
        <time className="time">
          <img
            src="https://www.dagbladet.no/files/2021/01/18/kode24-calendar.png"
            className="icon"
            alt="icon"
          />
          {props.event.startDateFormatted} - {props.event.timeFormatted}
        </time>
        {props.event.digital && <span className="pill digital">Digitalt</span>}
        {!props.event.digital && <span className="pill physical">Fysisk</span>}
      </div>
    </div>
  </EventWrapper>
);
