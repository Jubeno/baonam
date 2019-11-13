
import React, { Component } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { filter, propType } from 'graphql-anywhere'
import gql from 'graphql-tag'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import log from '../../lib/utils/log'
const typeLog = 'log'
import EncodeUrl from '../../lib/utils/encode'
import ProductList from './ProductList'
import Router from 'next/router'
import numeral from 'numeral'
import { ratingHtml } from '../../pages/productdetail/productdetail';
import NbmImage from '../../lib/NbmImage';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const BoxChild = ({ data, indexTab, dataProduct, handleChangeTab, hrefCate }) => {
  console.log('data', data)
  let product = (dataProduct && dataProduct.allProducts && dataProduct.allProducts.payload) ? dataProduct.allProducts.payload : data.productsHomeTop15;
  const arrImgAds = (data.imageAvatar !== undefined && data.imageAvatar !== null && data.imageAvatar !== '') ? data.imageAvatar.split(',') : []
  // console.log('pro',product)
  return (
    <div className="kitchen" id="kitchen-product">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 sale-product">
            <div className="col-xs-2 bannerkhuyenmai" data={`${publicRuntimeConfig.IMAGE_SERVER}||${publicRuntimeConfig.IMAGE_SERVER}`}>
              <a href={hrefCate} className="btn-khuyenmai"><i className="fa fa-shopping-cart" aria-hidden="true" />&nbsp;{data.categoryName}</a>
              {arrImgAds && arrImgAds.map((item, index) => {
                return (
                  <a key={index} href="#">
                    <NbmImage
                      src={`${publicRuntimeConfig.IMAGE_SERVER}/${item}`}
                      className="margin-bottom"
                      type="IMAGE_CATEGORY_HOME"
                    />
                  </a>
                )
              })}
            </div>
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 sanphamkm sanphamkm2 trangchu">
              <ul className="tab tab2 list-inline">
                <li onClick={handleChangeTab({ tabActive: 0, order: [[]] })} className={indexTab == 0 ? "active" : ""}>
                  <a href="#tab-main-info2">Hàng mới về</a>
                </li>
                <li onClick={handleChangeTab({ tabActive: 1, order: [["views", "DESC"]] })} className={indexTab == 1 ? "active" : ""}>
                  <a href="#tab-image2">Bán chạy nhất</a>
                </li>
                <li onClick={handleChangeTab({ tabActive: 2, order: [["savePrice", "DESC"]] })} className={indexTab == 2 ? "active" : ""}>
                  <a href="#tab-seo2">Giảm giá</a>
                </li>
              </ul>
              <div className="tab-content2">
                <div className="tab-item2" >
                  {
                    product && product.map((item, index) => {
                      return (
                        <div key={index} className={`col-xs-2 col-sm-2 col-md-2 col-lg-2 ${index > 4 ? "hidden-xs" : ""} `}>
                          <div className="thumbnail">
                            <a href={EncodeUrl(item.category.categoryName) + "/" + EncodeUrl(item.productName) + "-" + item.id}>
                              <NbmImage
                                src={`${publicRuntimeConfig.IMAGE_SERVER}/${item.productImage}`}
                                alt={item.productName}
                                type="IMAGE_PRODUCT_HOME"
                              />
                            </a>
                            <div className="caption">
                              <a href={EncodeUrl(item.category.categoryName) + "/" + EncodeUrl(item.productName) + "-" + item.id}>
                                <p>{item.productName}</p>
                              </a>
                              <div className="danhgia">
                                <div className="ngoisao pull-right">
                                  {ratingHtml(item.ratings)}
                                  {/* {item.ratings > 0 && <b className="fa fa-star" />}
                                  {item.ratings > 1 && <b className="fa fa-star" />}
                                  {item.ratings > 2 && <b className="fa fa-star" />}
                                  {item.ratings > 3 && <b className="fa fa-star" />}
                                  {item.ratings > 4 && <b className="fa fa-star" />} */}
                                </div>
                                <div className="gia">
                                  <p className="giamoi">{numeral(item.dealPrice).format('0,0')}đ</p>
                                  <p className="giacu"><del>{numeral(item.price).format('0,0')}đ</del></p>
                                </div>
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
            {/* end cot 10 hang moi*/}
            <div className="xemthem hidden-sm hidden-md hidden-lg text-center"><a href={hrefCate} className="btn-xemthem">Xem thêm</a></div>
          </div>
          {/* end cot 12 hang moi*/}
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </div>

  )
}
const allBoxChildProducts = gql`
  query BoxChildProduct($filter: Json, $order: [[String!]], $offset: Int!, $limit: Int!) {
    allProducts(filter:$filter, order: $order, offset: $offset, limit: $limit) {
      payload{
        id
        productName
        likes
        quantities
        shares
        countdownTimes
        dealPrice
        deadlineDate
        views
        ratings
        price
        savePrice
        productImage
        supllier{
          id
          supplierName
        }
        category {
          id
          categoryName
        }
        totalOrder
      }
      meta{
        count
      }
    }
  }
`
export default compose(
  withApollo,
  withState("indexTab", "updateIndexTab", 0),
  withState("dataProduct", "updateDataProduct", {}),
  withHandlers({
    handleChangeTab: props => ({ tabActive, order }) => async e => {
      //console.log('data',props)
      try {
        const data = await props.client.query({
          variables: {
            filter: { status: 1, "categoryId": parseInt(props.data.id) },
            order: order,
            offset: 0,
            limit: 15
          },
          query: allBoxChildProducts
        })
          .catch(err => {
            err.graphQLErrors && log(typeLog, "graphQLErrors: ", err.graphQLErrors)
            err.networkError && log(typeLog, "networkError: ", err.networkError)
          })
        log(typeLog, "componenets -> home -> BoxChildCategory -> handleChangeTab -> data:%o", data)
        props.updateDataProduct(data.data)
      } catch (error) {
        // log(typeLog, "componenets -> home -> BoxChildCategory -> handleChangeTab -> error:%o", error)
        props.updateDataProduct({})
      }
      props.updateIndexTab(tabActive)
    },
  }),
)(BoxChild)