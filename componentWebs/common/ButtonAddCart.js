import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { addToCart } from '../../lib/cart/actions'
import log from '../../lib/utils/log'

const typeLog = 'log'

const ButtonAddCart = ({ handleAddToCart }) => {
  return (
    <React.Fragment>
      <button type="button" onClick={handleAddToCart()} className="btn btn-lg btn-primary btn-cart btn-cart2 add_to_cart btn_buy add_to_cart" title="Cho vào giỏ hàng">
        <i className="fa fa-cart-plus" />
        <span className="cart_btn_to_cart_margin">Cho vào giỏ  <i className="fa .fa-caret-right" /></span>
      </button>
    </React.Fragment>
  );
}

export default compose(
  connect(state => {
    return ({
      shoppingCart: state.shoppingCart,
    })
  }, { addToCart }),
  withHandlers({
    handleAddToCart: props => () => event => {
      
      // log(typeLog, "handleAddToCart props: %o \n event id: %o \n selectQuantity: %o", props, event.target.id, props.selectQuantity)
      const { cart } = props.shoppingCart
      // const arrCart = Object.keys(cart.quantityById)
      const quantity = 1
      const previousQuantity = cart.quantityById[props.product.id] || 0
      const newQuantity = (quantity + previousQuantity) <= props.product.quantities ? (quantity + previousQuantity) : props.product.quantities
      log(typeLog, "quantity:%o| previousQuantity:%o | newQuantity: %o", quantity, previousQuantity, newQuantity)
      props.addToCart(props.product, newQuantity, previousQuantity)
      event.preventDefault()
      event.stopPropagation()
    }
  }),
  lifecycle({
    shouldComponentUpdate(nextProps){
      if(
        nextProps.shoppingCart === this.props.shoppingCart
        && nextProps.product === this.props.product
      ){
        return false
      }
      return true
    }
  })
)(ButtonAddCart)