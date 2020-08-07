import React, { useState, useCallback } from 'react'
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api'
import { calculateTripDuration, calculateTotalDistance, calculateTotalDuration } from '../../utils/routeCalculator'
import AppMarker from './AppMarker'
import Direction from './Direction'

const containerStyle = {
  width: '95vw',
  height: '40vh',
  margin: '10px auto'
}

const center = {
  lat: 41.03,
  lng: 29.00
}

const Map = ({ passengers, setPassengers, setTotalDistance, setTotalDuration, setError }) => {
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
      const newPassengers = passengers.map(pas => ({
        ...pas,
        pickUpPointOrder: -1,
        tripDuration: -1
      }))
      setPassengers(newPassengers)
      setTotalDistance(NaN)
      setTotalDuration(NaN)
    }
  }

  const getMapMessage = () => {
    let message = 'Select a location to clear the route';
    
    if (!origin) {
      message = 'Please select a location for origin'
    } else if (!destination) {
      message = 'Please select a location for destination'
    }

    return message
  }

  const directionsCallback = useCallback(res => {
    const route = res.routes[0]
    const totalDuration = calculateTotalDuration(route)
    if(totalDuration > 120) {
      setError('Route duration is over 2 hours')
      setOrigin(null)
      setDestination(null)
      return
    }

    setDirectionResult(res)

    const newPassengers = passengers.map((pas, pasIndex) => ({
      ...pas,
      pickUpPointOrder: route.waypoint_order[pasIndex],
      tripDuration: calculateTripDuration(pasIndex, route)
    }))

    setPassengers(newPassengers)

    const totalDistance = calculateTotalDistance(route)
    setTotalDistance(totalDistance)

    
    setTotalDuration(totalDuration)
  }, [passengers, setPassengers, setTotalDistance, setTotalDuration, setError])

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={setPoint}
      >
        <p className="mapMessage">{getMapMessage()}</p>
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
