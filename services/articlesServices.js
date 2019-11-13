import gql from 'graphql-tag'

// eslint-disable-next-line import/prefer-default-export
export const getAll = gql`
  query allArticles($filter: Json, $filterCategory: Json, $order: [[String!]],$offset: Int!, $limit: Int!) {
    articles: allArticles(filter:$filter, filterCategory:$filterCategory, order:$order, offset:$offset, limit:$limit){
      payload{
        id
        title
        source
        short
        image
        author
        short
        content
        createdAt
        modifiedAt
        seoKeyword
        seoDescription
        category{
          id
          name
          seoKeyword
          seoDescription
          siteId
        }
      }
      meta{
        count
      }
    }
  }
`
export const getNewsById = gql` 
  query getNewsById($id:ID! ){
    getArticleById(id:$id){
      id
      title
      image
      content
      author
      createdAt
      seoKeyword
      seoDescription
      category{
        id
        name
        seoKeyword
        seoDescription
      }
    }
  }
`