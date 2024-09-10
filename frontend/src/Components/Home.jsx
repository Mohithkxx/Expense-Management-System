import React from 'react'

function Home() {
  return (
    <div>
          {/* <!-- Hero Section --> */}
    <section id="hero" class="hero section">
      <div class="hero-bg">
        <img src={"images"} alt=""/>
      </div>
      <div class="container text-center">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h1 data-aos="fade-up">Welcome to <span>QuickStart</span></h1>
          <p data-aos="fade-up" data-aos-delay="100">Quickly start your project now and set the stage for success<br/></p>
          <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
            <a href="#about" class="btn-get-started">Get Started</a>
            <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" class="glightbox btn-watch-video d-flex align-items-center"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
          </div>
          <img src="assets/img/hero-services-img.webp" class="img-fluid hero-img" alt="" data-aos="zoom-out" data-aos-delay="300"/>
        </div>
      </div>

    </section>
    
    {/* <!-- /Hero Section --> */}
    </div>
  )
}

export default Home