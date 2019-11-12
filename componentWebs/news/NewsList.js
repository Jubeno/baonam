import React from 'react'
import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'

import { compose } from 'recompose'
import { withRouter } from 'next/router'
import Pagination from '../../lib/utils/pagination';
import New from './new';
import * as articleService from '../../services/articlesRedux';

/* const getNews = gql`
  query getNews($filter:Json,$filterCate:Json,$order:[[String!]],$offset:Int!,$limit:Int!){
    allArticles(
      filter:$filter,
      filterCategory:$filterCate,
      order:$order,
      offset:$offset,limit:$limit
    ){
      payload{
        id
        title
        image
        author
        short
        content
        createdAt
        modifiedAt
        seoKeyword
        seoDescription
      }
      meta{
        count
      }
    }
  }
` */

const PAGE_SIZE = 3
const NewsList = ({ data, loadMoreNews }) => {

  const list = data && data ? data.articles : {}

  return (
    <React.Fragment>
      <section className="list-blogs blog-main">
        <div className="row">
          {list && list.payload && list.payload.map(item => {
            return (
              <New key={item.id} newData={item} />
            )
          })
          }
          <Pagination
            items={list && list.meta && list.meta.count || 0}
            pageSize={PAGE_SIZE}
            fetchMore={loadMoreNews}
          />
          <div className="tags_share margin-top-30">
            <div className="share_row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="addthis_inline_share_toolbox share_add inline-block" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

const graphqlNewsList = graphql(articleService.getAll, {
  ssr: false,
  options: () => {
    // log(typeLog, "components -> products -> ProductList -> filterPrice:: ", filterPrice)

    return ({
      variables: {
        "filter": { "status": 1 },
        "filterCategory": { "siteId": 2 },
        "order": [["createdAt", "DESC"]],
        "offset": 0,
        "limit": PAGE_SIZE,
      }
    })
  },
  props: ({ data }) => ({
    data,
    loadMoreNews: ({ pageIndex }) => {
      // console.log("pageIndex:", pageIndex)
      return data.fetchMore({
        variables: {
          offset: data.allArticles.payload.length * (pageIndex - 1)
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
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
  withRouter,
  graphqlNewsList,
)(NewsList)