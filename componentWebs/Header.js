/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { findRoute } from '@/utils/helpers';
import { routes } from '@/config/router.config';
// import getConfig from 'next/config'
import Link from '@/utils/ActiveLink';

// const { publicRuntimeConfig } = getConfig()
const routesWeb = routes.web;

// import LoginForm from './LoginForm/Form';
// import { validateEmail } from '@/utils/helpers';
// import Menu from './Menu/index';
// import PopupConfirmCookies from './Popup/ConfirmCookies';
// import ZaloLogin from './LoginSocial/Zalo';
// import FacebookLogin from './LoginSocial/Facebook';
// import GoogleLogin from './LoginSocial/Google';

// @connect()
@connect(({ webs }) => ({
  webs,
}))
class Header extends PureComponent {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.loginPopup = React.createRef();
    this.state = {
      openMenu: false,
      openMenuChildren: false,
      keyChildren: ""
    }
  }

  showMenu = () => {
    const { openMenu } = this.state
    this.setState({ openMenu: !openMenu })
  }

  openChildren = (value) => {
    const { openMenuChildren } = this.state
    this.setState({ openMenuChildren: !openMenuChildren, keyChildren: value })
  }

  getIdCategory = (value) => {
    let string = value && value.match(/\d+/g) && value.match(/\d+/g).reverse() || []
    return string
  }

  render() {
    const { menuCategories, token, dataSite } = this.props;
    const { openMenu, openMenuChildren, keyChildren } = this.state
    // log('render webs', webs)
    const list = menuCategories && menuCategories.data && menuCategories.data.list || [];    // const { servicePopupClass, loginState, createAccount, PassWord, PassWord1, message, messageCreate, statusLogin, openMenu, openMenuChildren, systemLoginChoose } = this.state;
    // const { categories, token } = this.props;
    // console.log("list", list)
    const redirectMenu = (item) => {
      const url = item && item.url.slice(0, item && item.url.lastIndexOf("-") === '-1' ? item.url.length : item.url.lastIndexOf("-"))
      const routesWebNew = routesWeb && routesWeb.map(item => {
        const path = item && item.path.slice(0, item && item.path.lastIndexOf("-") === '-1' ? item.path.length : item.path.lastIndexOf("-"))
        return { ...item, path }
      })
      const routeMenu = findRoute(url, routesWebNew);
      return routeMenu
    }
    const pathname = location.pathname
    const places = dataSite && dataSite.places
    return (
      <React.Fragment>
        {/* <header className="header topbar_ect ">
          <div className="wrap_hed">
            <div className="container">
              <div className="menu-bar button-menu hidden-md hidden-lg">
                <a onClick={this.showMenu}>
                  <i className="fa fa-bars" />
                </a>
              </div>
              <div className="header-main">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <div className="logo a-left">
                      <Link href="/" path="/index" className="logo-wrapper " style={{ width: '100px' }}>
                        <img src="/static/web/images/logo.png" alt="logo Medisan" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-9 col-sm-9 hidden-xs hidden-sm">
                    <div className="service_head">
                      <div className="row">
                        <div className="col-lg-5 col-md-4 col-sm-4 col-xs-12">
                          <div className="wrap">
                            <div className="img"><img src="/static/web/images/icon_head_1.png" alt="ico" /></div>
                            <div className="content">
                              <p>Địa chỉ phòng khám:</p>
                              <span>{places.address}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="wrap">
                            <div className="img"><img src="/static/web/images/icon_head_2.png" alt="ico" /></div>
                            <div className="content">
                              <p>Giờ làm việc:</p>
                              <span>16h00 - 20h00, thứ 2 - CN (Kể cả lễ, Tết)</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                          <div className="wrap">
                            <div className="img"><img src="/static/web/images/icon_head_3.png" alt="ico" /></div>
                            <div className="content">
                              <p>Hotline tư vấn:</p>
                              <a href={`tel:${places.mobile}`}>{places.mobile}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header> */}
       
       <div className="leadset">
          <ul className="addrset">
            <li><span><i className="lnr lnr-map-marker" /> Khu Phẫu Thuật Thẩm Mỹ, Tầng 3 Nhà A5, Số 1 Tôn Thất Tùng, Quận Đống Đa, Hà Nội.</span></li>
            <li><span className="calling"><i className="lnr lnr-smartphone" />hotline: 098 336 4455<span /></span></li>
           
          </ul>
          <ul className="social">
            <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-tham-my.php"><span className="hsearch">search</span></a></li>
            <li><a href="https://www.facebook.com/" target="_blank"><span className="fb">fb</span></a></li>
            <li><a href="https://twitter.com/" target="_blank"><span className="twitter">twitter</span></a></li>
            <li><a href="https://plus.google.com/" target="_blank"><span className="gplus">gplus</span></a></li>
            <li><a href="https://www.instagram.com/" target="_blank"><span className="insta">insta</span></a></li>
          </ul>
          <p className="booking">
            <a href="http://hanoiplasticsurgery.org/lien-he/" className="btn1">
              <span>
                <i className="lnr lnr-pencil" /> <em>Đặt hẹn </em>tư vấn
              </span>
            </a>
          </p>
        </div>


        <div className="main-nav">
          <div className="container nav-head">
            <div className="row">
              <div className="col-lg-11 col-md-11 hidden-sm hidden-xs">
                <nav className="hidden-sm hidden-xs nav-main">
                  <div className="menu_hed head_1">
                    <ul className="nav nav_1">
                      <li className={pathname === "/" ? " nav-item nav-items active" : "nav-item nav-items"}>
                        <Link path="/index" href="/" key={`product_home`} className="nav-link">
                          Trang chủ
                          <span className="label_">
                            <i className="label " />
                          </span>
                        </Link>
                      </li>
                      {/* <li className=" nav-item nav-items  ">
                        <a className="nav-link" href="https://template-medisan.bizwebvietnam.net/gioi-thieu">
                          Giới thiệu
                    <span className="label_">
                            <i className="label " />
                          </span>
                        </a>
                      </li>
                      <li className=" nav-item nav-items  ">
                        <a className="nav-link" href="https://template-medisan.bizwebvietnam.net/collections/all">
                          Dịch vụ
                    <span className="label_">
                            <i className="label " />
                          </span>
                        </a>
                      </li>
                      <li className="menu_hover nav-item nav-items "> 
                        <a href="https://template-medisan.bizwebvietnam.net/tin-tuc" className="nav-link ">
                          Tin tức <i className="fa fa-caret-down" data-toggle="dropdown" />
                          <span className="label_">
                            <i className="label " />
                          </span>
                        </a>
                        <ul className="dropdown-menu border-box">
                          <li className="nav-item-lv2">
                            <a className="nav-link" href="https://template-medisan.bizwebvietnam.net/ky-thuat-hien-dai">Kỹ thuật hiện đại</a>
                          </li>
                          <li className="nav-item-lv2">
                            <a className="nav-link" href="https://template-medisan.bizwebvietnam.net/dich-vu-tieu-bieu">Dịch vụ tiêu biểu</a>
                          </li>
                          <li className="nav-item-lv2">
                            <a className="nav-link" href="https://template-medisan.bizwebvietnam.net/suc-khoe-sinh-san">Sức khỏe sinh sản</a>
                          </li>
                          <li className="nav-item-lv2">
                            <a className="nav-link" href="https://template-medisan.bizwebvietnam.net/nhip-cau-nhan-ai">Nhịp cầu nhân ái</a>
                          </li>
                        </ul>
                      </li> */}
                      {
                        (list).map(item => {
                          if (item.children && item.children.length !== 0) {
                            const check = item.children.filter((items) => (items.url === pathname))
                            // console.log("dsa", check)
                            return (
                              <li className={check && check.length > 0 ? "menu_hover nav-item nav-items active " : "menu_hover nav-item nav-items  "} key={`hearder_${item.id}`}>
                                <a className="nav-link ">
                                  {item.name} <i className="fa fa-caret-down" data-toggle="dropdown" />
                                  <span className="label_">
                                    <i className="label " />
                                  </span>
                                </a>
                                <ul className="dropdown-menu border-box">
                                  
                                  {/* MENU LEVEL 2 */}
                                  {item.children && item.children.map((child) => {
                                    return (
                                      <li className="nav-item-lv2" key={`hearder_${child.id}`}>
                                        <Link className="nav-link" path={`/User/Category?categoryId=${this.getIdCategory(child.url || '').length > 0 && this.getIdCategory(child.url || '')[0] || ""}&parentId=${this.getIdCategory(child.url || '').length > 1 && this.getIdCategory(child.url || '')[1] || ""}`} href={child.url}>{child.name}</Link>
                                      </li>
                                    )
                                  })}

                                </ul>
                              </li>)
                          }
                          return (
                            <li className={pathname === item.url ? " nav-item nav-items active" : "nav-item nav-items"} key={`hearder_${item.id}`}>
                              <Link path={`/${redirectMenu(item) && redirectMenu(item).component || ''}?id=${this.getIdCategory(item.url || '').length > 0 && this.getIdCategory(item.url || '')[0] || ""}`} href={item.url} key={`product_${item.id}`}>
                                {`${item.name}`}
                                <span className="label_">
                                  <i className="label " />
                                </span>
                              </Link>
                            </li>
                          )
                        })}
                      {/* <li className=" nav-item nav-items  ">
                        <a className="nav-link" href="https://template-medisan.bizwebvietnam.net/lien-he">
                          Liên hệ
                    <span className="label_">
                            <i className="label " />
                          </span>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Menu mobile */}
        <div className="menu_mobile max_991 hidden-md hidden-lg" style={{ display: openMenu ? "block" : 'none' }}>
          <ul className="ul_collections">
            <li className="level0 level-top parent">
              <Link path="/index" href="/" key={`product_home`}>Trang chủ</Link>
            </li>
            {
              (list).map(item => {
                if (item.children && item.children.length !== 0) {
                  return (
                    <li className="level0 level-top parent" key={`hearder_${item.id}`}>
                      <a >{item.name}</a>
                      <i className="fa fa-angle-down" onClick={() => this.openChildren(item.id)}></i>
                      <ul className="level0" style={{ display: keyChildren === item.id && openMenuChildren ? "block" : 'none' }} >
                        {item.children.map((child) => {
                          return (
                            <li className="level1" key={`hearder_${child.id}`}>
                              <Link className="nav-link" path={`/User/Category?categoryId=${this.getIdCategory(child.url || '').length > 0 && this.getIdCategory(child.url || '')[0] || ""}&parentId=${this.getIdCategory(child.url || '').length > 1 && this.getIdCategory(child.url || '')[1] || ""}`} href={child.url}>
                                <span>{child.name}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                }
                return (
                  <li className="level0 level-top parent" key={`hearder_${item.id}`}>
                    <Link path={`/${redirectMenu(item) && redirectMenu(item).component || ''}?id=${this.getIdCategory(item.url || '').length > 0 && this.getIdCategory(item.url || '')[0] || ""}`} href={item.url}>{item.name}</Link>
                  </li>)
              })}
          </ul>
        </div>
      </React.Fragment >
    );
  }
}

export default Header;