import React from 'react'

const slides = [
  "https://www.sixt.com/magazine/wp-content/uploads//sites/6/2024/08/Old-diners-in-the-US.jpg",
  "https://cinnamonsnail.com/wp-content/uploads/2024/01/Vegan-Banh-Mi-21.jpg",
  "https://www.spendwithpennies.com/wp-content/uploads/2023/07/1200-Philly-Cheesesteak-2-SpendWithPennies.jpg",
  "https://www.thescroller.net/wp-content/uploads/2025/01/working-men-diner-1013x1024.jpg",
  "https://assets.bonappetit.com/photos/5c33af7a0952c62cd717a5ab/4:3/w_1239,h_929,c_limit/adam-hero-nl.jpg",
  "https://static01.nyt.com/images/2024/02/06/multimedia/KD-philly-cheesesteak-mhqc/KD-philly-cheesesteak-mhqc-threeByTwoLargeAt2X.jpg",
  "https://images.jerseybites.com/wp-content/uploads/2017/07/Diner-Interior.jpg",
  "https://www.shutterstock.com/image-photo/italianamerican-chicken-fried-steak-sandwich-600nw-1502665109.jpg",
]

export default function Gallery(){
  return (
    <div className="container py-4">
      <div className="tastys-surface p-3">
        <h1 className="text-center" style={{ color: 'rgb(85, 107, 47)' }}>Gallery</h1>

        <div id="carouselTastys" className="carousel slide mt-3" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {slides.map((_, i) => (
              <button key={i} type="button" data-bs-target="#carouselTastys" data-bs-slide-to={i} className={i===0 ? "active" : ""} aria-label={`Slide ${i+1}`} />
            ))}
          </div>

          <div className="carousel-inner rounded">
            {slides.map((src, i) => (
              <div key={src} className={`carousel-item ${i===0 ? "active" : ""}`}>
                <img src={src} className="d-block w-100" alt={`Tastys slide ${i+1}`} style={{ objectFit: 'cover', aspectRatio: '16/9' }} />
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselTastys" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselTastys" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <section className="mt-4">
          <h2 className="text-center" style={{ color: 'rgb(85, 107, 47)' }}>About Us</h2>
          <p className="mx-auto" style={{ maxWidth: 900, color: 'rgb(85, 107, 47)', lineHeight: 1.6 }}>
            Tasty’s is a beloved neighborhood sandwich shop founded by John Miller, a hardworking New Yorker with a love for comfort food and community.
            After years in the restaurant business, John opened Tasty’s with the goal of serving fresh, flavorful sandwiches made the old-fashioned way — with quality
            ingredients and plenty of care. What began as a small corner spot quickly grew into a local favorite, known for its hearty heroes, homemade sauces, and
            welcoming atmosphere. Rooted in John’s dedication to honest food and friendly service, Tasty’s continues to bring people together one sandwich at a time.
          </p>
        </section>
      </div>
    </div>
  )
}
