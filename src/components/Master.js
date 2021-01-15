import React, { Fragment, Component } from "react";
import styled, { keyframes } from "styled-components";
import { getAds, getAdsByTags } from "../api/FileSystem";
import { format, register } from "timeago.js";
import norwegian from "./norwegian";
import isLight from "./toggles";
import eventsFromAPI from "./events.json";
import calendarIcon from "../images/calendar.svg";

function prettyDateString(dateObject) {
  return `${dateObject.getDate().toString().padStart(2, "0")}.
          ${(dateObject.getMonth() + 1).toString().padStart(2, "0")}.
          ${dateObject.getFullYear()}`;
}

eventsFromAPI.map((event) => {
  event.startDate = new Date(event.startDate);
  event.startDateTimeago = format(event.startDate, "NB-no");
  event.startDateFormatted = prettyDateString(event.startDate);
  if (event.endDate) event.endDate = new Date(event.endDate);
  return event;
});

console.log(eventsFromAPI);

register("NB-no", norwegian);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

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

const ExpandButton = styled.button`
  position: relative;
  width: 100%;
  text-transform: uppercase;
  color: white;
  z-index: 400;
  padding: 17px;
  margin-bottom: 20px;
  border-radius: 2px;
  background: linear-gradient(45deg, #c431e3, #ff8d00);
  transition: all 0.1s linear;
  font-size: 1em;
  border: 0;
  cursor: pointer;
  &.opened {
    opacity: 0.6;
  }
  &:hover {
    background: linear-gradient(45deg, #a51ac2, red);
  }
  @media (min-width: 700px) {
    display: none;
  }
  &:after {
    content: "⚙️";
    font-size: 19px;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 12px;
  }
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #111111;
  z-index: 1000;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  width: 240px;
  flex: 0 0;

  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transform: translateX(100%);
  transition: all 0.1s linear;
  &.opened {
    transform: translateX(0);
  }

  @media (min-width: 700px) {
    position: relative;
    width: auto;
    height: auto;
    background-color: #111111;
    width: 300px;
    transform: translateX(0);
    flex: 0 1 300px;
    border-radius: 10px;
  }

  .listing-search {
    input {
      background: transparent;
      border: 0;
      padding: 10px;
      border-radius: 10px;
      font-size: 20px;
      color: white;

      background-color: #191919;
      width: 100%;
      outline: none;
      &:focus {
        background-color: black;
      }
    }
  }

  h4 {
    margin-bottom: 10px;
    font-size: 20px;
    margin-top: 26px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin-bottom: 4px;
      display: flex;
      cursor: pointer;
      &.disabled {
        opacity: 0.6;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      input {
        margin-right: 6px;
        margin-bottom: 0;
        margin-top: 6px;
      }
      label {
        display: flex;
        width: 100%;
      }
      .property-name {
        display: block;
        font-weight: normal;
        &::first-letter {
          text-transform: uppercase;
        }
        margin-right: 6px;
      }
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
    padding: 0 20px;
  }
  .listing-info h1 {
    text-align: center;
    font-family: var(--fontMono);
    font-weight: 500;
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
    a {
      padding: 20px;
      display: flex;
      width: 100%;
      align-items: stretch;
      margin-bottom: 10px;
      cursor: pointer;
      background-color: #171717;
      border-radius: 10px;
      &:hover {
        background-color: #111111;
      }
    }
    p {
      @media (min-width: 700px) {
        display: block;
      }
    }
    a {
      color: white;
      text-decoration: none;
    }
    h2,
    p {
      margin: 0;
      padding: 0;
    }
    h2 {
      margin: 0;
      padding: 0;
      font-weight: normal;
      letter-spacing: 0;
      font-size: 1.1em;
      margin-bottom: 4px;

      @media (min-width: 700px) {
        font-size: 19px;
        letter-spacing: 1px;
      }
    }
    p {
      font-size: 12px;
      opacity: 0.8;
      padding-bottom: 1px;

      @media (min-width: 700px) {
        font-size: 15px;
        display: block;
      }
    }
    .premium {
      position: relative;
      &:before {
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(110deg, #a51ac2, #ff8d00);
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
      color: #a0a0a0;
      transform: translateY(2px);
    }
    .time {
      text-transform: uppercase;
      font-size: 10px;

      display: block;
      color: #a0a0a0;
      font-size: 15px;

      text-align: left;
    }
    .city-listing {
      font-size: 12px;
      margin-bottom: 2px;
      font-weight: bold;
      opacity: 0.4;
      color: rgb(${isLight ? "0,0,0" : "255,255,255"});
    }
    .city-name {
      display: inline-block;
      margin-left: 6px;
      font-weight: normal;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    .city-container {
      display: inline-block;
    }
  }
  .listing-company-image {
  }
`;

const JobbMenu = styled.div`
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
      margin-right: 20px;
    }
    &.action {
      background-color: var(--kode24-purple);
    }
  }
`;

const CompanyImage = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  margin-right: 20px;
  flex: 0 0 70px;
  background-image: url("${(props) =>
    props.background ? props.background : ""}");
  background-size: cover;
  border-radius: 10px;
  figure {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover !important;
    margin: 0;
    border-radius: 50%;
    overflow: hidden;
    img {
      max-width: 100%;
      overflow: hidden;
    }
  }
  @media (min-width: 700px) {
    width: 100px;
    height: 100px;
    flex: 0 0 100px;
  }
`;

class Master extends Component {
  state = {
    hasLoaded: false,
    events: [],
  };

  componentDidMount() {
    this.setState({ events: eventsFromAPI, hasLoaded: true });
  }

  render() {
    let { events, hasLoaded } = this.state;
    if (hasLoaded) {
      return (
        <div>
          <div className="listing-info">
            <h1>{events.length} Kommende arrangementer:</h1>
          </div>
          <PageWrapper>
            <div
              className={`close-block ${
                this.state.filterIsOpen ? "opened" : ""
              }`}
              onClick={() => this.toggleFilter()}
            />
            <ContentListing>
              <ul className="listings">
                {events.map((event, key) => (
                  <li key={key}>
                    <a target="_blank" href={event.link}>
                      <CompanyImage
                        className="listing-company-image"
                        background={event.photo}
                      ></CompanyImage>
                      <div className="listing-info">
                        <p>{event.arrangedBy}</p>
                        <h2>{event.name}</h2>
                        <div className="date-and-format">
                          <time className="time">
                            <img src={calendarIcon} className="icon" />
                            {event.startDateFormatted}
                          </time>
                          {event.digital && (
                            <span className="pill digital">Digitalt</span>
                          )}
                          {!event.digital && (
                            <span className="pill physical">Fysisk</span>
                          )}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </ContentListing>
          </PageWrapper>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default Master;
