import React from 'react';
// import { connect } from 'react-redux';
// import moment from 'moment'
// import numeral from 'numeral'
import { FormattedMessage } from 'react-intl'
import { compose, withHandlers, lifecycle } from 'recompose'

import EncodeUrl from '../../lib/utils/encode';
import Link from '../../lib/utils/ActiveLink'
import NbmImage from '../../lib/NbmImage';
// import CONFIG from '../../lib/config';

const moment = require('moment');
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
const typeLog = 'infop'

const New = ({ newData }) => {
  const {
    id,
    image,
    title,
    createdAt,
    author,
    short,
  } = newData;

  let linkNews;
  let pathNews;
  try {
    pathNews = `/news/detail?id=${id}`;
    linkNews = `/${EncodeUrl(title)}-${id}`
  } catch (error) {
    pathNews = '';
    linkNews = '';
  }
  console.log("Da",author )
  return (
    <React.Fragment>
      <div className="blog_full margin-bottom-30">
        <div className="blog-inner">
          <div className="blog-img col-lg-5 col-md-5 col-sm-4 col-xs-12">
            <Link
              className="image_thumb"
              path={`${pathNews}`}
              href={`${linkNews}`}
              title={title}
            >
              <NbmImage
                keys={id}
                type="IMAGE_ARTICLES"
                src={`${image}`}
                alt={title}
              />
            </Link>
          </div>
          <div className="content_blog_full col-lg-7 col-md-7 col-sm-8 col-xs-12">
            <h3>
              <Link
                title={title}
                path={`${pathNews}`}
                href={`${linkNews}`}
              >{title}
              </Link>
            </h3>
            <span className="time_post f"><i className="fa fa-clock-o" />&nbsp;
              {moment(createdAt).format('DD/MM/YYYY')}
            </span>
            <span className="time_post"><i className="fa fa-user" aria-hidden="true" />&nbsp;<FormattedMessage id='article.poster' /> : {author}</span>
            <div className="blog-description">
              <div dangerouslySetInnerHTML={{ __html: short }} />
              <Link
                className="button_custome_35"
                path={`${pathNews}`}
                href={`${linkNews}`}
                title="Đọc tiếp"
              >
                <FormattedMessage id="article.Showdetail" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default compose(
  /* connect(state => {
    return ({
      shoppingCart: state.shoppingCart,
    })
  }, { addToCart }), */
  withHandlers({
    /* handleAddToCart: props => () => event => {
      event.preventDefault()
      event.stopPropagation()
      const { cart, products } = props.shoppingCart
      const arrCart = Object.keys(cart.quantityById)
      const quantity = 1
      const previousQuantity = cart.quantityById[props.product.id] || 0
      const newQuantity = (quantity + previousQuantity) <= props.product.quantities ? (quantity + previousQuantity) : props.product.quantities
      // log(typeLog, "handleAddToCart props: %o \n event id: %o \n newQuantity: %o", props, event.target.id, newQuantity)
      props.addToCart(props.product, newQuantity, previousQuantity)
    } */
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      if (
        nextProps.newData === this.props.newData
        // && nextProps.shoppingCart === this.props.shoppingCart
      ) {
        return false
      }
      return true
    }
  })
)(New)