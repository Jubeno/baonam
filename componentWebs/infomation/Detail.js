import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { filter, propType } from 'graphql-anywhere'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import ErrorMessage from '../error/ErrorMessage'
import log from '../../lib/utils/log'
import NbmImage from '../../lib/NbmImage';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Detail = ({ getArticleById, query, asPath }) => {
  return (
    <React.Fragment>
      {getArticleById &&
        <div className="content wysiwyg">
          <h1 className="page-title">{getArticleById.title}</h1>
          <p>
            <NbmImage
              src={`${publicRuntimeConfig.IMAGE_SERVER}/${getArticleById.imageAvatar}`}
              type="IMAGE_INFOMATION"
            />
          </p>
          <div dangerouslySetInnerHTML={{ __html: `${getArticleById.contentDescriptions}` }} />
        </div>
      }
    </React.Fragment>
  );
}

export default Detail

// const SITE_SAN_PHAM = parseInt(`${publicRuntimeConfig.SITE_THONG_TIN}`, 10)

// const infomation_index_Article1 = gql`
//   query infomation_index_Article1 ($id: ID!) {
//     getArticleById(id:$id){
//       id
//       title
//       imageAvatar
//       contentDescriptions
//       seoKeywords
//       seoDescriptions
//     }
//   }
// `

// export default withRouter(
//   graphql(infomation_index_Article1, {
//     options: ({ router: { query } }) => {
//       log('log', "query: ", query)
//       return ({
//         variables: {
//           id: query.id
//         }
//       })
//     },
//     props: ({ data }) => ({
//       data
//     })
//   })(Detail)
// )