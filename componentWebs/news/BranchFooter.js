import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { Router } from '../../routes'
import ErrorMessage from '../error/ErrorMessage'
import $ from 'jquery'
import Pagination from '../../lib/utils/pagination';
import { withRouter } from 'next/router'
import log from '../../lib/utils/log'
const moment = require('moment');
const typeLog = 'infop'
import NbmImage from '../../lib/NbmImage';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const getBranch = gql`
  query getBranch($filter:Json,$order:[[String]],$offset:Int!,$limit:Int!){
    allAdvertisments(
      filter:$filter,
      order:$order,
      offset:$offset,
      limit:$limit
    ) {
      payload {
        id
        imageUrl
      }
    }
  }
`


const BranchFooter = ({ dataAdsThuonghieu }) => {
  const list = dataAdsThuonghieu && dataAdsThuonghieu.allAdvertisments ? dataAdsThuonghieu.allAdvertisments : {}
  log('log', "data thuonghieu: ", list)
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 divthuonghieu">
          <h4 className="thuonghieu">THƯƠNG HIỆU</h4>
        </div>
        <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10 divanhthuonghieu">
          <div className="owl-carousel owl-theme thuonghieu">
            {list.payload && list.payload.map((item, index) => {
              return (
                <div key={index} className="item">
                  <NbmImage
                    src={`${publicRuntimeConfig.IMAGE_SERVER}/${item.imageUrl}`}
                    width={200}
                    height={150}
                    type="IMAGE_INFOMATION"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* <script dangerouslySetInnerHTML={{
        __html: `$(document).ready(function() {
            $('.owl-carousel.thuonghieu').owlCarousel({
              loop: true,
              margin: 0,
              nav: false,
              items: 7,
              autoplay: true,
              dots: false,
              responsive: {
                0: {
                  items: 3
                },
                600: {
                  items: 5
                },
                1000: {
                  items: 7
                }
              }
            });
          });`}}>

      </script> */}

    </React.Fragment>
  )
}

const graphqlList = graphql(getBranch, {
  ssr: false,
  options: ({ router: { query } }) => {
    // log(typeLog, "components -> products -> ProductList -> filterPrice:: ", filterPrice)

    return ({
      variables: {
        "filter": { "adsPositionId": publicRuntimeConfig.ADS_POSITION_BOTTOM, "status": 1 },
        "order": [["id", "ASC"]],
        "offset": 0,
        "limit": 10
      }
    })
  },
  props: ({ data }) => ({
    data
  })
})

export default compose(
  withRouter,
  // graphqlList,
  lifecycle({
    componentDidMount() {
      console.log('branch->didmount')
      $(document).ready(function () {
        $('.owl-carousel.thuonghieu').owlCarousel({
          loop: true,
          margin: 0,
          nav: false,
          items: 7,
          autoplay: true,
          dots: false,
          responsive: {
            0: {
              items: 3
            },
            600: {
              items: 5
            },
            1000: {
              items: 7
            }
          }
        });
      });
    },
    /* componentDidUpdate() {
      console.log('branch->didmount')
      $(document).ready(function () {
        $('.owl-carousel.thuonghieu').owlCarousel({
          loop: true,
          margin: 0,
          nav: false,
          items: 7,
          autoplay: true,
          dots: false,
          responsive: {
            0: {
              items: 3
            },
            600: {
              items: 5
            },
            1000: {
              items: 7
            }
          }
        });
      });
    } */
  })
)(BranchFooter)

