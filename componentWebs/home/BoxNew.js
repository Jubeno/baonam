/* eslint-disable react/button-has-type */
import React from 'react'
// import { graphql, withApollo } from 'react-apollo'
// import { filter, propType } from 'graphql-anywhere'
// import gql from 'graphql-tag'
// import { compose, withState, withHandlers, lifecycle } from 'recompose'
// import Router from 'next/router'
import _ from 'lodash';
import { FormattedMessage } from 'react-intl'
import ModalShow from '../common/Modal'
import EncodeUrl from '../../lib/utils/encode'
import Link from '../../lib/utils/ActiveLink';
import NbmImage from '../../lib/NbmImage';
// import CONFIG from '../../lib/config';

class BoxNew extends React.PureComponent {
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

  render() {
    const { data: { allProducts } } = this.props;
    if (typeof allProducts === 'undefined') return null;
    const { show, data } = this.state
    const data4Array = _.chunk(allProducts.payload, 4);

    return (
      <React.Fragment>
        {
          data4Array[0] && data4Array[0].length > 0 &&
          <section className="awe-section-2">
            <section className="section_product_hotdeal index-product">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="title_module_main">
                      <h2>
                        <a style={{ color: '#575454' }}><FormattedMessage id='product.new' /></a>
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="wrap_owl">
                      <div className="owl-carousel owl-hotdeals" data-xs-items="2">
                        {
                          data4Array[0] && data4Array[0].map(item => {
                            return (
                              <div key={item.id} className="item_product_main">
                                <div className="product-box product-item-main">
                                  <div className="product-thumbnail">
                                    <Link className="image_thumb" path={`/productdetail/productdetail?ProductID=${item.id}`} href={`/${EncodeUrl(item.category.name)}/${EncodeUrl(item.productName)}-${item.id}`} title={item.productName}>
                                      <NbmImage
                                        keys={item.id}
                                        type="IMAGE_PRODUCT_HOME"
                                        src={`${item.productImage}`}
                                        alt={item.productName}
                                      />
                                    </Link>
                                    <div className="product-action clearfix">
                                      <form action="/cart/add" method="post" className="variants form-nut-grid" data-id="product-actions-13738921" encType="multipart/form-data">
                                        <div className="group_action">
                                          <input type="hidden" name="variantId" defaultValue={23011034} />
                                          <a data-handle="ban-noguchi-prismatic" className="btn-white btn_view btn right-to quick-view" title="Xem nhanh" onClick={e => this.showModal(e, item)} id="myModal">
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
                                        path={`/productdetail/productdetail?ProductID=${item.id}`}
                                        href={`/${EncodeUrl(item.category.name)}/${EncodeUrl(item.productName)}-${item.id}`}
                                        title={item.productName}
                                        style={{ color: '#575454' }}
                                      >
                                        {item.productName}
                                      </Link>
                                    </h3>
                                    <div className="product-item-price price-box">
                                      <span className="special-price">
                                        <span className="price product-price"><FormattedMessage id='contact' /></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        }
        {
          data4Array[1] && data4Array[1].length > 0 &&
          <section className="awe-section-2">
            <section className="section_product_hotdeal index-product">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="wrap_owl">
                      <div className="owl-carousel owl-hotdeals" data-xs-items="2">
                        {
                          data4Array[1].map(item => {
                            return (
                              <div key={item.id} className="item_product_main">
                                <div className="product-box product-item-main">
                                  <div className="product-thumbnail">
                                    <Link
                                      className="image_thumb"
                                      path={`/productdetail/productdetail?ProductID=${item.id}`}
                                      href={`/${EncodeUrl(item.category.name)}/${EncodeUrl(item.productName)}-${item.id}`}
                                      title={item.productName}
                                    >
                                      <NbmImage
                                        keys={item.id}
                                        type="IMAGE_PRODUCT_HOME"
                                        src={`${item.productImage}`}
                                        alt={item.productName}
                                      />
                                    </Link>
                                    <div className="product-action clearfix">
                                      <form action="/cart/add" method="post" className="variants form-nut-grid" data-id="product-actions-13738921" encType="multipart/form-data">
                                        <div className="group_action">
                                          <input type="hidden" name="variantId" defaultValue={23011034} />
                                          <a data-handle="ban-noguchi-prismatic" className="btn-white btn_view btn right-to quick-view" title="Xem nhanh" onClick={e => this.showModal(e, item)}>
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
                                        path={`/productdetail/productdetail?ProductID=${item.id}`}
                                        href={`/${EncodeUrl(item.category.name)}/${EncodeUrl(item.productName)}-${item.id}`}
                                        title={item.productName}
                                        style={{ color: '#575454' }}
                                      >
                                        {item.productName}
                                      </Link>
                                    </h3>
                                    <div className="product-item-price price-box">
                                      <span className="special-price">
                                        <span className="price product-price"><FormattedMessage id='contact' /></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        }
        {
          data4Array[2] && data4Array[2].length > 0 &&
          <section className="awe-section-2">
            <section className="section_product_hotdeal index-product">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="wrap_owl">
                      <div className="owl-carousel owl-hotdeals" data-xs-items="2">
                        {
                          data4Array[2].map(item => {
                            return (
                              <div key={item.id} className="item_product_main">
                                <div className="product-box product-item-main">
                                  <div className="product-thumbnail">
                                    <Link
                                      className="image_thumb"
                                      path={`/productdetail/productdetail?ProductID=${item.id}`}
                                      href={`/${EncodeUrl(item.category.name)}/${EncodeUrl(item.productName)}-${item.id}`}
                                      title={item.productName}
                                    >
                                      <NbmImage
                                        keys={item.id}
                                        type="IMAGE_PRODUCT_HOME"
                                        src={`${item.productImage}`}
                                        alt={item.productName}
                                      />
                                    </Link>
                                    <div className="product-action clearfix">
                                      <form action="/cart/add" method="post" className="variants form-nut-grid" data-id="product-actions-13738921" encType="multipart/form-data">
                                        <div className="group_action">
                                          <input type="hidden" name="variantId" defaultValue={23011034} />
                                          {/* <button className="btn-buy btn-cart btn btn-gray   left-to add_to_cart" title="Cho vào giỏ hàng">
                                    <span>
                                      <i className="fa fa-shopping-basket" aria-hidden="true" />
                                    </span>
                                  </button> */}
                                          <a data-handle="ban-noguchi-prismatic" className="btn-white btn_view btn right-to quick-view" title="Xem nhanh" onClick={e => this.showModal(e, item)}>
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
                                        path={`/productdetail/productdetail?ProductID=${item.id}`}
                                        href={`/${EncodeUrl(item.category.name)}/${EncodeUrl(item.productName)}-${item.id}`}
                                        title={item.productName}
                                        style={{ color: '#575454' }}
                                      >
                                        {item.productName}
                                      </Link>
                                    </h3>
                                    <div className="product-item-price price-box">
                                      <span className="special-price">
                                        <span className="price product-price"><FormattedMessage id='contact' /></span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        }
        <ModalShow showModal={show} data={data} />
      </React.Fragment>
    )
  }
}

export default BoxNew