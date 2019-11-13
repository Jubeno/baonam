import gql from 'graphql-tag'

export default gql`
  query breadCumbGql($productId: BigInt, $categoryId: BigInt,$articleId: BigInt) {
    getBreadCumb(productId:$productId,categoryId:$categoryId,articleId:$articleId){
      id
      name
      parentId
      aLevel
    }
  }
`
