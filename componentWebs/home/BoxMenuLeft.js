import React, { Component } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { filter, propType } from 'graphql-anywhere'
import gql from 'graphql-tag'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'next/router'

import log from '../../lib/utils/log'
const typeLog = 'log'
import NbmLink from '../../lib/utils/customLink'
import { getAllCategoriesMenu, SITE_SAN_PHAM } from '../../lib/withLayout'
import EncodeUrl from '../../lib/utils/encode'

const BoxMenuLeft = ({ isHover, handleHover, dataMenu: { menus }, pageType }) => {
  // log(typeLog, "components -> home -> BoxMenuLeft -> dataMenu -> menus:%o", menus)
  return (
    <React.Fragment>
      <aside className="blog-aside aside-item sidebar-category">
        <div className="aside-title text-center text-xl-left">
        <h2 className="title-head"><i className="fa fa-bars" aria-hidden="true" /><span>&nbsp;Danh mục sản phẩm</span></h2>
        </div>
        <div className="aside-content">
          <div className="nav-category  navbar-toggleable-md">
            <ul className="nav navbar-pills">
              {menus && menus.payload.map((item, index) => {
                const hrefCate = `/${EncodeUrl(item.categoryName)}-${item.id}-${item.categoryParentId}-${pageType ? pageType : 0}`
                return (
                 
                  <li key={index} className={`nav-item ${isHover == item.id ? "nav-active" : ""}`} onMouseEnter={handleHover(item.id)} onMouseLeave={handleHover(0)} id={item.id}>
                    <i className="fa fa-cog fa-fw" aria-hidden="true" />
                    <NbmLink href={hrefCate} className="nav-link">{item.categoryName}</NbmLink>
                    <i className="fa fa-caret-right" />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}

export default compose(
  withState('isHover', 'handleHover', 0),
  withHandlers({
    handleHover: props => (id) => event => {
      props.handleHover(id)
    }
  }),
  lifecycle({
    componentDidMount() {

    },
    shouldComponentUpdate(nextProps, nextState) {
      if (
        nextProps.dataMenu === this.props.dataMenu
        && nextProps.isHover === this.props.isHover
      ) {
        return false;
      }
      return true;
    }
  })
)(BoxMenuLeft)