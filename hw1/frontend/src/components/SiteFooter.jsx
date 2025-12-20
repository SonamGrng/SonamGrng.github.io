import React from 'react'

export default function SiteFooter(){
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <h2>Socials</h2>
            <p>Check out our socials and take a look at what we have to offer!</p>
            <p><a href="https://www.instagram.com/tastysnyc/?hl=en" target="_blank" rel="noreferrer">Instagram</a></p>
            <p><a href="https://www.facebook.com/tastysridgewood/" target="_blank" rel="noreferrer">Facebook</a></p>
          </div>
          <div className="col-12 col-md-4">
            <h2>Business Hours</h2>
            <p>Monday - Friday: 8:00AM - 10PM</p>
            <p>Saturday: 8:00AM - 11PM</p>
            <p>Sunday: CLOSED</p>
          </div>
          <div className="col-12 col-md-4">
            <h2>Address</h2>
            <p><strong>Tastys Diner</strong></p>
            <p>238 Mulberry St</p>
            <p>New York, NY 10012</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
