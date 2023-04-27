import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '55%',
  left: '50%',
  backgroundColor: '#fff',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '80%',
  width: '80%',
  padding: '2rem',
  borderRadius: '0.5rem',
  boxShadow: '0 5px 16px rgba(0, 0, 0, 0.2)'
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000
};

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "100%", marginTop: "-6%" }} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}