export const calculateTripDuration = (pasIndex, route) => {
  let tripDurationInSeconds = 0
  
  route.legs.forEach((leg, index) => {
    if(index > route.waypoint_order[pasIndex]) {
      tripDurationInSeconds += leg.duration.value
    }
  })

  return Math.round(tripDurationInSeconds / 60)
}

export const calculateAverageDuration = passengers => {
  const totalDurationInMinutes = passengers.reduce((acc, cur) => acc + cur.tripDuration, 0)
  return Math.round(totalDurationInMinutes / passengers.length)
}

export const calculateTotalDistance = route => {
  const totalDistanceInMeters = route.legs.reduce((acc, cur) => acc + cur.distance.value, 0)
  
  return Math.round(totalDistanceInMeters / 1000)
}

export const calculateTotalDuration = route => {
  const totalDurationInSeconds = route.legs.reduce((acc, cur) => acc + cur.duration.value, 0)

  return Math.round(totalDurationInSeconds / 60)
}