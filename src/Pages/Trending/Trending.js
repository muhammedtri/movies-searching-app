import axios from "axios"
import React, { useEffect, useState } from "react"
import SingleContent from "../../components/SingleContent"
import CustomPagination from "../../Pagination/CustomPagination"

const Trending = () => {
  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const fetchTrending = async (page) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    )
    setContent(response.data)
  }

  useEffect(() => {
    fetchTrending(page)
  }, [page])
  return (
    <div>
      <h1 className="main-heading">Trending</h1>

      <div className="main-content">
        {content.results &&
          content.results.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.fisrt_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average ? c.vote_average : 0}
            />
          ))}
      </div>
      <CustomPagination
        numPages={content.total_pages}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default Trending
