import React from "react"
import "./Carousel.css"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import { img_300, noPicture } from "../config/config"
import { Typography } from "@mui/material"
const responsive = {
  0: {
    items: 2,
  },
  600: {
    items: 3,
  },
  900: {
    items: 4,
  },
}

const Carousel = ({ images }) => {
  const items = images.map((image) => (
    <div
      className="item-carousel"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src={
          image.profile_path ? `${img_300}/${image.profile_path}` : noPicture
        }
        style={{ width: "80px" }}
        alt={image.name}
      />
      <Typography
        variant="caption"
        color="white"
        mt={2}
        sx={{ fontWeight: "bold" }}
      >
        {image.name}
      </Typography>
    </div>
  ))
  return (
    <AliceCarousel
      items={items}
      autoPlay={true}
      disableDotsControls
      disableButtonsControls
      infinite
      animationType="fadeout"
      responsive={responsive}
    />
  )
}

export default Carousel
