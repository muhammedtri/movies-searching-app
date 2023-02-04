import { ThemeProvider } from "@emotion/react"
import { Button, createTheme, Tab, TextField } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import SingleContent from "../../components/SingleContent"
import SearchIcon from "@mui/icons-material/Search"
import { TabContext, TabList, TabPanel } from "@mui/lab"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [content, setContent] = useState([])
  const [type, setType] = useState("1")

  const fetchSearch = async (searchTerm) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
    )
    setContent(response.data)
  }
  // useEffect(() => {
  //   if (searchTerm !== "") {
  //     fetchSearch(searchTerm)
  //   }
  // }, [searchTerm])

  const handleClick = () => {
    fetchSearch(searchTerm)
  }
  return (
    <div className="search">
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex" }}>
          <TextField
            fullWidth
            autoFocus="true"
            id="standard-basic"
            label="Search"
            variant="standard"
            color="primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            <SearchIcon />
          </Button>
        </div>
        <div className="tabs" style={{ margin: "20px 0", width: "100%" }}>
          <TabContext value={type}>
            <TabList onChange={(e, newValue) => setType(newValue)}>
              {console.log(type)}
              <Tab label="Search Movie" value="1" />
              <Tab label="Search Tv Series" value="2" />
            </TabList>
            <div className="main-content">
              {content.results &&
                content.results.map((c) =>
                  c.media_type === "movie" ? (
                    <TabPanel value="1">
                      <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average ? c.vote_average : 0}
                      />
                    </TabPanel>
                  ) : (
                    <TabPanel value="2">
                      <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average ? c.vote_average : 0}
                      />
                    </TabPanel>
                  )
                )}
            </div>
          </TabContext>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Search
