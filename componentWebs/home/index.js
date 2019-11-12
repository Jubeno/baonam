import React from 'react'
// import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { articles } from '@/controllers/components/homes/indexHomeController'
import ArticleGrid from '@/templates/ArticleGrid'
import ArticleGrid1 from '@/templates/ArticleGrid1'
import ArticleGrid2 from '@/templates/ArticleGrid2'
import ArticleGrid3 from '@/templates/ArticleGrid3'
import ArticleGrid4 from '@/templates/ArticleGrid4'
import ArticleGrid5 from '@/templates/ArticleGrid5'
// import New from './New';


const Index = ({ data }) => {
  // console.log('data', data)
  return (
    <React.Fragment>
      {data && data.map(item =>
        // console.log("Home/index -> item", item)
        (
          <React.Fragment>
            <ArticleGrid />
            <ArticleGrid1 />
            <ArticleGrid2 />
            <ArticleGrid3 />
            <ArticleGrid4 />
            <ArticleGrid5 />
          </React.Fragment>
        )
      )
      }
    </React.Fragment>
  )
}


export default compose(articles({
  "filter": { "status": 1 },
  "filterCategory": { "siteId": 2 },
  "order": [["createdAt", "DESC"]],
  "offset": 0,
  "limit": 4
})
)(Index)