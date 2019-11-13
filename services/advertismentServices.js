import gql from 'graphql-tag'

// eslint-disable-next-line import/prefer-default-export
export const getAll = gql`
  query getAll($filter: Json,$order:[[String]],$offset:Int!,$limit:Int!){
    advertisments: allAdvertisments(filter:$filter, order:$order, offset:$offset, limit:$limit)
    {
      payload{
        id
        name
        image
        descriptions
        type
      }
      meta{
        count
      }
    }
  }
`