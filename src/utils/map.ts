import proj4 from "proj4"

export const extractXY = (point: string) => {
  const regex = /POINT \(([^ ]+) ([^)]+)\)/
  const match = point.match(regex)

  if (match) {
    const y = parseFloat(match[1])
    const x = parseFloat(match[2])
    return { x, y }
  } else {
    return null
  }
}

/*
    This projection definition sets up a map projection for Lithuania using the Transverse Mercator method. 

    It centers the map at 24 degrees east longitude and the equator, adjusts the scale slightly for accuracy, 
    and ensures all x-coordinates are positive by adding 500,000 meters. 

    It uses the GRS80 ellipsoid model, requires no additional datum transformation, 
    and measures all coordinates in meters. 

    This setup is designed to accurately convert local coordinates into a global format (WGS84) 
    used by systems like Google Maps.
 */

proj4.defs(
  "EPSG:3346",
  "+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9998 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
)

const sourceProjection = "EPSG:3346"
const destProjection = "EPSG:4326"

export const convertCoordinates = (x: number, y: number) => {
  const [longitude, latitude] = proj4(sourceProjection, destProjection, [x, y])
  return { latitude, longitude }
}
