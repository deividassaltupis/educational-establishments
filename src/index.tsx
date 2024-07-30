import React from "react"
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoadScript } from "@react-google-maps/api"

import Root from "./root"
import ErrorPage from "./layout/ErrorPage"
import Home from "./routes/home"
import Establishment from "./routes/establishment"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material"
import { theme } from "./styles/theme"
import { GlobalStyles } from "./styles/global"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "establishment/:id",
        element: <Establishment />
      }
    ]
  }
])

const googleLibraries = ["places"] as any[]

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadScript
      id="script-loader"
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY || ""}
      libraries={googleLibraries}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LoadScript>
  </React.StrictMode>
)
