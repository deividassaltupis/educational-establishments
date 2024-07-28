import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

const PORT = 5000

const DEFAULT_SCHEME = "https://"
const GOVERNMENT_API_HOST = "get.data.gov.lt"

const PATHS = {
  EDUCATIONAL_ESTABLISHMENTS:
    "/datasets/gov/lsd/svietimo_istaigos/SvietimoIstaiga"
}

app.get("/api", (req, res) => {
  res.send("API is listening")
})

app.get("/api/educational-establishments", async (req, res) => {
  try {
    const response = await fetch(
      `${DEFAULT_SCHEME}${GOVERNMENT_API_HOST}${PATHS.EDUCATIONAL_ESTABLISHMENTS}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await response.json()

    return res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`)
})
