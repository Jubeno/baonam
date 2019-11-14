import React from 'react';
// import Link from '@/utils/ActiveLink';
import getConfig from 'next/config'
import Slider from "react-slick";

const { publicRuntimeConfig } = getConfig()
// import styles from './Slides.less';
const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  fade: true,
  speed: 1500,
  autoplaySpeed: 3000,
  pauseOnHover: false,
  pauseOnFocus: false,
  dots: false,
  prevArrow: '<span class="slick-prev">Previous</span>',
  nextArrow: '<span class="slick-next">Next</span>',
};
const Slides = ({ dataSlide }) => (
  // <section className="awe-section-1" style={{ marginBottom: "50px" }}>
  //   <div className="home-slider owl-carousel owl-loaded owl-drag" data-lg-items={1} data-md-items={1} data-sm-items={1} data-xs-items={1} data-margin={0} data-dot="false" >
  //     <div className="owl-stage-outer">
  //       <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1349px' }}>
  //         {dataSlide && dataSlide.length > 0 && dataSlide.map((item) => (
  //           <div className="owl-item active" style={{ width: '1349px' }} key={`slide_${item.id}`}>
  //             <div className="item">
  //               <a className="clearfix">
  //                 <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.contents}`} alt={item.title} />
  //               </a>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // </section>
    <div className="keyv">
      <ul className=" kSlider">
        <Slider {...settings}>
          {dataSlide && dataSlide.length > 0 && dataSlide.map((item,index) => (
            <li className="slide1" key={index} >
                <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.contents}`} alt={item.title} />
            </li>
            ))}
        </Slider>
      </ul>
    </div>
)

export default (Slides);
