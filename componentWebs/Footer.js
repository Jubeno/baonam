import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import getConfig from 'next/config'
import { findRoute } from '@/utils/helpers';
import { routes } from '@/config/router.config';
import Link from '@/utils/ActiveLink';

const { publicRuntimeConfig } = getConfig()
const routesWeb = routes.web;
// import CONFIG from '@/utils/config';

// import styles from './Footer.less';

// const prefixLog = "componentPages => footer =>";
// const routesWeb = routes.web;

class Footer extends PureComponent {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.loginPopup = React.createRef();
    // this.state = {
    //   openMenuId: null
    // }
  }
  
  // showMenu = (id) => {
  //   const { openMenuId } = this.state;
  //   if (id !== openMenuId)
  //     this.setState({
  //       openMenuId: id
  //     })
  //   else {
  //     this.setState({
  //       openMenuId: null,
  //     })
  //   }
  // }
  getIdCategory = (value) => {
    let string = value && value.match(/\d+/g) && value.match(/\d+/g).reverse() || []
    return string
  }

  render() {
    // const { openMenuId } = this.state;
    const { menuCategories, dataSite } = this.props;
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
    const places = dataSite && dataSite.places
    return (
      <React.Fragment>
        {/* <footer className="footer">
          <div className="topfoter">
            <div className="container">
              <div className="top-footer">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 footer-click">
                    <div className="logo-footer a-left">
                      <Link path="/index" href="/" className="logo-wrapper " >
                        <img src="/static/web/images/logo_1.png" alt="logo Medisan" style={{ width: '100px' }} />
                      </Link>
                    </div>
                    <h4 className="large">{places.name}</h4>
                    <ul className="ul_col">
                      <li>
                        <span className="icon"><i className="fa fa-home" /></span>
                        <span className="right">
                          <span><span className="b">Trụ sở: &nbsp;</span>{places.address}</span>
                        </span>
                      </li>
                      <li>
                        <span className="icon"><i className="fa fa-phone" /></span>
                        <span className="right">
                          <a className="fone" href={`tel:${places.mobile}`}><span className="b">Hotline: &nbsp;</span>{places.mobile}</a>
                        </span>
                      </li>
                     
                    </ul>
                    
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-8 col-xs-12 ">
                    <div className="row rowpading">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-click">
                        <h4 className="cliked">Thông tin phòng khám</h4>
                        <ul className="toggle-mn" style={{}}>
                          <li><Link className="ef" path="/index" href="/" key={`product_home`} >Trang chủ</Link></li>
                          {(list).map(item => {
                            if (item.children && item.children.length !== 0) {
                              return null
                            }
                            return <li key={`footer_${item.id}`}><Link className="ef" path={`/${redirectMenu(item) && redirectMenu(item).component || ''}?id=${this.getIdCategory(item.url || '')}`} href={item.url} key={`product_${item.id}`}>{item.name}</Link></li>

                          })}
                        </ul>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-click">
                        <h4 className="cliked">Dịch vụ phòng khám</h4>
                        <ul className="toggle-mn" style={{}}>
                          {(list).map(item => {
                            if (item.children && item.children.length !== 0) {
                              return item.children.map((child) => {
                                return (
                                  <li key={`footer_${child.id}`}><Link className="ef" path={`/User/Category?categoryId=${this.getIdCategory(child.url || '').length > 0 && this.getIdCategory(child.url || '')[0] || ""}&parentId=${this.getIdCategory(child.url || '').length > 1 && this.getIdCategory(child.url || '')[1] || ""}`} href={child.url} key={`product_${child.id}`}>{child.name}</Link></li>
                                )
                              })
                            }
                            return null
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 footer-click">
                    <div className="wraplock">
                      <div className="imagelock"><img src="/static/web/images/clock.png" alt="clock" /></div>
                      <h4>Giờ làm việc</h4>
                      <div className="innerlock">
                        <div className="list">
                          <span className="left">Thứ 2</span>
                          <span className="right">16h00- 20h00</span>
                        </div>
                        <div className="list">
                          <span className="left">Thứ 3</span>
                          <span className="right">16h00 - 20h00</span>
                        </div>
                        <div className="list">
                          <span className="left">Thứ 4</span>
                          <span className="right">16h00- 20h00</span>
                        </div>
                        <div className="list">
                          <span className="left">Thứ 5</span>
                          <span className="right">16h00 - 20h00</span>
                        </div>
                        <div className="list">
                          <span className="left">Thứ 6</span>
                          <span className="right">16h00- 20h00</span>
                        </div>
                        <div className="list">
                          <span className="left">Thứ 7, CN</span>
                          <span className="right">16h00 - 20h00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <div className="container">
              <div className="row row_footer">
                <div id="copy1" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div className="row tablet">
                    <div id="copyright" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 fot_copyright a-center">
                      <span className="wsp">@ Bản quyền thuộc về <a className="color" href="http://nbm.vn" target="_blank" >NBM.VN</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" id="back-to-top" className="backtop back-to-top" title="Lên đầu trang"><i className="fa fa-arrow-up" /></a>
        </footer> */}

        <footer id="footer">
          <div className="fInner clearfix">

            <div className="fSet set1">
              <p className="fLogo">
                <Link path="/index" href="/" className="logo-wrapper " >
                  <img src="/static/web/images/logo_1.png" alt="logo Medisan"  />
                </Link>
                <span>{places.name}</span>
              </p>
              <p><span className="calling">Bác sỹ tư vấn (24/7) <em>{places.mobile}</em></span></p>
                        <li><span><i className="lnr lnr-map-marker" /> {places.address}</span></li>
            </div>

            <div className="fSet set2">
              <p className="caption"><Link className="ef caption" path="/index" href="/" key={`product_home`} >Trang chủ</Link></p>
              <ul className="addrset">

                {
                  (list).map(item => {
                    if (item.children && item.children.length !== 0) {
                      return null
                    }
                    return <li key={`footer_${item.id}`}><Link className="ef" path={`/${redirectMenu(item) && redirectMenu(item).component || ''}?id=${this.getIdCategory(item.url || '')}`} href={item.url} key={`product_${item.id}`}>{item.name}</Link></li>

                  })
                }
                
              </ul>
            </div>

            <div className="fSet set3">
              <p className="caption"><Link className="ef caption" path="/index" href="/" key={`product_home`} >Dịch vụ phòng khám</Link></p>
              <ul className="addrset">

                {
                  (list).map(item => {
                    if (item.children && item.children.length !== 0) {
                      return item.children.map((child) => {
                        return (
                          <li key={`footer_${child.id}`}><Link className="ef" path={`/User/Category?categoryId=${this.getIdCategory(child.url || '').length > 0 && this.getIdCategory(child.url || '')[0] || ""}&parentId=${this.getIdCategory(child.url || '').length > 1 && this.getIdCategory(child.url || '')[1] || ""}`} href={child.url} key={`product_${child.id}`}>{child.name}</Link></li>
                        )
                      })
                    }
                    return null
                  })
                }
                
              </ul>
            </div>

            

            <div className="fSet set4">
              {/* <p className="caption">Follow us</p>
              <ul className="social">
                <li><a href="https://www.facebook.com/" target="_blank"><span className="fb">fb</span></a></li>
                <li><a href="https://twitter.com/" target="_blank"><span className="twitter">twitter</span></a></li>
                <li><a href="https://plus.google.com/" target="_blank"><span className="gplus">gplus</span></a></li>
                <li><a href="https://www.instagram.com/" target="_blank"><span className="insta">insta</span></a></li>
              </ul>
              <p className="booking"><a href="http://hanoiplasticsurgery.org/lien-he/" className="btn1"><span><i className="lnr lnr-pencil" /> <em>Đặt hẹn </em>tư vấn</span></a></p> */}
              <div className="wraplock">
                <div className="imagelock"><img src="/static/web/images/clock.png" alt="clock" /></div>
                <h4>Giờ làm việc</h4>
                <div className="innerlock">
                  <div className="list">
                    <span className="left">Thứ 2</span>
                    <span className="right">16h00- 20h00</span>
                  </div>
                  <div className="list">
                    <span className="left">Thứ 3</span>
                    <span className="right">16h00 - 20h00</span>
                  </div>
                  <div className="list">
                    <span className="left">Thứ 4</span>
                    <span className="right">16h00- 20h00</span>
                  </div>
                  <div className="list">
                    <span className="left">Thứ 5</span>
                    <span className="right">16h00 - 20h00</span>
                  </div>
                  <div className="list">
                    <span className="left">Thứ 6</span>
                    <span className="right">16h00- 20h00</span>
                  </div>
                  <div className="list">
                    <span className="left">Thứ 7, CN</span>
                    <span className="right">16h00 - 20h00</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <p id="copyright">@ Bản quyền thuộc về <a className="color" href="http://nbm.vn" target="_blank" >NBM.VN</a></p>
        </footer>

        
      </React.Fragment>
    );
  }
}
export default Footer;
