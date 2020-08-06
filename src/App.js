import React, { useEffect, useState } from 'react'
import passengersApi from './apis/passenger'
import { calculateAverageDuration } from './utils/routeCalculator'
import Map from './components/Map/Map'
import PassengerReport from './components/PassengerReport'
import RouteDetail from './components/RouteDetail'
import Modal from './components/UI/Modal'
import Spinner from './components/UI/Spinner'
import './App.scss'

const App = () => {
  const [passengers, setPassengers] = useState([])
  const [totalDistance, setTotalDistance] = useState(NaN)
  const [totalDuration, setTotalDuration] = useState(NaN)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    
    passengersApi.get('/passengers')
      .then(res => {
        setPassengers(res.data)
        setLoading(false)
        setError('')
      })
      .catch(err => {
        setPassengers([])
        setLoading(false)
        setError(err.message)
      })

  }, [])

  const modalCloseHandler = () => {
    setError('')
  }

  if(loading) { return <Spinner /> }
  return (
    <>
      <Map 
        passengers={passengers} 
        setPassengers={setPassengers} 
        setTotalDistance={setTotalDistance} 
        setTotalDuration={setTotalDuration} 
      />
      <PassengerReport passengers={passengers} />
      <RouteDetail 
        totalDistance={totalDistance} 
        totalDuration={totalDuration} 
        averageDuration={calculateAverageDuration(passengers)} 
      />
      <Modal isVisible={!!error} closeHandler={modalCloseHandler}>{error}</Modal>
    </>
  )
}

export default App
