import React, { Component, useState } from "react";
import MultiItemCarousel from "./components/MultiItemCarousel";
import { makeStyles } from "@material-ui/core/styles";
import HomePageNavbar from "../dashboard/components/navbar";
import CitySelect from "../dashboard/components/locationSearch";
import jwt_decoded from "jwt-decode";
import axios from "axios";

const profileBasedEvents = [
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
];
const topEvents = [
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Events",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
];
const topRooms = [
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
  {
    title: "Top Rooms",
    img: "./event.jpg",
    description:
      "We Help Each Other ! Thousands of jobs offered by your own locals",
  },
];
const useStyles = makeStyles({
  cardContainer: {
    display: "flex" /* or inline-flex */,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  header: {
    color: "gray",
    fontFamily: "Trocchi",
    fontSize: "35px",
    fontWeight: "normal",
    lineHeight: "48px",
  },
});

const Dashboard = () => {
  var isPetLover;
  const [profileBasedRooms, updateProfileBasedRooms] = React.useState([]);

  const token = localStorage.getItem("token");
  const getUserProfile = async () => {
    if (token !== null) {
      const decoded = jwt_decoded(token);

      const data = decoded.email;

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios
          .get(`http://localhost:5000/api/users/${data}`, config)
          .then((res) => {
            const user = res.data.user;
            isPetLover = user.hasPet;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  const getRoommates = async () => {
    let importedRooms = [];
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios
        .get(`http://localhost:5000/api/roommates`, config)
        .then((response) => {
          console.log(response.data);
          const imported = response.data.rommmates;
          let importedRoom;
          // console.log(imported);
          imported.map((r) => {
            if (r.petsAllowed == isPetLover) {
              importedRoom = {
                listingType: r.listingType,
                address: r.addressId,
                description: r.description,
                user: r.userId,
                image: r.image,
                contactNumber: r.contactNumber,
                petsAllowed: r.petsAllowed,
                datePosted: r.datePosted,
              };
              //  console.log(importedRoom);
              importedRooms.push(importedRoom);
            }
          });
          //  console.log(importedRooms);
          if (importedRooms.length > profileBasedRooms.length) {
            updateProfileBasedRooms(importedRooms);
            importedRooms = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.response);
    }
  };
  getUserProfile();
  getRoommates();
  const classes = useStyles();
  return (
    <div
      style={{ width: "100%", textAlign: "left", backgroundColor: "#f2f2f2" }}
    >
      <HomePageNavbar />
      <br></br>
      <div style={{ alignSelf: "center" }}>
        <CitySelect />
      </div>

      <div style={{ textAlign: "center" }}>
        <span className={classes.header}>Based on your Profile</span>
      </div>
      <div style={{ marginLeft: "70px" }}>
        <h3 className={classes.header}>Rooms</h3>
      </div>
      <MultiItemCarousel cardInfo={profileBasedRooms} isRoom={true} />
      <div style={{ marginLeft: "70px" }}>
        <h3 className={classes.header}>Events</h3>
      </div>
      <MultiItemCarousel cardInfo={profileBasedEvents} isRoom={false} />
      <div style={{ textAlign: "center" }}>
        <span className={classes.header}>Most Saved Topics</span>
      </div>
      <div style={{ marginLeft: "70px" }}>
        <h3 className={classes.header}>Top Rooms</h3>
      </div>
      <MultiItemCarousel cardInfo={topEvents} isRoom={false} />
      <div style={{ marginLeft: "70px" }}>
        <h3 className={classes.header}>Top Events</h3>
      </div>
      <MultiItemCarousel cardInfo={topRooms} isRoom={false} />
    </div>
  );
};

export default Dashboard;
