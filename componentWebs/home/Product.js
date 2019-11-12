import React from 'react';
import EncodeUrl from '../../lib/utils/encode';
import { connect } from 'react-redux'
import { compose, withState, withHandlers } from 'recompose'
import { addToCart } from '../../lib/cart/actions'
import moment from 'moment'
import numeral from 'numeral'
import log from '../../lib/utils/log'
const typeLog = 'log'
import NbmImage from '../../lib/NbmImage';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Product = ({ product, handleAddToCart }) => {
  try {
    const { id, productName, productImage, price, views, savePrice, category, dealPrice, deadlineDate } = product
    let countDown, deal_price_format, discount_format, price_format, linkProduct
    try {
      linkProduct = `/${EncodeUrl(category.categoryName)}/${EncodeUrl(productName)}-${id}`
      countDown = moment(deadlineDate).unix()
      deal_price_format = numeral(dealPrice).format('0,0')
      // discount_format = numeral((parseInt(savePrice) / parseInt(price))).format('0%')
      discount_format = numeral(((Number(price) - Number(dealPrice)) / Number(price))).format('0%')
      price_format = numeral(price).format('0,0')
    } catch (error) {
      log(typeLog, "error tren: ", error)
      countDown = 0
      deal_price_format = 0
      discount_format = 0
      price_format = 0
      linkProduct = ''
    }

    // log(typeLog, "components -> home -> Product -> id:%o, productName:%o, deal_price_format: %o, discount_format:%o, price_format:%o, views:%o, linkProduct:%o, countDown:%o, productImage:%o", id, productName, deal_price_format, discount_format, price_format, views, linkProduct, countDown, productImage)
    return (
      <React.Fragment>
        <div className="item">
          <div className="product-box">
            <div className="product-thumbnail flexbox-grid">
              <a href={linkProduct} title={productName} data={`${publicRuntimeConfig.IMAGE_SERVER}||${publicRuntimeConfig.IMAGE_SERVER}`}>
                <NbmImage
                  src={`${publicRuntimeConfig.IMAGE_SERVER}/${productImage}`}
                  alt={`${productName}`}
                  type="IMAGE_PRODUCT_HOME"
                />
              </a>
              <div className="sale-flash">
                <div className="before" />- {discount_format} </div>
            </div>
            <div className="product-info a-center">
              <h3 className="product-name"><a href={linkProduct} title={productName}>{productName}</a></h3>
              <div className="price-box clearfix">
                <div className="special-price">
                  <span className="price product-price pull-left">{deal_price_format}₫</span>
                  <span className="price product-price pull-right"><del> {price_format}₫</del></span>
                </div>
              </div>
              <div>
                <button onClick={handleAddToCart()} className="btn btn-lg btn-primary btn-cart btn-cart2 add_to_cart btn_buy add_to_cart" title="Cho vào giỏ hàng">
                  <i className="fa fa-cart-plus" />
                  <span className="cart_btn_to_cart_margin">Cho vào giỏ  <i className="fa .fa-caret-right" /></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  } catch (error) {
    log(typeLog, "error: ", error)
    return <div>Error Product: {error}</div>
  }
  return <div></div>
}

export default compose(
  connect(state => {
    return ({
      shoppingCart: state.shoppingCart,
    })
  }, { addToCart }),
  withHandlers({
    handleAddToCart: props => () => event => {
      event.preventDefault()
      event.stopPropagation()
      log(typeLog, "handleAddToCart props: %o \n event id: %o \n selectQuantity: %o", props, event.target.id, props.selectQuantity)
      const { cart, products } = props.shoppingCart
      const arrCart = Object.keys(cart.quantityById)
      const quantity = 1
      const previousQuantity = cart.quantityById[props.product.id] || 0
      const newQuantity = (quantity + previousQuantity) <= props.product.quantities ? (quantity + previousQuantity) : props.product.quantities
      props.addToCart(props.product, newQuantity, previousQuantity)
    }
  }),
)(Product)