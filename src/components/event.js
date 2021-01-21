import React from "react";
import styled from "styled-components";
import CompanyImage from "./companyImage";
const EventWrapper = styled.a`
  padding: 20px;
  display: flex;
  width: 100%;
  align-items: stretch;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: var(--card-background);
  border-radius: 10px;
  text-decoration: none;
  &:hover {
    background-color: var(--card-background-hover);
  }
  h2,
  p {
    margin: 0;
    padding: 0;
    @media (min-width: 700px) {
      display: block;
    }
  }
  h2 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    letter-spacing: 0;
    font-size: 1.1em;
    margin-bottom: 4px;
    color: var(--text-color);
    @media (min-width: 700px) {
      font-size: 19px;
      letter-spacing: 1px;
    }
  }
  .description {
      var(--text-color-more-fade);
  }
  p {
    font-size: 12px;
    opacity: 0.8;
    padding-bottom: 1px;
    color: var(--text-color-fade);

    @media (min-width: 700px) {
      font-size: 15px;
      display: block;
    }
  }
  .date-and-format {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    margin-top: 10px;
  }
  .pill {
    border-radius: 20px;
    background-color: black;
    padding: 4px 14px;
    font-size: 10px;
    margin-left: 10px;
    color: var(--text-color-always-white) !important;
    &.physical {
      background-color: var(--kode24-pink-dark);
    }
  }
  .icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-right: 10px;
    margin-right: 5px;
    transform: translateY(2px);
  }
  .time {
    text-transform: uppercase;
    font-size: 10px;

    display: block;
    font-size: 15px;
    color: var(--text-color-fade);
    text-align: left;
  }
`;

export default (props) => (
  <EventWrapper target="_blank" href={props.event.link}>
    <CompanyImage background={props.event.photo} />
    <div className="listing-info">
      <p>{props.event.arrangedBy}</p>
      <h2>{props.event.name}</h2>
      <p className="description">{props.event.description}</p>
      <div className="date-and-format">
        <time className="time">
          <img
            src="https://www.dagbladet.no/files/2021/01/18/kode24-calendar.png"
            className="icon"
            alt="icon"
          />
          {props.event.startDateFormatted}
        </time>
        {props.event.digital && <span className="pill digital">Digitalt</span>}
        {!props.event.digital && <span className="pill physical">Fysisk</span>}
      </div>
    </div>
  </EventWrapper>
);
