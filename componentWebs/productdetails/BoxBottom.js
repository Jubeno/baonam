/* eslint-disable react/button-has-type */
import React from 'react'
import { FormattedMessage } from 'react-intl'
// import { graphql, withApollo } from 'react-apollo'
// import { filter, propType } from 'graphql-anywhere'
// import gql from 'graphql-tag'
// import { compose, withState, withHandlers, lifecycle } from 'recompose'
// import Router from 'next/router'
import ModalShow from '../common/Modal'
import EncodeUrl from '../../lib/utils/encode'
import Link from '../../lib/utils/ActiveLink';
import NbmImage from '../../lib/NbmImage';
// import CONFIG from '../../lib/config';

class BoxBottom extends React.PureComponent {
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
    const { data: { allProducts }, categoryId } = this.props;

    const { show, data } = this.state
    const dataArray = allProducts && allProducts.payload.filter(item => item.categoryId === categoryId)
    // console.log("dataArray",dataArray)
    return (
      <React.Fragment>
        {
          dataArray && dataArray.length > 0 &&
          <section className="awe-section-2">
            <section className="section_product_hotdeal index-product">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="title_module_child a-left title_module_main" style={{ borderBottom: "2px solid #e1e1e1" }}>
                      <h2>
                        <a style={{ color: '#575454' }}><FormattedMessage id='product.type' /></a>
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="wrap_owl">
                      <div className="owl-carousel owl-hotdeals" data-xs-items="2">
                        {
                          dataArray && dataArray.map(item => {
                            return (
                              <div
                                // key={`boxBottom-${item.id}`} 
                                className="item_product_main"
                              >
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
        <ModalShow showModal={show} data={data} />
      </React.Fragment>
    )
  }
}

export default BoxBottom