import React from 'react';
import { FormattedMessage } from 'react-intl'
import Link from '../../lib/utils/ActiveLink'

const BreadCrumb = ({ data }) => {
  return (
    <React.Fragment>
      <section className="bread-crumb">
        <span className="crumb-border" />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <ul
                className="breadcrumb"
                itemScope
                itemType="http://data-vocabulary.org/Breadcrumb"
                style={{
                  textTransform: 'uppercase'
                }}
              >
                <li className="home">
                  <Link itemProp="url" path='/index' href="/"><span itemProp="title"><FormattedMessage id="nav.home" /></span></Link>
                  <span className="mr_lr">&nbsp;/&nbsp;</span>
                </li>
                {data && data.map((item, index) => {
                  if (index === data.length - 1) {
                    return (
                      <li key={index}>
                        <strong><Link path={item.path} href={item.href}><span itemProp="title"> {item.name}</span></Link></strong>
                      </li>
                    )
                  }
                  return (
                    <li key={index}>
                      <Link path={item.path} href={item.href}><span itemProp="title"> {item.name}</span></Link>
                      <span className="mr_lr">&nbsp;/&nbsp;</span>
                    </li>
                  )
                })}
                {/* <li><strong><span itemProp="title"> Tất cả sản phẩm</span></strong></li> */}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="bread_crumb py-4">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <ul className="breadcrumb" itemType="b">
                <li className="home">
                  <a itemProp="url" href="/"><span itemProp="title">Trang chủ</span></a>
                  <span> <i className="fa fa-angle-right" /> </span>
                </li>
                {data && data.map((item, index) => {
                  if (index === data.length - 1) {
                    return (
                      <li key={index}>
                        <strong><NbmLink href={item.href}><span itemProp="title"> {item.name}</span></NbmLink></strong>
                      </li>
                    )
                  }
                  return (
                    <li key={index}>
                      <NbmLink href={item.href}><span itemProp="title"> {item.name}</span></NbmLink>
                      <span> <i className="fa fa-angle-right" /> </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section> */}
    </React.Fragment >
  )
}
export default BreadCrumb