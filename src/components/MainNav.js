import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import MovieCreationIcon from "@mui/icons-material/MovieCreation"
import TvIcon from "@mui/icons-material/Tv"
import SearchIcon from "@mui/icons-material/Search"

const MainNav = () => {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    switch (value) {
      case 0:
        return navigate("/")
      case 1:
        return navigate("/movies")
      case 2:
        return navigate("/series")
      case 3:
        return navigate("/search")
      default:
        return navigate("/")
    }
  }, [value, navigate])
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <BottomNavigation
        sx={{
          backgroundColor: "#39445a",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Movies"
          icon={<MovieCreationIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Tv Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  )
}

export default MainNav
