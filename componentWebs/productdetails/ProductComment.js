import React, { Component } from 'react'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import gql from 'graphql-tag'
import { graphql, withApollo, Mutation } from 'react-apollo'
import ModalComment from './ModalComment'
import log from '../../lib/utils/log'
const typeLog = 'log'
import moment from 'moment'
import products from '../products';
// import { ratingHtml } from '../../pages/productdetail/productdetail'

const ProductComment = ({ product, dataGetComments, loadMoreComments }) => {
  log(typeLog, "components -> productdetail -> ProductComment -> product: ", product)
  let allComments, areMorePosts = false, avgRating = product && product.avgRating, totalRating = product && product.totalRating, ratings = product && product.ratings;
  if (dataGetComments && dataGetComments.allComments !== undefined) {
    allComments = dataGetComments.allComments
    areMorePosts = allComments.payload.length < allComments.meta.count
    if(allComments.payload && allComments.payload.length > 0){
      avgRating = allComments.payload[0].product.avgRating;
      totalRating = allComments.payload[0].product.totalRating;
      ratings = allComments.payload[0].product.ratings;
    }
  }
  return (
    <React.Fragment>
      <div className="tab-3 tab-content">
        <div id="bizweb-product-reviews" className="bizweb-product-reviews" data-id={11480175}>
          <div>
            <div className="title-bl">
              <h4>Đánh giá sản phẩm</h4>
            </div>
            <div id="bizweb-product-reviews-sub">
              <div id="bizweb-product-reviews-summary" className="bizweb-product-reviews-summary">
                <div itemScope itemType="http://schema.org/Product">
                  <meta content="Vải thiều loại to" itemProp="name" />
                  <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating" className="bpr-summary">
                    <meta content={0} itemProp="ratingValue" />
                    <meta content={5} itemProp="bestRating" />
                    <meta content={1} itemProp="worstRating" />
                    <meta content={0} itemProp="ratingCount" />
                    <span className="bpr-summary-average">{ratings}</span>
                    <div data-number={5} data-score={0} className="bizweb-product-reviews-star" id="bizweb-prv-summary-star" title="" style={{ color: 'rgb(255, 190, 0)' }}>
                      {/* {ratingHtml(ratings)} */}
                    </div>
                    <div className="bpr-summary-caption">
                      <div>
                        <div><p>{totalRating}</p></div>
                        <div>
                          <img src="https://productreviews.bizwebapps.vn/assets/images/user.png" width={12} height={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="product-reviews-summary-actions">
                <input onClick={() => {
                  $('#modalComment').modal('show')
                }} id="btnnewreview" defaultValue="Viết đánh giá" type="button" />
              </span>
              <ModalComment productId={product.id} />
              <div style={{ display: 'none' }} id="bpr-thanks" className="bizweb-product-reviews-form">
                <b>Cám ơn bạn đã đánh giá sản phẩm!</b>
              </div>
              <div id="bpr-list" className="bizweb-product-reviews-list">
                {allComments && allComments.payload.map((item, index) => {
                  const createDate_format = moment(item.createDate).format("DD-MM-YYYY h:mm a")
                  return (
                    <div key={index}>
                      <div className="bizweb-review-header">
                        <div className="bizweb-review-header-title">{item.user.userName}</div>
                        <div className="bizweb-review-header-time"></div>
                        <div className="bizweb-review-reportreview">{createDate_format}</div>
                      </div>
                      <div className="bizweb-review-reply">
                        <div className="bizweb-review-body" dangerouslySetInnerHTML={{
                          __html: `${item.comments}`
                        }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div id="bpr-more-reviews">
                <ul>
                  <li>
                    {areMorePosts ? (
                      <button onClick={() => loadMoreComments()}>
                        Xem thêm
                      </button>
                    ) : (
                        ''
                      )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export const allCommentsGql = gql`
  query allCommentsQuery ($filter: Json,$order: [[String!]],$offset: Int,$limit: Int) {
    allComments: allProductComment(filter:$filter,order:$order,offset: $offset,limit:$limit){
      payload{
        id
        userId
        user{
          id
          userName
          fullName
          msisdn
        }
        comments
        createDate
        rating
        product{
          id
          ratings
          avgRating
          totalRating
        }
      }
      meta{
        count
      }
    }
  }
`

export const variablesQueryVar = {
  filter: {},
  order: [["createDate", "DESC"]],
  offset: 0,
  limit: 3
}

const getAllCommentsGraphQl = graphql(allCommentsGql, {
  name: 'getAllComments',
  ssr: false,
  skip: false,
  options: ({ product }) => ({
    variables: {
      filter: { productId: product.id, status: 1 },
      order: [["createDate", "DESC"]],
      offset: 0,
      limit: 3
    }
  }),
  props: ({ getAllComments }) => {
    log(typeLog, "components -> productdetail -> ProductComment -> graphql getAllComments:%o", getAllComments)
    return ({
      dataGetComments: getAllComments,
      loadMoreComments: () => {
        return getAllComments.fetchMore({
          variables: {
            offset: getAllComments.allComments.payload.length
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            const obj = Object.assign({}, previousResult, {
              allComments: {
                ...fetchMoreResult.allComments,
                payload: [...previousResult.allComments.payload, ...fetchMoreResult.allComments.payload]
              }
            })
            console.log("previousResult: %o \n fetchMoreResult: %o \n newResult: %o", previousResult, fetchMoreResult, obj)
            return obj
          }
        })
      }
    })
  }
})

export default compose(
  getAllCommentsGraphQl,
  lifecycle({
    componentDidMount() {
      log(typeLog, "components -> productdetail -> ProductComment -> mount props: ", this.props)
    },
    componentDidUpdate() {
      //log(typeLog, "components -> productdetail -> ProductComment -> componentDidUpdate data: ", this.props.data)
    },
    shouldComponentUpdate(nextProps, nextState) {
      if (
        nextProps.dataGetComments === this.props.dataGetComments
        && nextProps.product === this.props.product
      ) {
        return false
      }
      return true
    }
  })
)(ProductComment)