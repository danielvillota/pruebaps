import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Menu } from '../../data/MenuFamily';
import { MenuGeneric } from '../../Props/Interfaces';
import { Link } from 'react-router-dom';


export const CarrouselFamily:React.FC<MenuGeneric> = ({data,padId}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              centerMode: false,
            },
          },
        ],
      };
  return (
<Slider {...settings} >
  {data.map((item: Menu) => {
    const currentPadId = item.alterpad ? padId[1] : padId[0];

    return (
      <div key={item.id} className="px-2 pb-4">
        <Link to={`${item.link}${currentPadId}`} className="hover:bg-gray-300 hover:border-white rounded-sm flex flex-col justify-center items-center w-full h-32">
          <img src={item.icon} alt="" className="w-16" />
          <h1 className="text-center mt-2 font-medium">{item.title}</h1>
        </Link>
      </div>
    );
  })}
</Slider>
  )
}
