
import React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { FormattedMessage/* , injectIntl */ } from 'react-intl';

// import ErrorMessage from '../error/ErrorMessage'
import Pagination from '../../lib/utils/pagination1';
// import Link from '../../lib/utils/ActiveLink'
// import EncodeUrl from '../../lib/utils/encode'
// eslint-disable-next-line no-unused-vars
import log from '../../lib/utils/log'
// import NbmImage from '../../lib/NbmImage';
import CONFIG from '../../lib/config';
import Product from './Product';

import * as productServices from '../../services/product';

// eslint-disable-next-line no-unused-vars
const typeLog = 'log';
const PER_PAGE = 12

const SearchIndex = ({ data: { searchProducts }, loadMoreProducts }) => {
  console.log("searchProducts: ", searchProducts)
  return (
    <React.Fragment>
      <div className="col-xs-12">
        <h2 className="title-head">
          <FormattedMessage
            id="search.resultHave"
            values={{
              resultCount: searchProducts && searchProducts.meta && searchProducts.meta.count || 0
            }}
          />
        </h2>
      </div>
      <div className="products-view-grid products cls_search">
        <div className="row-gutter-14">
          {
            searchProducts && searchProducts.payload && searchProducts.payload.map(item => {
              return (
                <Product key={item.id} product={item} />
              )
            })
          }
        </div>
        <div className="text-center">
          <Pagination items={searchProducts && searchProducts.meta.count} pageSize={PER_PAGE} fetchMore={loadMoreProducts} />
        </div>
      </div>
    </React.Fragment>
  )
}

const SearchIndexGraph = graphql(productServices.search, {
  options: ({ query }) => {
    console.log("search query: %o, CONFIG.SITE_SAN_PHAM: %o", query, CONFIG.SITE_SAN_PHAM)
    return ({
      variables: {
        filter: { productName: { _like: `%${query.query}%` }, status: 1 },
        filterCate: { status: 1 },
        filterSupplier: {},
        order: "createdAt desc",
        offset: 0,
        limit: PER_PAGE,
        categoryIdTree: 0,
        siteIdTree: Number(CONFIG.SITE_SAN_PHAM)
      }
    })
  },
  props: ({ data }) => ({
    data,
    loadMoreProducts: ({ pageIndex }) => {
      // console.log("pageIndex:", pageIndex)
      return data.fetchMore({
        variables: {
          offset: data.searchProducts.payload.length * (pageIndex - 1)
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
  SearchIndexGraph
)(SearchIndex)