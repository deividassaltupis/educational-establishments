import { GoogleMap } from "@react-google-maps/api"
import { mapStyles } from "src/styles/maps"
import MapMarker from "./map-marker"
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { useState } from "react"

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "700px",
  maxWidth: "100vw",
  borderRadius: "8px"
}

type MapProps = {
  data?: Array<{
    id: string
    location_lat: number
    location_lng: number
    label?: string
  }>
}

const LITHUANIAN_CENTER_COORDS = {
  lat: 55.1694,
  lng: 23.8813
}

const DEFAULT_ZOOM = 8

const GoogleMapWithMarkers = ({ data }: MapProps) => {
  const [showLabels, setShowLabels] = useState(true)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowLabels(event.target.checked)
  }

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={showLabels}
              value={showLabels}
              onChange={handleCheckboxChange}
            />
          }
          label="Show labels"
        />
      </FormGroup>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: LITHUANIAN_CENTER_COORDS.lat,
          lng: LITHUANIAN_CENTER_COORDS.lng
        }}
        zoom={DEFAULT_ZOOM}
        options={{ styles: mapStyles as any }}
      >
        {data?.map((item) => (
          <MapMarker
            key={item.id}
            position={{
              lat: item.location_lat || 0,
              lng: item.location_lng || 0
            }}
            label={showLabels ? item.label : undefined}
          />
        ))}
      </GoogleMap>
    </Box>
  )
}

export default GoogleMapWithMarkers
