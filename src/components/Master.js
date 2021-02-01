import React, { useState, useEffect } from "react";

import Spinner from "./spinner";
import JobbMenu from "./jobbmenu";
import { ContentListing, OpacityWrapper } from "./stylings";

import Event from "./event";
import { getSheet } from "../api/sheets";
import { getMonth } from "./months";

const Events = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [events, setEvents] = useState(new Map());
  const [eventsArray, setEventsArray] = useState([]);
  const [premiumEvents, setPremiumEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  useEffect(() => {
    const getGoogleSheet = async () => {
      const sheets = await getSheet();
      sheets.upcomingEvents.forEach((event) => {
        const eventDate = new Date(event.startDate);
        const eventDateString =
          getMonth(eventDate.getMonth()) + " " + eventDate.getFullYear();
        if (!events.get(eventDateString))
          setEvents(events.set(eventDateString, [event]));
        else
          setEvents(
            events.set(eventDateString, [...events.get(eventDateString), event])
          );
      });
      console.log(events);
      events.forEach((value, key) => {
        console.log(value, key);
      });
      setEventsArray(sheets.upcomingEvents);
      setPreviousEvents(sheets.previousEvents);
      setPremiumEvents(sheets.premiumEvents);
      setHasLoaded(true);
    };
    getGoogleSheet();
  }, [events]);

  if (hasLoaded) {
    return (
      <div>
        <div className="listing-info">
          <h1>{eventsArray.length} kommende arrangementer:</h1>
        </div>
        <JobbMenu />

        {premiumEvents.length > 0 && (
          <ContentListing>
            <h2>Sponset arrangement</h2>
            <ul className="listings">
              {premiumEvents.map((event, index) => (
                <li key={index}>
                  <Event premium={true} event={event} />
                </li>
              ))}
            </ul>
          </ContentListing>
        )}
        <ContentListing>
          {Array.from(events.keys()).map((value, key) => (
            <div className="month" key={key}>
              <h2>{value}</h2>
              <ul className="listings">
                {events.get(value).map((event, index) => (
                  <li key={index}>
                    <Event event={event} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ContentListing>
        <OpacityWrapper>
          <div className="listing-info">
            <h1>Tidligere arrangementer:</h1>
          </div>
          <ContentListing>
            <ul className="listings">
              {previousEvents.map((event, key) => (
                <li key={key}>
                  <Event event={event} />
                </li>
              ))}
            </ul>
          </ContentListing>
        </OpacityWrapper>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default Events;
