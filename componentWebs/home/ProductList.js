import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Router } from '../../routes'
import ErrorMessage from '../error/ErrorMessage'
import Product from './Product';
import Pagination from '../../lib/utils/pagination';
import log from '../../lib/utils/log'
const typeLog = 'log'

function handleClick(event, id) {
  event.preventDefault()
  // With route name and params
  // Router.pushRoute('blog/entry', { id: id })
  // With route URL
  Router.pushRoute(`/blog/${id}`)
}

function ProductList({
  dataProduct: { error, allProducts }
}) {
  // log(typeLog, "components -> home -> ProductList -> dataProduct: ", allProducts)
  try {
    if (error) return <ErrorMessage message={`Error loading products: ${error}`} />
    if (allProducts && allProducts.payload) {
      return (
        <React.Fragment>
          <div className="products products-view-grid owl-carousel owl-loaded owl-drag" data-lgg-items={4} data-lg-items={4} data-md-items={4} data-sm-items={3} data-xs-items={2} data-xss-items={2} data-nav="true">
            {allProducts.payload.map((item, index) => {
              return (
                <Product key={index} product={item} />
              )
            })}
            {/* <div className="item">
              <div className="product-box">
                <div className="product-thumbnail flexbox-grid">
                  <a href title>
                    <img src="public/images/product/trangchu.png" alt />
                  </a>
                  <div className="sale-flash">
                    <div className="before" />- 33% </div>
                </div>
                <div className="product-info a-center">
                  <h3 className="product-name"><a href title="Vải thiều loại to">Sản phẩm 1</a></h3>
                  <div className="price-box clearfix">
                    <div className="special-price">
                      <span className="price product-price pull-left">80.000₫</span>
                      <span className="price product-price pull-right"><del> 123.000₫</del></span>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-lg btn-primary btn-cart btn-cart2 add_to_cart btn_buy add_to_cart" title="Cho vào giỏ hàng">
                      <i className="fa fa-cart-plus" />
                      <span>Đặt hàng ngay  <i className="fa .fa-caret-right" /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="product-box">
                <div className="product-thumbnail flexbox-grid">
                  <a href title>
                    <img src="public/images/product/trangchu1.png" alt />
                  </a>
                  <div className="sale-flash">
                    <div className="before" />-
                    33%
                                          </div>
                </div>
                <div className="product-info a-center">
                  <h3 className="product-name"><a href title="Vải thiều loại to">Sản phẩm 1</a></h3>
                  <div className="price-box clearfix">
                    <div className="special-price">
                      <span className="price product-price pull-left">80.000₫</span>
                      <span className="price product-price pull-right"><del> 123.000₫</del></span>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-lg btn-primary btn-cart btn-cart2 add_to_cart btn_buy add_to_cart" title="Cho vào giỏ hàng">
                      <i className="fa fa-cart-plus" />
                      <span>Đặt hàng ngay  <i className="fa .fa-caret-right" /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="product-box">
                <div className="product-thumbnail flexbox-grid">
                  <a href title>
                    <img src="public/images/product/trangchu1.png" alt />
                  </a>
                  <div className="sale-flash">
                    <div className="before" />-
                    33%
                                          </div>
                </div>
                <div className="product-info a-center">
                  <h3 className="product-name"><a href title="Vải thiều loại to">Sản phẩm 1</a></h3>
                  <div className="price-box clearfix">
                    <div className="special-price">
                      <span className="price product-price pull-left">80.000₫</span>
                      <span className="price product-price pull-right"><del> 123.000₫</del></span>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-lg btn-primary btn-cart btn-cart2 add_to_cart btn_buy add_to_cart" title="Cho vào giỏ hàng">
                      <i className="fa fa-cart-plus" />
                      <span>Đặt hàng ngay  <i className="fa .fa-caret-right" /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="product-box">
                <div className="product-thumbnail flexbox-grid">
                  <a href title>
                    <img src="public/images/product/trangchu1.png" alt />
                  </a>
                  <div className="sale-flash">
                    <div className="before" />-
                    33%
                                          </div>
                </div>
                <div className="product-info a-center">
                  <h3 className="product-name"><a href title="Vải thiều loại to">Sản phẩm 1</a></h3>
                  <div className="price-box clearfix">
                    <div className="special-price">
                      <span className="price product-price pull-left">80.000₫</span>
                      <span className="price product-price pull-right"><del> 123.000₫</del></span>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-lg btn-primary btn-cart btn-cart2 add_to_cart btn_buy add_to_cart" title="Cho vào giỏ hàng">
                      <i className="fa fa-cart-plus" />
                      <span>Đặt hàng ngay  <i className="fa .fa-caret-right" /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="product-box">
                <div className="product-thumbnail flexbox-grid">
                  <a href title>
                    <img src="public/images/product/trangchu1.png" alt />
                  </a>
                  <div className="sale-flash">
                    <div className="before" />-
                    33%
                                          </div>
                </div>
                <div className="product-info a-center">
                  <h3 className="product-name"><a href title="Vải thiều loại to">Sản phẩm 1</a></h3>
                  <div className="price-box clearfix">
                    <div className="special-price">
                      <span className="price product-price pull-left">80.000₫</span>
                      <span className="price product-price pull-right"><del> 123.000₫</del></span>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-lg btn-primary btn-cart btn-cart2 add_to_cart btn_buy add_to_cart" title="Cho vào giỏ hàng">
                      <i className="fa fa-cart-plus" />
                      <span>Đặt hàng ngay  <i className="fa .fa-caret-right" /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </React.Fragment>
      )
    }
  } catch (error) {
    return <div>Error: {error}</div>
  }
  return <div></div>
}

export default ProductList
