import React, { Component, useState } from "react";
import Carousel from "react-multi-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";
import RCard from "../../../shared/card-template/RCard";
import "react-multi-carousel/lib/styles.css";
const MultiItemCarousel = (props) => {
  console.log(props);

  const isRoom = props.isRoom;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const useStyles = makeStyles({
    carouselOverflow: {
      overflow: "visible",
    },

    cardContainer: {
      display: "flex" /* or inline-flex */,
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
    },
  });
  const classes = useStyles();

  return (
    <div>
      <Carousel
        draggable={false}
        swipeable={true}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={6000}
        keyBoardControl={true}
        transitionDuration={500}
      >
        {props.cardInfo.map((c) => (
          <div>
            <div className={classes.cardContainer}>
              {isRoom ? <RCard roommate={c} /> : <Card roommate={c} />}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MultiItemCarousel;
