import React from 'react'
import Backdrop from './Backdrop'

const Modal = ({ children, isVisible, closeHandler }) => {
  const appliedClasses = ['modal']

  if (isVisible) {
    appliedClasses.push('show')
  } else {
    appliedClasses.push('hide')
  }

  return (
    <>
      <Backdrop isVisible={isVisible} clickHandler={closeHandler} />
      <div className={appliedClasses.join(' ')}>
        <button type="button" className="closeButton" onClick={closeHandler}>&times;</button>
        {children}
      </div>
    </>
  )
}

export default Modal
