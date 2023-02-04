import { createTheme, Pagination } from "@mui/material"
import { Stack, ThemeProvider } from "@mui/system"
import React from "react"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

const CustomPagination = ({ page, setPage, numPages }) => {
  return (
    <div className="pagination">
      <Stack
        spacing={2}
        sx={{
          paddingBottom: "100px",
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Pagination
            count={numPages}
            hideNextButton
            hidePrevButton
            color="primary"
            onChange={(e, number) => {
              setPage(number)
              window.scroll(0, 0)
            }}
          />
        </ThemeProvider>
      </Stack>
    </div>
  )
}

export default CustomPagination
