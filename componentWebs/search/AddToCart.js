import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose, withState, withHandlers } from 'recompose'
import { addToCart } from '../../lib/cart/actions'
import { getVisibleProducts } from '../../lib/cart/reducers/products'
import log from '../../lib/utils/log'
const typeLog = 'log'

const AddToCart = ({ product, addToCart, shoppingCart, handleAddToCart }) => {
  // console.log("product: ", product)
  // const { cart, products } = shoppingCart
  // const arrCart = Object.keys(cart.quantityById)
  // const isHavingQuantity = product && product.quantities > (cart.quantityById[product.id] || 0)
  return (
    <React.Fragment>
      {/* <button type="button" onClick={handleAddToCart()} className="btn-buy btn-cart btn btn-primary left-to add_to_cart" data-toggle="tooltip" title="Đặt hàng">
        <i className="fa fa-shopping-bag" />
      </button> */}
      <a onClick={handleAddToCart()} href="#" className="btn btn-primary themvaogio">Thêm
                            vào giỏ</a>
    </React.Fragment>
  )
}

export default compose(
  connect(state => {
    // log(typeLog, "ProductList state: ", state)
    return ({
      shoppingCart: state.shoppingCart,
    })
  }, { addToCart }),
  withHandlers({
    handleAddToCart: props => () => event => {
      event.preventDefault()
      event.stopPropagation()
      // log(typeLog, "handleAddToCart props: %o \n event id: %o \n selectQuantity: %o", props, event.target.id, props.selectQuantity)
      const { shoppingCart: { cart, products } } = props
      const arrCart = Object.keys(cart.quantityById)
      const quantity = 1
      const previousQuantity = cart.quantityById[props.product.id] || 0

      props.addToCart(props.product, quantity, previousQuantity)
    }
  }),
)(AddToCart)
