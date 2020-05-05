import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "./../../shared/card-template/card";
import Navbar from "../dashboard/components/navbar";
import Create from "./../../shared/components/CreateDialog/CreateEventDialog";
import CitySelect from "../dashboard/components/locationSearch";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    direction: "row",
    alignItems: "center",
    justify: "flex-start",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    paddingLeft: 10,
  },
}));

const Events = () => {
  const [value, setValue] = React.useState({ list: [] });

  const getEvents = async () => {
    let importedEvents = [];
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios
        .get(`http://localhost:5000/api/events`, config)
        .then((response) => {
          const imported = response.data.events;
          let importedEvent;
          imported.map((e) => {
            importedEvent = {
              title: e.eventName,
              startDate: e.eventStartDate,
              endDate: e.eventEndDate,
              description: e.eventSummary,
              eventCreator: e.eventCreator,
              venue: e.eventVenue,
              image: e.eventImage,
            };
            importedEvents.push(importedEvent);
          });
          if (importedEvents.length > value.list.length) {
            setValue({ list: [...importedEvents] });
            importedEvents = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  getEvents();
  // // const filterEvent = (city, state) => {
  // //   console.log(city);
  // //   console.log(state);
  // //   if (city != "" && state != "") {
  // //     const filteredEvent = events.filter((e) => e.State == state);
  // //     updateEvent(filteredEvent);
  // //   } else {
  // //     updateEvent(events);
  //   // }
  // };

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <Navbar />
      <CitySelect />
      <Container maxWidth="lg">
        <h2> Events Around You</h2>
        <Create render={() => getEvents()} />
        <br />
        <Grid container className={useStyles.gridContainer} spacing={2}>
          {value.list.map((event) => {
            return (
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Card event={event} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Events;
