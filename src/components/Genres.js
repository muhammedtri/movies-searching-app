import { ThemeProvider } from "@emotion/react"
import { Chip, createTheme } from "@mui/material"
import axios from "axios"
import React, { useEffect } from "react"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

const Genres = ({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  type,
}) => {
  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      setGenres(data.genres)
    }
    fetchGenres()
  }, [type, setGenres])
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres.filter((g) => g.id !== genre.id))
  }
  const handleDelete = (genre) => {
    setSelectedGenres(selectedGenres.filter((sg) => sg.id !== genre.id))
    setGenres([...genres, genre])
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        {selectedGenres &&
          selectedGenres.map((sGenre) => (
            <Chip
              key={sGenre.id}
              label={sGenre.name}
              size="small"
              color="primary"
              sx={{ padding: "0 5px", margin: "3px" }}
              clickable
              onDelete={() => handleDelete(sGenre)}
            />
          ))}
        {genres &&
          genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              size="small"
              sx={{ padding: "0 5px", margin: "3px" }}
              clickable
              onClick={() => handleAdd(genre)}
            />
          ))}
      </div>
    </ThemeProvider>
  )
}

export default Genres
