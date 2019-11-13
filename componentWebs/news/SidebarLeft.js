import { graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { Router } from '../../routes'
import ErrorMessage from '../error/ErrorMessage'
import EncodeUrl from '../../lib/utils/encode'
import Pagination from '../../lib/utils/pagination';
import { withRouter } from 'next/router'
import log from '../../lib/utils/log'
const moment = require('moment');
const typeLog = 'infop'
import NbmImage from '../../lib/NbmImage';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const getNews = gql`
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
      imageAvatar
      shortDescriptions
      updateDate
      
    }
    meta{
      count
    }
  }
  }
`
const SideBarLeft = ({ pageType, data, dataAllMenuCategories: { menus }, dataSiteThongTin: { dataSiteThongTin } }) => {
  const listNoiBat = data && data.allArticles ? data.allArticles : {}
  return (
    <React.Fragment>
      <aside className="left left-content col-md-3 col-md-pull-9 menutintuc">
        <aside className="blog-aside aside-item sidebar-category">
          <div className="aside-title">
            <h2 className="title-head"><span>Danh mục</span></h2>
          </div>
          <div className="aside-content">
            <div className="nav-category  navbar-toggleable-md">
              <ul className="nav navbar-pills">
                <li className="nav-item">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true" />
                  <a className="nav-link" href="/">Trang chủ</a></li>
                <li className="nav-item">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true" />
                  <a href="/san-pham-0-0-0" className="nav-link">Sản phẩm</a>
                  <i className="fa fa-angle-down" />
                  <ul className="dropdown-menu">
                    {menus && menus.payload.map((item, index) => {
                      const hrefCate = `/${EncodeUrl(item.categoryName)}-${item.id}-${item.categoryParentId}-${pageType ? pageType : 0}`
                      return (
                        <li key={index} className="dropdown-submenu nav-item" id={item.id}>
                          <a className="nav-link" href={hrefCate}>{item.categoryName}</a>
                          {/* <i className="fa fa-angle-right" /> */}
                        </li>
                      )
                    })}
                  </ul>
                </li>
                {/* <li className="nav-item">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true" />
                  <a className="nav-link" href="#">Giới thiệu</a></li> */}

                {dataSiteThongTin && dataSiteThongTin.payload.map((item, index) => {
                  return (
                    <li key={index} className="nav-item">
                      <i className="fa fa-arrow-circle-right" aria-hidden="true" />
                      <a href="#" className="nav-link">{item.categoryName}</a>
                      <i className="fa fa-angle-down" />
                      {item.articles.length > 0 && <ul className="dropdown-menu">
                        {item.articles.map((itemAr, indexAr) => {
                          return (
                            <li key={indexAr} className="dropdown-submenu nav-item"> <a className="nav-link" href={`/tin-${EncodeUrl(item.categoryName)}/${EncodeUrl(itemAr.title)}-${itemAr.id}`}>{itemAr.title}</a> </li>
                          )
                        })}
                      </ul>}
                    </li>
                  )
                })}
                <li className="nav-item">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true" />
                  <a className="nav-link" href="/lien-he">Liên hệ</a></li>
                <li className="nav-item">
                  <i className="fa fa-arrow-circle-right" aria-hidden="true" />
                  <a href="/tin-tuc" className="nav-link">Tin tức</a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <div className="blog-aside aside-item">
          <div>
            <div className="aside-title mb-4">
              <h2 className="title-head"><a href="/tin-tuc">Tin nổi bật</a></h2>
            </div>
            <div className="aside-content">
              <div className="blog-list blog-image-list">
                {
                  listNoiBat.payload && listNoiBat.payload.slice(0, 3).map((item, index) => {
                    return (
                      <div key={index} className="loop-blog">
                        <div className="thumb-left">
                          <a href={EncodeUrl(item.title) + "-" + item.id}>
                            <NbmImage src={`${publicRuntimeConfig.IMAGE_SERVER}/${item.imageAvatar}`} alt={item.title} style={{ width: '100%' }} alt={item.title} className="img-responsive" />
                          </a>
                        </div>
                        <div className="name-right">
                          <h3><a href={EncodeUrl(item.title) + "-" + item.id}>{item.title}</a></h3>
                          <div className="post-time">
                            {moment(item.updateDate).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </div>

                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </aside>

    </React.Fragment>
  )
}
const graphqlNewsList = graphql(getNews, {
  ssr: false,
  options: ({ router: { query } }) => {
    // log(typeLog, "components -> products -> ProductList -> filterPrice:: ", filterPrice)

    return ({
      variables: {
        "filter": { "status": 1 },
        "filterCate": { "siteId": publicRuntimeConfig.SITE_TIN_TUC },
        "order": [["totalView", "DESC"]],
        "limit": 10,
        "offset": 0
      }
    })
  },
  props: ({ data }) => ({
    data
  })
})

export default compose(
  withRouter,
  graphqlNewsList,

)(SideBarLeft)
