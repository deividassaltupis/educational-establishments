import express from "express"
import cors from "cors"
import NodeCache from "node-cache"
import { containsOnlyNumbers, paginate, PAGINATION_DEFAULTS } from "./utils"
import { EducationalEstablishmentsResponse } from "./types"
import { CACHE_KEYS, GOVERNMENT_API_ENDPOINT_URL } from "./constants/api"

const app = express()
app.use(cors())

const cache = new NodeCache({ stdTTL: 3600 })

app.get("/api", (req, res) => {
  res.send("API is listening")
})

app.get("/api/educational-establishments", async (req, res) => {
  try {
    const cachedData = cache.get<EducationalEstablishmentsResponse>(
      CACHE_KEYS.EDUCATIONAL_ESTABLISHMENTS
    )

    let page = PAGINATION_DEFAULTS.PAGE
    let size = PAGINATION_DEFAULTS.SIZE

    if (req.query.page && containsOnlyNumbers(req.query.page as string)) {
      page = parseInt(req.query.page as string)
    }

    if (req.query.size && containsOnlyNumbers(req.query.size as string)) {
      size = parseInt(req.query.size as string)
    }

    if (cachedData) {
      return res.json(paginate<unknown>(cachedData._data, page, size))
    }

    const response = await fetch(
      `${GOVERNMENT_API_ENDPOINT_URL.EDUCATIONAL_ESTABLISHMENTS}`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = (await response.json()) as EducationalEstablishmentsResponse

    cache.set(CACHE_KEYS.EDUCATIONAL_ESTABLISHMENTS, data)

    return res.json(paginate<unknown>(data._data, page, size))
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`)
})
