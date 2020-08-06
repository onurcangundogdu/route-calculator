import React from 'react'

const RouteDetail = ({ totalDistance, totalDuration, averageDuration }) => {
  return (
    <div className="routeDetail">
      <p>Total Distance: {totalDistance}</p>
      <p>Total Duration: {totalDuration}</p>
      <p>Average Duration: {averageDuration}</p>
    </div>
  )
}

export default RouteDetail
