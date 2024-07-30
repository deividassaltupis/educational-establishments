import { Box } from "@mui/material"
import { FC } from "react"
import GoogleMapWithMarkers from "src/components/common/ui/google-map"

import { EducationalEstablishment } from "src/types/entities/educational-establishment"
import { convertCoordinates, extractXY } from "src/utils/map"

type EstablishmentsMapProps = {
  data?: Array<EducationalEstablishment>
}

const EstablishmentsMap: FC<EstablishmentsMapProps> = ({ data }) => {
  const reformattedData: {
    id: string
    location_lat: number
    location_lng: number
    label?: string
  }[] = []

  if (data)
    for (const item of data) {
      if (item.koord) {
        const cords = extractXY(item.koord)

        if (cords) {
          const { x, y } = cords

          const { latitude, longitude } = convertCoordinates(x, y)
          reformattedData.push({
            id: item._id || "",
            location_lat: latitude,
            location_lng: longitude,
            label: item.ins_pavad_lt
          })
        }
      }
    }

  return <GoogleMapWithMarkers data={reformattedData} />
}

export default EstablishmentsMap
