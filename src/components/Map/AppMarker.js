import React from 'react'
import { Marker } from '@react-google-maps/api'

const AppMarker = ({ passengers, origin, destination}) => {
  const positions = passengers.map(pas => ({ id: pas.id, pos: pas.pickUpPoint, label: pas.name }))

  if(origin) {
    positions.push({ id: -1, pos: origin, label: 'O' })
  }

  if(destination) {
    positions.push({ id: -2, pos: destination, label: 'D' })
  }

  return positions.map(pos => <Marker position={pos.pos} key={pos.id} label={pos.label} />)
}

export default AppMarker
