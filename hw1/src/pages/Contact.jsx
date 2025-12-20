import React from 'react'

export default function Contact(){
  return (
    <div className="container py-4">
      <div className="tastys-surface p-3">
        <h1 className="text-center" style={{ color: 'rgb(85, 107, 47)' }}>Contact</h1>

        <div className="row g-3 mt-1">
          <div className="col-12 col-lg-6">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12086.942462628927!2d-73.97482882592234!3d40.767839342161494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2sHunter%20College!5e0!3m2!1sen!2sus!4v1762880980121!5m2!1sen!2sus"
              className="w-100 rounded"
              style={{ minHeight: 320, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="col-12 col-lg-6">
            <form className="d-flex flex-column gap-2" onSubmit={(e) => e.preventDefault()}>
              <label className="fw-semibold" style={{ color: 'rgb(85, 107, 47)' }}>Name:</label>
              <input className="form-control" placeholder="Your name" />

              <label className="fw-semibold mt-2" style={{ color: 'rgb(85, 107, 47)' }}>Email:</label>
              <input className="form-control" placeholder="you@example.com" />

              <label className="fw-semibold mt-2" style={{ color: 'rgb(85, 107, 47)' }}>Message:</label>
              <textarea className="form-control" rows="5" placeholder="Write your message..." />

              <button className="btn mt-2" style={{ backgroundColor: 'rgb(85, 107, 47)', color: 'blanchedalmond' }}>
                Submit
              </button>

              <p className="text-muted mb-0" style={{ fontSize: 12 }}>
                (This form is a UI mock — not connected to email.)
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
