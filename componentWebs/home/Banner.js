import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import NbmLink from '../../lib/utils/customLink'
import EncodeUrl from '../../lib/utils/encode'
import { compose, withState, withHandlers, mapProps, lifecycle } from 'recompose'
import { getAllAdsBanner } from '../../lib/withLayout'
import log from '../../lib/utils/log'
const typeLog = 'log'
import NbmImage from '../../lib/NbmImage';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Banner = ({ dataAds: { dataAllAdsBanner: { allAdvertisments } } }) => {
  // log(typeLog, "components -> common -> Banner -> dataAds -> allAdvertisments:%o \n dataAllAdsBottom: %o \n dataAllAdsRight:%o \n dataAllAdsSwiperMobile: %o", allAdvertisments, dataAllAdsBottom, dataAllAdsRight, dataAllAdsSwiperMobile)
  log(typeLog, "publicRuntimeConfig.IMAGE_SERVER:", publicRuntimeConfig.IMAGE_SERVER)
  return (
    <React.Fragment>
      <div className="home-slider owl-carousel owl-loaded owl-drag" data-lg-items={1} data-md-items={1} data-sm-items={1} data-xs-items={1} data-margin={0} data-nav="true">
        {allAdvertisments && allAdvertisments.payload && allAdvertisments.payload.map((item, index) => {
          return (
            <div key={index} className="item">
              <a href='#' className="clearfix">
                <NbmImage
                  src={`${publicRuntimeConfig.IMAGE_SERVER}/${item.imageUrl}`}
                  alt="alt banner demo"
                  type="IMAGE_SLIDE_HOME"
                />
              </a>
            </div>
          )
        })}
      </div>


      {/* <div className="home-slider owl-carousel" data-lg-items={1} data-md-items={1} data-sm-items={1} data-xs-items={1} data-margin={0} data-nav="true">
          {allAdvertisments && allAdvertisments.payload && allAdvertisments.payload.map((item, index) => {
            return (
              <div key={index} className="item">
                <a href={item.urlRedirect} className="clearfix">
                  <img src={`${publicRuntimeConfig.IMAGE_SERVER}/${item.imageUrl}`} alt="alt slider demo" />
                </a>
              </div>
            )
          })}
        </div> */}
    </React.Fragment>
  )
}

// const getAllAdsBanner = gql`
//   query getAllAdsBanner ($filter: Json) {
//     allAdvertisments(filter:$filter, offset:0, limit:8){
//       payload{
//         id
//         name
//         urlRedirect
//         imageUrl
//         descriptions
//         type
//       }
//       meta{
//         count
//       }
//     }
//   }
// `

// const BannerGraphql = graphql(getAllAdsBanner, {
//   options: ({ }) => ({
//     variables: {
//       filter: { adsPositionId: parseInt(publicRuntimeConfig.ADS_POSITION_SLIDE_SHOW) }
//     }
//   }),
//   props: ({ data }) => ({
//     data
//   })
// })

function jquerySlider() {
  $('.home-slider.owl-carousel').each(function () {
    var xss_item = $(this).attr('data-xss-items');
    var xs_item = $(this).attr('data-xs-items');
    var sm_item = $(this).attr('data-sm-items');
    var md_item = $(this).attr('data-md-items');
    var lg_item = $(this).attr('data-lg-items');
    var lgg_item = $(this).attr('data-lgg-items');
    var margin = $(this).attr('data-margin');
    var dot = $(this).attr('data-dot');
    var nav = $(this).attr('data-nav');
    if (typeof margin !== typeof undefined && margin !== false) {
    } else {
      margin = 30;
    }
    if (typeof xss_item !== typeof undefined && xss_item !== false) {
    } else {
      xss_item = 1;
    }
    if (typeof xs_item !== typeof undefined && xs_item !== false) {
    } else {
      xs_item = 1;
    }
    if (typeof sm_item !== typeof undefined && sm_item !== false) {

    } else {
      sm_item = 3;
    }
    if (typeof md_item !== typeof undefined && md_item !== false) {
    } else {
      md_item = 3;
    }
    if (typeof lg_item !== typeof undefined && lg_item !== false) {
    } else {
      lg_item = 4;
    }
    if (typeof lgg_item !== typeof undefined && lg_item !== false) {
    } else {
      lgg_item = lg_item;
    }
    if (typeof dot !== typeof undefined && dot !== true) {
      dot = dot;
    } else {
      dot = false;
    }
    if (typeof nav !== typeof undefined && nav !== true) {
      nav = nav;
    } else {
      nav = false;
    }
    $(this).owlCarousel({
      loop: false,
      margin: Number(margin),
      responsiveClass: true,
      dots: dot,
      autoHeight: false,
      nav: nav,
      navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      responsive: {
        0: {
          items: Number(xss_item),
          margin: 15
        },
        543: {
          items: Number(xs_item),
          margin: 15
        },
        768: {
          items: Number(sm_item)
        },
        992: {
          items: Number(md_item)
        },
        1200: {
          items: Number(lg_item)
        },
        1500: {
          items: Number(lgg_item)
        }
      }
    })
  })
}

const enhance = compose(
  // withApollo,
  // withState("data", "updateData", {}),
  withState("runSlide", "updateRunSilde", false),
  lifecycle({
    componentDidMount() {
      try {
        jquerySlider()
        // log(typeLog, "components -> common -> Banner -> cache allAdvertisments: ", data)
      } catch (error) {
      }
    },
    componentDidUpdate() {
      log(typeLog, "components -> common -> Banner -> update")
      jquerySlider()
      this.props.updateRunSilde(true)
    },
    shouldComponentUpdate(nextProps, nextState) {
      if (
        nextProps.dataAds === this.props.dataAds
        && nextProps.runSlide
      ) {
        return false;
      }
      return true;
    }
  }),
  // BannerGraphql
)(Banner)

export default enhance