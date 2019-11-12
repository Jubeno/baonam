import gql from 'graphql-tag'

// eslint-disable-next-line import/prefer-default-export
export const getAll = gql`
  query allSuppliers($filter: Json, $order: [[String!]], $offset: Int, $limit: Int) {
    suppliers: allSuppliers(filter:$filter, order:$order, offset:$offset, limit:$limit){
      id
      supplierName
      supplierImage
    }
  }
`
// import gql from 'graphql-tag'

// // eslint-disable-next-line import/prefer-default-export
// export const getAll = (payload) => {
//   return gql`
//   query allSuppliers($filter: Json, $order: [[String!]], $offset: Int, $limit: Int) {
//     suppliers: allSuppliers(filter:$filter, order:$order, offset:$offset, limit:$limit){
//       ${payload}
//     }
//   }
// `}