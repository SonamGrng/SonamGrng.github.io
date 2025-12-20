import React from 'react'

export default function Home(){
  return (
    <div className="container py-5">
      <div className="d-flex align-items-end" style={{ minHeight: 280 }}>
        <h1 className="tastys-title display-1 fw-bold">Tasty&apos;s</h1>
      </div>
      <p className="text-light mt-2" style={{ maxWidth: 720 }}>
        Welcome to Tastys — a cozy neighborhood sandwich shop. Browse our menu, add items to your cart, and adjust quantities before you check out.
      </p>
    </div>
  )
}
