import axios from "axios"
import React, { useEffect, useState } from "react"
import Genres from "../../components/Genres"
import SingleContent from "../../components/SingleContent"
import CustomPagination from "../../Pagination/CustomPagination"
import useGenres from "../../hooks/useGenres"

const Series = () => {
  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const genresForURL = useGenres(selectedGenres)

  const fetchSeries = async (page) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genresForURL}`
    )
    setContent(response.data)
  }

  useEffect(() => {
    fetchSeries(page)
  }, [page, selectedGenres])
  return (
    <div>
      <Genres
        type="tv"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <h1 className="main-heading">Series{console.log(selectedGenres)}</h1>
      <div className="main-content">
        {content.results &&
          content.results.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination
        numPages={content.total_pages > 500 && 500}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default Series
