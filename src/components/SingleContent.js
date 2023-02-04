import { Badge } from "@mui/material"
import { img_300, unavailable } from "../config/config"
import CustomModal from "./Modal"

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <CustomModal id={id} media_type={media_type}>
      <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className="title">{title}</b>
      <div className="info">
        <span>{media_type === "tv" ? "Tv Series" : "Movie"}</span>
        <span>{date}</span>
      </div>
      <span className="vote-average">
        <Badge
          badgeContent={vote_average.toFixed(1)}
          color={vote_average > 6 ? "primary" : "error"}
        />
      </span>
    </CustomModal>
  )
}

export default SingleContent
