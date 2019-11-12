/* eslint-disable react/button-has-type */
import React from 'react';
// import { connect } from 'react-redux';
// import moment from 'moment'
// import numeral from 'numeral'
import { FormattedMessage } from 'react-intl'
import { compose } from 'recompose'
import ModalShow from "../common/Modal"
import EncodeUrl from '../../lib/utils/encode';
// import { addToCart } from '../../lib/cart/actions'
import Link from '../../lib/utils/ActiveLink';
import NbmImage from '../../lib/NbmImage';
// import CONFIG from '../../lib/config';
// eslint-disable-next-line no-unused-vars
import log from '../../lib/utils/log'

// eslint-disable-next-line no-unused-vars
const typeLog = 'infop'

class Product extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: {}
    };
  }

  showModal = (e, item) => {
    const { show } = this.state
    this.setState({ show: !show, data: item })
  }

  // shouldComponentUpdate(nextProps) {
  //   if (
  //     nextProps.product === this.props.product
  //     // && nextProps.shoppingCart === this.props.shoppingCart
  //   ) {
  //     return false
  //   }
  //   return true
  // }


  render() {
    const { product } = this.props
    const { show, data } = this.state
    const {
      id,
      productName,
      productImage,
      // price,
      // views,
      category,
    } = product;

    let linkProduct;
    let pathProduct;
    try {
      pathProduct = `/productdetail/productdetail?ProductID=${id}`;
      linkProduct = `/${EncodeUrl(category && category.name || 'danh muc')}/${EncodeUrl(productName)}-${id}`
    } catch (error) {
      pathProduct = '';
      linkProduct = '';
    }

    return (
      <React.Fragment>
        <div className="col-xs-6 col-sm-4 col-md-3 col-lg-3 product-col">
          <div className="item_product_main margin-bottom-20">
            <div className="product-box product-item-main">
              <div className="product-thumbnail" style={{ border: '1px solid #ddd' }}>
                <Link
                  className="image_thumb"
                  path={`${pathProduct}`}
                  href={`${linkProduct}`}
                  title={productName}
                >
                  <NbmImage
                    keys={id}
                    type="IMAGE_PRODUCT"
                    src={`${productImage}`}
                    alt={productName}
                  />
                </Link>
                <div className="product-action hidden-md hidden-sm hidden-xs clearfix">
                  <form action="#" method="post" className="variants form-nut-grid" encType="multipart/form-data">
                    <div className="group_action">
                      <input type="hidden" name="variantId" />
                      <a data-handle="ban-5012-big-foot" className="btn-white btn_view btn right-to quick-view" title="Xem nhanh" onClick={e => this.showModal(e, product)}>
                        <i className="fa fa-search" aria-hidden="true" />
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bizweb-product-reviews-badge" />
              <div className="product-info product-bottom">
                <h3 className="product-name">
                  <Link
                    path={`${pathProduct}`}
                    href={`${linkProduct}`}
                    title={productName}
                    style={{ color: '#575454' }}
                  >
                    {productName}
                  </Link>
                </h3>
                <div className="product-item-price price-box">
                  <span className="special-price">
                    <span className="price product-price"><FormattedMessage id="contact" /></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalShow showModal={show} data={data} />
      </React.Fragment>
    )
  }
}
export default compose(
)(Product)