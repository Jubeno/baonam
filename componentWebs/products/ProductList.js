import React from 'react';
import { graphql } from 'react-apollo'
import { withRouter } from 'next/router'
import { compose, lifecycle } from 'recompose'
import { FormattedMessage } from 'react-intl';

// import ErrorMessage from '../error/ErrorMessage'
import Product from './Product';
import Pagination from '../../lib/utils/pagination';
// eslint-disable-next-line no-unused-vars
import log from '../../lib/utils/log'

import * as productService from '../../services/product';

// eslint-disable-next-line no-unused-vars
const typeLog = 'infop'

const POSTS_PER_PAGE = 6;

const ProductList = ({
  // listProductPage1,
  data,
  loadMoreProducts,
  // isServer
}) => {
  const listProducts = data && data.listProductCategories;
  return (
    <React.Fragment>
      <section className="products-view products-view-grid margin-bottom-50 collection_reponsive">
        <div className="row">
          {listProducts && listProducts.payload && listProducts.payload.length <= 0 && <div><FormattedMessage id="product.zero" /></div>}
          {listProducts && listProducts.payload && listProducts.payload.map(item => {
            return (
              <Product key={item.id} product={item} />
            )
          })}
        </div>
        <div className="text-xs-right xs_padding col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="text-center">
            <nav>
              <Pagination items={listProducts && listProducts.meta.count || 0} pageSize={POSTS_PER_PAGE} fetchMore={loadMoreProducts} />
            </nav>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

const ProductDanhMucGraphQl = graphql(productService.paginationData, {
  // ssr: false,
  options: ({ router: { query }, defaultSort }) => {
    // log(typeLog, "components -> products -> ProductList -> query:: ", query)
    let fiPro = {};
    fiPro = { status: 1 };

    const categoryIdTree = query.categoryID !== "0" ? Number(query.categoryID) : -1
    return ({
      variables: {
        filter: fiPro,
        filterCate: {},
        filterSupplier: {},
        order: defaultSort,
        offset: 0,
        limit: POSTS_PER_PAGE,
        categoryIdTree
      }
    })
  },
  props: ({ data }) => ({
    data,
    loadMoreProducts: ({ pageIndex }) => {
      // console.log("pageIndex:", pageIndex)
      return data.fetchMore({
        variables: {
          offset: data.listProductCategories.payload.length * (pageIndex - 1)
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // console.log("previousResult: %o \n fetchMoreResult: %o", previousResult, fetchMoreResult)
          if (!fetchMoreResult) {
            return previousResult
          }
          return fetchMoreResult
        }
      })
    }
  })
})

export default compose(
  // withApollo,
  withRouter,
  ProductDanhMucGraphQl,
  /* withState("data","updateData", null),
  withHandlers({
    loadMoreProducts: props => ({ pageIndex }) => {
      log(typeLog, "components -> products -> ProductList -> loadMoreProducts")
      const { router: { query }, defaultSort, filterPrice, filterSupplier, client, updateData } = props
      let fiCate = {}, fiPro = {}, fiSup = {}
      //const order = `${defaultSort} DESC`
      fiPro = { status: 1, type: 0 }
      const categoryIdTree = query.categoryID !== 0 ? query.categoryID : -1
      client.query({
        variables: {
          filter: fiPro,
          filterCate: fiCate,
          filterSupplier: fiSup,
          order: defaultSort,
          offset: (pageIndex - 1) * POSTS_PER_PAGE,
          limit: POSTS_PER_PAGE,
          categoryIdTree: categoryIdTree
        },
        query: allProductInCate
      }).then(dataReturn => {
        log(typeLog, "components -> products -> ProductList -> loadMoreProducts data:", dataReturn)
        updateData(dataReturn.data)
      }).catch(err => {
        log(typeLog, "components -> products -> ProductList -> loadMoreProducts err:", err)
      })
    }
  }), */
  lifecycle({
    componentDidMount() {
      // log(typeLog, "components -> products -> ProductList -> mount")
    },
    componentDidUpdate() {
      // log(typeLog, "components -> products -> ProductList -> update")
    },
    shouldComponentUpdate(nextProps) {
      if (
        // nextProps.listProductPage1 === this.props.listProductPage1
        nextProps.data === this.props.data
        && nextProps.router === this.props.router
        && nextProps.defaultSort === this.props.defaultSort
      ) {
        return false
      }
      return true
    }
  })
)(ProductList)
