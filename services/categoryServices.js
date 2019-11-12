import gql from 'graphql-tag'

export const fragmentMenuChildNest = gql`
  fragment MenuFieldChildNest on Category {
    id
    name
    parentId
    imageAvatar
    seoKeyword
    seoDescription
    nameRoute
  }
`

export const fragmentMenuChild = gql`
  fragment MenuFieldChild on Category {
    ...MenuFieldChildNest
    children{
      ...MenuFieldChildNest
    }
  }
  ${fragmentMenuChildNest}
`

export const getAll = gql`
  query getAll($filter: Json, $order: [[String]], $offset:Int!, $limit:Int!) {
    menus: find_list_parent_child(filter:$filter, order: $order, offset:$offset, limit:$limit){
      payload{
        ...MenuFieldChild
        children{
          ...MenuFieldChild
        }
      }
      meta{
        count
      }
    }
  }
  ${fragmentMenuChild}
`

export const getCategoryById = gql`
  query getCategoryById ($categoryId:  ID!) {
    getCategoryById(id: $categoryId){
			id
      name
      siteId
      parentId
      seoKeyword
      seoDescription
      children{
        id
        name
      }
		}
  }
`