import React from "react"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import { Outlet } from "react-router-dom"

const Root: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Root
