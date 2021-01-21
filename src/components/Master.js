import React, { useState, useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";

import Spinner from "./spinner";
import JobbMenu from "./jobbmenu";
import { ContentListing, OpacityWrapper } from "./stylings";

import Event from "./event";

function prettyDateString(dateObject) {
  return `${dateObject.getDate().toString().padStart(2, "0")}.${(
    dateObject.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${dateObject.getFullYear()}`;
}

function sortEventsByDateAscending(events) {
  let newEvents = [...events];
  newEvents.sort(function (a, b) {
    if (a.startDate < b.startDate) {
      return -1;
    }
    if (a.startDate > b.startDate) {
      return 1;
    }
    // dates are equal
    return 0;
  });
  return newEvents;
}

const Events = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  useEffect(() => {
    const getGoogleSheet = async () => {
      //Form Responses 1
      const SHEET_ID = process.env.REACT_APP_SHEET_ID;
      console.log(SHEET_ID);
      const doc = new GoogleSpreadsheet(SHEET_ID);
      await doc.useServiceAccountAuth({
        private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(
          /\\n/gm,
          "\n"
        ),
        client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      });

      await doc.loadInfo();
      const sheet = await doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      let now = new Date();
      let events = rows
        .filter((row) => row["publisert"] === "ja")
        .map((row) => {
          let event = {};
          let eventData = row._rawData;
          event.startDate = new Date(`${eventData[1]} ${eventData[2]}`);
          event.startDateFormatted = prettyDateString(event.startDate);
          event.arrangedBy = eventData[3];
          event.name = eventData[3];
          event.description = eventData[4];
          event.link = eventData[7];
          event.photo = eventData[8];
          if (event.photo.includes("drive.google.com/open")) {
            event.photo =
              "https://drive.google.com/thumbnail?authuser=0&sz=w320&id=" +
              event.photo.split("=")[1];
          }
          event.digital = eventData[6] === "Online" ? true : false;
          event.location = !event.digital ? eventData[10] : "";
          return event;
        });
      events = sortEventsByDateAscending(events);
      setEvents(events.filter((event) => event.startDate >= now));
      setPreviousEvents(events.filter((event) => event.startDate <= now));
      setHasLoaded(true);
    };
    getGoogleSheet();
  }, []);

  if (hasLoaded)
    return (
      <div>
        <div className="listing-info">
          <h1>{events.length} kommende arrangementer:</h1>
        </div>
        <JobbMenu />
        <ContentListing>
          <ul className="listings">
            {events.map((event, key) => (
              <li key={key}>
                <Event event={event} />
              </li>
            ))}
          </ul>
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
  else {
    return <Spinner />;
  }
};

export default Events;
