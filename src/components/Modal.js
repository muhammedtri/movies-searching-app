import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import axios from "axios"
import { img_300 } from "../config/config"
import { Chip, Typography } from "@mui/material"
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay"
import Carousel from "./Carousel"
import "./Modal.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "850px",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
  bgcolor: "#39445a",
  border: "2px solid #fff",
  boxShadow: 24,
}

const CustomModal = ({ children, id, media_type }) => {
  const [open, setOpen] = useState(false)
  const [video, setVideo] = useState("")
  const [images, setImages] = useState([])
  const [content, setContent] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    setContent(data)
  }
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    setVideo(data.results[0]?.key)
  }
  const fetchImages = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    setImages(data.cast)
  }

  useEffect(() => {
    fetchData()
    fetchVideo()
    fetchImages()
  }, [])

  return (
    <div>
      <div className="post-item" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="modal-info">
            <img
              src={`${img_300}/${content.poster_path}`}
              className="desktop-version"
              alt={content.name}
            />
            <img
              src={`${img_300}/${content.backdrop_path}`}
              className="mobile-version"
              alt={content.name}
            />
            <div
              className="info-modal"
              style={{ textAlign: "center", padding: "20px" }}
            >
              <Typography
                variant="h4"
                color="white"
                sx={{ fontSize: { xs: "14px", md: "20px" } }}
              >
                {content.name || content.title}
                {` (${content.release_date || content.last_air_date}`.split(
                  "-"
                )[0] + ")"}
              </Typography>
              <Typography
                variant="caption"
                color="white"
                style={{
                  fontWeight: "100",
                  fontStyle: "italic",
                }}
              >
                {content.tagline}
              </Typography>
              <div className="genres" style={{ marginTop: "10px" }}>
                {content.genres &&
                  content.genres.map((g) => (
                    <Chip
                      key={g.id}
                      sx={{ margin: "0 5px" }}
                      label={g.name}
                      color="primary"
                    />
                  ))}
              </div>
              <Typography
                className="overview"
                variant="body2"
                color="white"
                style={{
                  lineHeight: "2",
                  letterSpacing: "2px",
                  boxShadow: "0 0 3px black",
                  padding: "20px",
                  borderRadius: "20px",
                  margin: "20px 0",
                  fontWeight: 100,
                }}
              >
                {content.overview}
              </Typography>
              <div className="carousel-images">
                <Carousel images={images} />
              </div>
              <Button
                fullwidth="true"
                variant="contained"
                href={`https://youtube.com/watch?v=${video}`}
                color="error"
              >
                <SmartDisplayIcon style={{ margin: "0 10px" }} />
                WATCH THE TRAILER
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default CustomModal
