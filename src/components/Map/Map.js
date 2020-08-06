import React, { useState, useCallback } from 'react'
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api'
import { calculateTripDuration, calculateTotalDistance, calculateTotalDuration } from '../../utils/routeCalculator'
import AppMarker from './AppMarker'
import Direction from './Direction'

const containerStyle = {
  width: '100vw',
  height: '50vh'
}

const center = {
  lat: 41.03,
  lng: 29.00
}

const Map = ({ passengers, setPassengers, setTotalDistance, setTotalDuration }) => {
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [directionResult, setDirectionResult] = useState(null)

  const setPoint = ({ latLng }) => {
    const lat = latLng.lat()
    const lng = latLng.lng()

    if (!origin) {
      setOrigin({ lat, lng})
    } else if (!destination) {
      setDestination({ lat, lng})
    } else {
      setOrigin(null)
      setDestination(null)
    }
  }

  const directionsCallback = useCallback(res => {
    setDirectionResult(res)
    
    const route = res.routes[0]
    const newPassengers = passengers.map((pas, pasIndex) => ({
      ...pas,
      pickUpPointOrder: route.waypoint_order[pasIndex],
      tripDuration: calculateTripDuration(pasIndex, route)
    }))

    setPassengers(newPassengers)

    const totalDistance = calculateTotalDistance(route)
    setTotalDistance(totalDistance)

    const totalDuration = calculateTotalDuration(route)
    setTotalDuration(totalDuration)
  }, [passengers, setPassengers, setTotalDistance, setTotalDuration])

  return (
    <LoadScript
      googleMapsApiKey = 'AIzaSyCo69g6yHW9n73Il7E1p15P2_-re0A9axE' // 'AIzaSyBJvBBvI5MzmXVBQKkqOMH305iNyJgYHkA'
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={setPoint}
      >
        <AppMarker passengers={passengers} origin={origin} destination={destination} />
        {
          origin && destination && <Direction 
            origin={origin} 
            destination={destination} 
            passengers={passengers}
            directionsCallback={directionsCallback}
          />
        }
        {
          origin && destination && directionResult && (
            <DirectionsRenderer 
              options={{ directions: directionResult }} 
            />
          )
        }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)
