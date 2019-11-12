import gql from 'graphql-tag'

// eslint-disable-next-line import/prefer-default-export
export const getAll = gql`
  query getAll($filter: Json, $order:[[String!]],$offset:Int!,$limit:Int!){
    allProducts(filter:$filter,order:$order,offset:$offset,limit:$limit)
    {
      payload{
        id
        productName
        categoryId
        likes
        quantities
        shares
        views
        productImage
        seoKeyword
        seoDescription
        screenShots
        supplier{
          id
          supplierName
        }
        category {
          id
          name
          seoKeyword
          seoDescription
        }
      }
      meta{
        count
      }
    }
  }
`
export const getProductById = gql`
  query getProductById ($productId:  ID!) {
    getProductById(id: $productId){
			id
      productName
      productInformation
      highlightInformation
      termsOfUse
      seoKeyword
      seoDescription
      categoryId
      supplierId
      supplier{
        id
        supplierName
      }
      category{
        id
        name
        seoKeyword
        seoDescription
      }
      productImage
      screenShots
		}
  }
`

export const paginationData = gql`
  query paginationData($filter: Json, $filterCate: Json, $filterSupplier: Json, $order: String, $offset: Int!, $limit: Int!, $categoryIdTree: Int) {
    listProductCategories:allProductWithIdCategoryTree(filter:$filter,filterCate: $filterCate,filterSupplier:$filterSupplier, order: $order, offset: $offset, limit: $limit,categoryIdTree:$categoryIdTree) {
      payload{
        id
        productName
        price
        productImage
        createdAt
        modifiedAt
        seoKeyword
        seoDescription
        supplier{
          id
          supplierName
        }
        category {
          id
          name
          seoKeyword
          seoDescription
        }
      }
      meta{
        count
      }
    }
  }
`

export const search = gql`
  query searchProductsQuery($filter: Json, $filterCate: Json, $filterSupplier: Json, $order: String, $offset: Int!, $limit: Int!, $categoryIdTree: Int, $siteIdTree: Int) {
    searchProducts:allProductWithIdCategoryTree(filter:$filter,filterCate: $filterCate,filterSupplier:$filterSupplier, order: $order, offset: $offset, limit: $limit,categoryIdTree:$categoryIdTree,siteIdTree:$siteIdTree) {
      payload{
        id
        productName
        productImage
        createdAt
        modifiedAt
        seoKeyword
        seoDescription
        supplier{
          id
          supplierName
        }
        category {
          id
          name
          seoKeyword
          seoDescription
        }
      }
      meta{
        count
      }
    }
  }
`