/* eslint-disable react/jsx-curly-brace-presence */
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

/* function resetSlick(id) {
  $(document).ready(function () {
    $(`.slider-for-modal-${id}`).unslick();
    $(`.slider-nav-modal-${id}`).unslick();
  })
} */

function jqueryGaleryModal(id) {
  $(document).ready(function () {
    $(`.slider-for-modal-${id}`).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      asNavFor: `.slider-nav-modal-${id}`,
      infinite: true,
      // autoplay: true
    });
    $(`.slider-nav-modal-${id}`).slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: `.slider-for-modal-${id}`,
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

class GalleryModal extends React.PureComponent {
  /* constructor(props){
    super(props);
    this.state = {
      display: 'none'
    }
  } */

  componentDidMount() {
    const { screenShots, id } = this.props;
    if (typeof window !== 'undefined') {
      if (screenShots && screenShots.split(',').length > 0) {
        this.timeout = setTimeout(() => {
          jqueryGaleryModal(id);
          // this.setState({ display: 'block' })
        }, 500)
      } else {
        jqueryGaleryModal(id);
      }
    }
  }

  /* componentWillUnmount() {
    const { id } = this.props;
    if (typeof window !== 'undefined') {
      resetSlick(id);
    }
  } */

  render() {
    const { screenShots, productName, productImage, id } = this.props;
    // const { display } = this.state;
    return (
      <div>
        <div className={`slider-for-modal-${id} media-gallery large-image`} style={{ border: '2px solid #e1e1e1' }}>
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
        <div id="gallery_01" className={`slider-nav-modal-${id}`}>
          <div key={`gallery-${0}-${id}`} className="item">
            <a className="border-radius-10" href="javascript:void(0);">
              <NbmImage
                keys={`gallery-${0}-${id}`}
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
                <div key={`gallery-${index}-${id}`} className="item">
                  <a className="border-radius-10" href="javascript:void(0);">
                    <NbmImage
                      keys={`gallery-${index}-${id}`}
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

export default GalleryModal;