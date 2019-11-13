/* eslint-disable global-require */
/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import $ from 'jquery';

// import CONFIG from '../../lib/config';
import NbmImage from '../../lib/NbmImage';

if (typeof window !== 'undefined') {
  // require('jquery-zoom')
  // require('slick-carousel')
}

function jqueryGalery() {
  $(document).ready(function () {
    // $('.slider-for').unslick()
    // $('.slider-nav').unslick()

    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      asNavFor: '.slider-nav',
      infinite: true,
      // autoplay: true
    });
    $('.slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: true,
      centerMode: false,
      focusOnSelect: true,
      infinite: true,
      centerPadding: '10px',
      // fade: true,
      // cssEase: 'linear',
      rows: 1,
      variableWidth: true
      // initialSlide: 4
      // autoplay: true
    });
    // $('#slick').slick()
  });
}

class Gallery extends React.PureComponent {
  /* constructor(props){
    super(props);
    this.state = {
      display: 'none'
    }
  } */

  componentDidMount() {
    const { screenShots } = this.props;
    if (typeof window !== 'undefined') {
      if (screenShots && screenShots.split(',').length > 0) {
        this.timeout = setTimeout(() => {
          jqueryGalery();
          // this.setState({ display: 'block' })
        }, 500)
      } else {
        jqueryGalery();
      }
    }
  }

  componentWillUnmount(){
    // clearTimeout(timeout)
    
  }

  render() {
    const { screenShots, productName, productImage } = this.props;
    // const { display } = this.state;
    return (
      <div>
        <div className="slider-for media-gallery large-image" style={{ border: '2px solid #e1e1e1' }}>
          <div>
            {/* <span className='zoom'> */}
            <NbmImage
              src={`${productImage}`}
              type="IMAGE_PRODUCT_DETAIL"
              zoom
            />
            {/* </span> */}
          </div>
          {screenShots && screenShots.split(',').map((item, index) => {
            return (
              <div key={index}>
                {/* <span className='zoom'> */}
                <NbmImage
                  src={`${item}`}
                  type="IMAGE_PRODUCT_DETAIL"
                  alt={productName}
                  zoom
                />
                {/* </span> */}
              </div>
            )
          })}
        </div>
        <div id="gallery_01" className="slider-nav">
          <div key={`gallery-${0}`} className="item">
            <a className="border-radius-10" href="javascript:void(0);">
              <NbmImage
                keys={`gallery-${0}`}
                type="IMAGE_PRODUCT_DETAIL"
                src={`${productImage}`}
                alt={productName}
                className="img-responsive"
              />
            </a>
          </div>
          {
            screenShots && screenShots.split(',').map((item, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`gallery-${index}`} className="item">
                  <a className="border-radius-10" href="javascript:void(0);">
                    <NbmImage
                      keys={`gallery-${index}`}
                      type="IMAGE_PRODUCT_DETAIL"
                      src={`${item}`}
                      alt={productName}
                      className="img-responsive"
                    />
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Gallery;