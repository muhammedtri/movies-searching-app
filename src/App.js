import Header from "./components/Header"
import MainNav from "./components/MainNav"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./style.css"
import { Container } from "@mui/system"
import { Search, Movies, Series, Trending } from "./Pages"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" exact element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
        <MainNav />
      </div>
    </BrowserRouter>
  )
}

export default App
