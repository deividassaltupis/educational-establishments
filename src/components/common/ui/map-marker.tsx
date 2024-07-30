import { OverlayView } from "@react-google-maps/api"
import SchoolIcon from "@mui/icons-material/School"
import { Chip } from "@mui/material"

interface CustomMarkerProps {
  position: {
    lat: number
    lng: number
  }
  label?: string
}

const MapMarker = ({ position, label }: CustomMarkerProps) => {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className="relative">
        <SchoolIcon />
        {label && (
          <Chip
            label={label}
            variant="outlined"
            sx={{
              bgcolor: "white",
              position: "absolute",
              top: 0,
              left: "30px",
              minWidth: "200px",
              fontSize: "12px"
            }}
          />
        )}
      </div>
    </OverlayView>
  )
}

export default MapMarker
