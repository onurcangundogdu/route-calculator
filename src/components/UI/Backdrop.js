import React from 'react'

const Backdrop = ({ isVisible, clickHandler }) => isVisible && (
  <div className="backdrop" onClick={clickHandler} />
)

export default Backdrop