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


        {/* Topbar */}
        <div className="leadset">
          <ul className="addrset">
            <li><span><i className="lnr lnr-map-marker" /> {places.address}</span></li>
            <li><span className="calling"><i className="lnr lnr-smartphone" />hotline: {places.mobile}<span /></span></li>
           
          </ul>
          <ul className="social">
            {/* <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-tham-my.php"><span className="hsearch">search</span></a></li> */}
            <li><a href="https://www.facebook.com/"><span className="fb">fb</span></a></li>
            <li><a href="https://twitter.com/"><span className="twitter">twitter</span></a></li>
            <li><a href="https://plus.google.com/"><span className="gplus">gplus</span></a></li>
            <li><a href="https://www.instagram.com/"><span className="insta">insta</span></a></li>
          </ul>
          <p className="booking">
            <a href="http://hanoiplasticsurgery.org/lien-he/" className="btn1">
              <span>
                <i className="lnr lnr-pencil" /> <em>Đặt hẹn </em>tư vấn
              </span>
            </a>
          </p>
        </div>

        {/* Menu Desktop */}
        <header id="header">
          <div className="hInner clearfix">
            <div className="hSet">
              <a href="http://hanoiplasticsurgery.org/" id="logo">
                <Link href="/" path="/index" className="logo-wrapper " style={{ width: '100px' }}>
                  <img src="/static/web/images/logo.png" alt="logo Medisan" />
                </Link>
              </a>
              <p className="hCall sp"><a href="tel:0983364455"><img src="/static/web/img/common/tel.svg" alt="" /></a></p>
              <p className="hamburger sp"><a href="javascript:void(0)"><span className="ham">&nbsp;</span><span className="bur">&nbsp;</span><span className="ger">&nbsp;</span></a></p>
            </div>
          
            <div className="naviSet">
              <div className="inNavi">
                <ul className="gNavi">
                  
                  <li className="nav-item nav-items">
                    <Link path="/index" href="/" key={`product_home`} className="nav-link">
                      Trang chủ
                      <span className="label_">
                        <i className="label " />
                      </span>
                    </Link>
                  </li>

                  {/* <li className="item2"><a href="http://hanoiplasticsurgery.org/gioi-thieu/">Giới thiệu</a></li>
                  <li className="item6 sp"><a href="http://hanoiplasticsurgery.org/nhan-su/">Bác sỹ phẫu thuật</a></li>
                  <li className="item3 hasSub"><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-tao-hinh.php" className="pc">Phẫu thuật tạo hình</a>
                    <div className="navSub" style={{display: 'none'}}>
                      <div className="navInner">
                        <div className="navInside clearfix split2">
                          <div className="navCol">
                            <p className="caption"><span>Phẫu thuật tạo hình</span></p>
                            <ul className="navList1 clearfix">
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-tao-hinh-di-chung-sau-chan-thuong/">Phẫu thuật tạo hình di chứng sau chấn thương</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-tao-hinh-sau-dieu-tri-ung-thu/">Phẫu thuật tạo hình sau điều trị ung thư</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-tao-hinh-di-chung-bong/">Phẫu thuật tạo hình di chứng bỏng</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-tao-hinh-co-quan-sinh-duc-ngoai/">Phẫu thuật tạo hình cơ quan sinh dục ngoài</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-tao-hinh-ban-tay/">Phẫu thuật tạo hình bàn tay</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/vi-phau-thuat-mach-mau-than-kinh/">Vi phẫu thuật mạch máu, thần kinh</a></li>
                            </ul>
                          </div>
                          <div className="navCol">
                            <p className="caption"><span>Phẫu thuật điều trị các dị tật bẩm sinh</span></p>
                            <ul className="navList1 clearfix">
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-dieu-tri-di-tat-so-mat/">Phẫu thuật điều trị dị tật sọ mặt</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-dieu-tri-di-tat-khe-ho-moi/">Phẫu thuật điều trị dị tật khe hở môi</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-dieu-tri-di-tat-khe-ho-vom-mieng/">Phẫu thuật điều trị dị tật khe hở vòm miệng</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-dieu-tri-di-tat-vanh-tai/">Phẫu thuật điều trị dị tật vành tai</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-dieu-tri-di-tat-thua-ngon-u-hac-to/">Phẫu thuật điều trị dị tật thừa ngón, u hắc tố</a></li>
                              <li><a href="http://hanoiplasticsurgery.org/loai-dich-vu/phau-thuat-dieu-tri-cac-benh-ly-bat-thuong-mach-mau/">Phẫu thuật điều trị các bệnh lý bất thường mạch máu</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  {
                          (list).map(item => {
                            if (item.children && item.children.length !== 0) {
                              const check = item.children.filter((items) => (items.url === pathname))
                              // console.log("dsa", check)
                              return (
                                <li className={check && check.length > 0 ? "item3 hasSub active " : "item3 hasSub  "} key={`hearder_${item.id}`}>
                                  <a className="nav-link pc">
                                    {item.name} <i className="fa fa-caret-down" data-toggle="dropdown" />
                                    <span className="label_">
                                      <i className="label " />
                                    </span>
                                  </a>
                                  <div className="navSub" style={{display: 'none'}}>
                                    <div className="navInner">
                                      <div className="navInside clearfix split2">
                                        <div className="navCol">
                                          <p className="caption"><span>Tiêu đề menu: chưa điền</span></p>
                                          <ul className="navList1 clearfix">
                                            
                                            {/* MENU LEVEL 2 */}
                                            {item.children && item.children.map((child) => {
                                              return (
                                                <li key={`hearder_${child.id}`}>
                                                  <Link path={`/User/Category?categoryId=${this.getIdCategory(child.url || '').length > 0 && this.getIdCategory(child.url || '')[0] || ""}&parentId=${this.getIdCategory(child.url || '').length > 1 && this.getIdCategory(child.url || '')[1] || ""}`} href={child.url}>{child.name}</Link>
                                                </li>
                                              )
                                            })}

                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
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
                </ul>
              </div>
            </div>
          </div>
        </header>


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
      </React.Fragment>
    );
  }
}

export default Header;