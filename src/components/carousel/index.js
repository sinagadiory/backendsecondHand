import React from 'react'
// import "./style.css"

export default function Carousel() {
    return (
        <div className='container'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={require('../../image/img-banner.png')} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={require('../../image/img-banner.png')} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={require('../../image/img-banner.png')} className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
        // <div className='container caro'>
        //     <section id="slider">
        //         <input type="radio" name="slider" id="s1" />
        //         <input type="radio" name="slider" id="s2" />
        //         <input type="radio" name="slider" id="s3" checked />
        //         <input type="radio" name="slider" id="s4" />
        //         <input type="radio" name="slider" id="s5" />
        //         <label htmlFor="s1" id="slide1">
        //             <img className='s1' src={require('../../image/img-banner.png')} />
        //         </label>
        //         <label htmlFor="s2" id="slide2">
        //             <img className='s1' src={require('../../image/img-banner.png')} />
        //         </label>
        //         <label htmlFor="s3" id="slide3">
        //             <img className='s1' src={require('../../image/img-banner.png')} />
        //         </label>
        //         <label htmlFor="s4" id="slide4">
        //             <img className='s1' src={require('../../image/img-banner.png')} />
        //         </label>
        //         <label htmlFor="s5" id="slide5">
        //             <img className='s1' src={require('../../image/img-banner.png')} />
        //         </label>
        //     </section>
        // </div>
    )
}
