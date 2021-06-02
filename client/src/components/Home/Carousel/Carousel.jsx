import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// importing images
import banner1 from "../../../assets/banners/banner--1.png";
import banner2 from "../../../assets/banners/banner--2.png";
import banner3 from "../../../assets/banners/banner--3.png";
import banner4 from "../../../assets/banners/banner--4.png";

function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div
      style={{
        padding: "30px",
        marginBottom: "2rem",
        marginTop: "1rem",
        background:
          "radial-gradient(circle, rgba(80, 72, 222, 0) 0%, rgb(12 15 42 / 17%) 49%, rgb(27 29 48) 100%)",
        borderRadius: "12px",
      }}
    >
      <Slider {...settings}>
        <div>
          <img height="167px" src={banner1} alt="banner1" />
        </div>
        <div>
          <img height="167px" src={banner2} alt="banner2" />
        </div>
        <div>
          <img height="167px" src={banner3} alt="banner3" />
        </div>
        <div>
          <img height="167px" src={banner4} alt="banner4" />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
