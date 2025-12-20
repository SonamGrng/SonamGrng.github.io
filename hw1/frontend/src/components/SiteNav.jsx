import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../state/cart'

export default function SiteNav(){
  const { count } = useCart()

  return (
    <nav className="navbar navbar-expand-md" style={{ backgroundColor: 'rgb(85, 107, 47)' }}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/" style={{ color: 'blanchedalmond' }}>
          Tastys
        </NavLink>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Toggle navigation">
          <span style={{ fontSize: 28, color: 'blanchedalmond' }}>&#9776;</span>
        </button>

        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" style={({isActive}) => ({ color: 'blanchedalmond', fontWeight: isActive ? 700 : 600 })}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/menu" style={({isActive}) => ({ color: 'blanchedalmond', fontWeight: isActive ? 700 : 600 })}>
                Menu {count > 0 ? <span className="badge ms-1" style={{ backgroundColor: 'rgb(255,248,220)', color: 'rgb(85, 107, 47)' }}>{count}</span> : null}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" style={({isActive}) => ({ color: 'blanchedalmond', fontWeight: isActive ? 700 : 600 })}>
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/gallery" style={({isActive}) => ({ color: 'blanchedalmond', fontWeight: isActive ? 700 : 600 })}>
                Gallery
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
