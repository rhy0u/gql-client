import { Box } from "@mui/material"
import { Suspense } from "react"
import { Link, Outlet } from "react-router-dom"

const Root = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>GraphQL</h1>
        <nav>
          <nav>
            <li>
              <Link to={`/users`}>Users</Link>
            </li>
          </nav>
        </nav>
      </div>
      <div id="detail"></div>
      <Box sx={{ maxWidth: 500 }}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  )
}

export default Root
