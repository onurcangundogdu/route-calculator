import React from 'react'
import { DirectionsService } from '@react-google-maps/api'

const Direction = ({ origin, destination, passengers, directionsCallback }) => {
  return (
    <DirectionsService
      options={{
        destination: `${destination.lat}, ${destination.lng}`,
        origin: `${origin.lat}, ${origin.lng}`,
        optimizeWaypoints: true,
        waypoints: passengers.map(pas => ({
          location: {
            lat: pas.pickUpPoint.lat,
            lng: pas.pickUpPoint.lng
          },
          stopover: true,
        })),
        travelMode: "DRIVING"
      }}
      callback={directionsCallback}
    />
  )
}

const areEqual = (prevProps, nextProps) => prevProps.origin === nextProps.origin 
  && prevProps.destination === nextProps.destination

export default React.memo(Direction, areEqual)
