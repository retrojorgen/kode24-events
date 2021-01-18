import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { format, register } from "timeago.js";
import norwegian from "./norwegian";
import isLight from "./toggles";
import eventsFromAPI from "./events.json";

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
      margin-right: 10px;
    }
    &.action {
      background-color: var(--kode24-purple);
    }
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
          <JobbMenu>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScU7RouC4P8eCSWs7-0TfBv7GjQWWXsWol5FCY4YTsJ8LapyA/viewform?fbclid=IwAR0OLNR9eSxwxVFj1Btdux5umE_GPZB_gxHXK6KzXDMon3YGsubSfmGDydE"
              class="action"
            >
              <span role="img">✨</span> Legg inn ditt event
            </a>
          </JobbMenu>
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
                            <img
                              src="https://www.dagbladet.no/files/2021/01/18/kode24-calendar.png"
                              className="icon"
                              alt="icon"
                            />
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
