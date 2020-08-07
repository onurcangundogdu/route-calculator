import React from 'react'

const RouteDetail = ({ totalDistance, totalDuration, averageDuration }) => {
  return (
    <div className="routeDetail">
      <p>Total Distance: <span className="color-primary">{totalDistance || 0} km</span></p>
      <p>Total Duration: <span className="color-primary">{totalDuration || 0} mins</span></p>
      <p>Average Duration: <span className="color-primary">{averageDuration < 0 ? 0 : averageDuration} mins</span></p>
    </div>
  )
}

export default RouteDetail
