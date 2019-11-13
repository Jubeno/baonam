
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

const BoxChildCategory = ({ dataProduct, hrefCate, item, handleChangeTab, tabActive, keyIndex }) => {
  const nameTab = EncodeUrl(item.categoryName)
  let flagDaHien = false
  const dataArrMobile = (item.children && item.children.length > 0) ? item.children.filter(item1 => item1.productsHomeTop15.length > 0).slice(0, 1) : []
  const dataMobile = dataArrMobile.length > 0 ? dataArrMobile[0] : null
  const dataNextMobile = (item.children && item.children.length > 1) && item.children.slice(1, item.children.length).filter((item1,index1) => item1.productsHomeTop15.length > 0).length > 0
  // log(typeLog, "components -> home -> BoxChildCategory -> dataMobile: ", dataMobile)
  return (
    <React.Fragment>
      <section className={`awe-section-abc`} id={`awe-section-${keyIndex}`}>
        <div className="section section-collection section-collection-1">
          <div className="container">
            <div className="collection-border">
              <div className="collection-main">
                <div className="row ">
                  <div className="col-lg-12 col-sm-12">
                    <div className={`e-tabs not-dqtab ajax-tab-${keyIndex}`} data-section={`ajax-tab-${keyIndex}`}>
                      <div className="row row-noGutter">
                        <div className="col-sm-12">
                          <div className="content">
                            <div className="section-title">
                              <h2><a href={hrefCate}>{item.categoryName}</a></h2>
                            </div>
                            <div>
                              <ul className="tabs tabs-title tab-mobile clearfix hidden-sm hidden-md hidden-lg">
                                {dataMobile && <React.Fragment>
                                  {dataNextMobile && <li className="prev current"><i className="fa fa-angle-left" /></li>}
                                  <li className="tab-link tab-title hidden-sm hidden-md hidden-lg current tab-titlexs" data-tab={`tab-${nameTab}-1`}>
                                    <span><a href={`/${EncodeUrl(dataMobile.categoryName)}-${dataMobile.id}-${dataMobile.categoryParentId}-0`}>{dataMobile.categoryName}</a></span>
                                  </li>
                                  {dataNextMobile && <li className="next"><i className="fa fa-angle-right" /></li>}
                                  </React.Fragment>}
                              </ul>
                              <ul className="tabs tabs-title ajax clearfix hidden-xs">
                                {item.children && item.children.length > 0 && item.children.map((itemChild, indexChild) => {
                                  if (itemChild.productsHomeTop15.length <= 0) return null
                                  if (indexChild === 0){
                                    return (
                                      <li key={indexChild} className={`tab-link has-content ${indexChild === 0 ? "current" : ""}`} data-tab={`tab-${nameTab}-${indexChild + 1}`}>
                                        <span><a
                                          id={`a-tab-${nameTab}-${indexChild + 1}`}
                                          // onClick={handleChangeTab({ tabActive: `tab-${nameTab}-${indexChild + 1}`, filter: { categoryId: itemChild.id }, order: [["createDate", "DESC"]] })}
                                          href={`#tab-${nameTab}-${indexChild + 1}`}
                                          data-title={`${itemChild.categoryName}`}
                                        >{itemChild.categoryName}</a></span>
                                      </li>
                                    )
                                  }
                                  return (
                                    <li key={indexChild} className={`tab-link has-content ${indexChild === 0 ? "current" : ""}`} data-tab={`tab-${nameTab}-${indexChild + 1}`} data-url={`/${EncodeUrl(itemChild.categoryName)}-${itemChild.id}-${itemChild.categoryParentId}-0`}>
                                      <span><a
                                        id={`a-tab-${nameTab}-${indexChild + 1}`}
                                        onClick={handleChangeTab({ tabActive: `tab-${nameTab}-${indexChild + 1}`, filter: { categoryId: itemChild.id }, order: [["createDate", "DESC"]] })}
                                        href={`#tab-${nameTab}-${indexChild + 1}`}
                                        data-title={`${itemChild.categoryName}`}
                                      >{itemChild.categoryName}</a></span>
                                    </li>
                                  )
                                })}
                              </ul>
                              {item.productsHomeTop15.length > 0 && <div className={`tab-${nameTab}-1 tab-content current 1`}>
                                <ProductList dataProduct={{ error: null, allProducts: { payload: item.productsHomeTop15 } }} />
                              </div>}
                              {item.children && item.children.length > 0 && item.children.map((itemChild, indexChild) => {

                                if (itemChild.productsHomeTop15.length > 0 && !flagDaHien) {
                                  flagDaHien = true
                                   
                                  return (
                                    <div key={indexChild} className={`tab-${nameTab}-1 tab-content current 2`}>
                                      <ProductList dataProduct={{ error: null, allProducts: { payload: itemChild.productsHomeTop15 } }} />
                                    </div>
                                  )
                                } else if (flagDaHien) {
                                  
                                  return (
                                    <div key={indexChild} className={`tab-${nameTab}-${indexChild + 1} tab-content ${indexChild === 0 ? "current" : ""} 3`} >
                                      {tabActive !== `tab-${nameTab}-1` && <ProductList dataProduct={dataProduct} />}
                                    </div>
                                  )
                                }
                              })}
                              <p className="viewmore-btn"><a href={hrefCate} style={{ color: '#fff', fontWeight: 'normal' }}>Xem thêm</a></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
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
const POSTS_PER_PAGE = 8

/* const BoxChildCategoryGraph = graphql(allBoxChildProducts, {
  name: 'BoxChildProduct',
  options: ({ filter, order }) => ({
    variables: {
      filter: filter,
      order: order,
      offset: 0,
      limit: POSTS_PER_PAGE
    }
  }),
  props: ({ BoxChildProduct }) => {
    // log('log', "BoxChildProduct -> datareturn: ", BoxChildProduct)
    return ({
      dataProduct: BoxChildProduct,
      refetchData: ({ filter, order }) => {
        // log('log', "refetch -> filter: %o, order: %o", filter, order)
        return BoxChildProduct.fetchMore({
          variables: {
            filter, order
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            // log(typeLog, "previousResult: %o \n fetchMoreResult: %o", previousResult, fetchMoreResult)
            if (!fetchMoreResult) {
              return previousResult
            }
            return fetchMoreResult
          }
        })
      }
    })
  }
}) */

export default compose(
  withApollo,
  // BoxChildCategoryGraph,
  withState("tabActive", "updateTabActive", ""),
  withState("dataProduct", "updateDataProduct", {}),
  withHandlers({
    handleChangeTab: props => ({ tabActive, filter, order }) => async e => {
      log(typeLog, "componenets -> home -> BoxChildCategory -> handleChangeTab -> props: %o \n tabActive:%o, filter: %o, order: %o ", props, tabActive, filter, order)
      // props.refetchData({ filter, order })
      // log(typeLog, "componenets -> home -> BoxChildCategory -> handleChangeTab -> test:%o", new RegExp("ban-chay").test(tabActive))
      // if (!new RegExp("tab1").test(tabActive)) {
      try {
        const data = await props.client.query({
          variables: {
            filter: filter,
            order: order,
            offset: 0,
            limit: POSTS_PER_PAGE
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
      // }
      props.updateTabActive(tabActive)
      dl_owl()
    }
  }),
  lifecycle({
    componentDidMount() {
    },
    shouldComponentUpdate(nextProps, nextState) {
      if (
        nextProps.dataProduct === this.props.dataProduct &&
        nextProps.item === this.props.item &&
        nextProps.tabActive === this.props.tabActive
      ) {
        return false;
      }
      return true;
    }
  }),
)(BoxChildCategory)