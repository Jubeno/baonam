import React, { Component } from 'react';
import Link from '@/utils/ActiveLink';
import EncodeUrl from '@/utils/encode';
import { findRoute } from '@/utils/helpers';
import { routes } from '@/config/router.config';
import { logout } from '@/utils/auth';

const routesWeb = routes.web;

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  renderMenuRight = (token) => {
    const { showSystemLogin } = this.props;
    if (!token) {
      return (
        <ul className="menu_right">
          <li className="menu_login">
            <a
              href="#"
              data-popup="choice_entry"
              onClick={showSystemLogin}
            >
              Đăng nhập
            </a>
          </li>
        </ul>
      )
    }
    return (
      <ul className="menu_right">
        <li className="menu_login" style={{ marginRight: '5px' }}><Link path="/Dashboard/Home" href="/dashboard">Dashboard</Link></li>
        <li className="menu_login">
          <a
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            href="#"
          >
            Đăng xuất
          </a>
        </li>
      </ul>
    )
  }

  render() {
    // const {  } = this.state;
    const { categories, token, openMenu, openMenuChildren, showMenu, showMenuChildren, showSystemLogin } = this.props;
    const routeHome = findRoute('home', routesWeb)
    // console.log("routeHome: ", routeHome)
    const redirectMenu = (item) => {
      // log("redirectMenu: ", item)
      const routeMenu = findRoute(item.nameRoute, routesWeb);
      // log("pretty router: ", routeMenu)
      return routeMenu
    }

    return (
      <React.Fragment>
        <header className={`header_bl ${openMenu}`}>
          <div className="container_center">
            <div className="header-top-wrapper">
              <a onClick={showMenu} href="javascript:void(0)" title="Menu" className="header_menu_hamburger js-header-menu-hamburger">
                <span className="menu_hamburger_line" />
                <span className="menu_hamburger_line" />
                <span className="menu_hamburger_line" />
              </a>
              <Link path={`/${routeHome.component}`} href="/" data-link="main-menu" className="header_logo">
                <img src="https://gcorelabs.com/img/emply.gif" data-src="/static/web/images/216x38.png" alt="CDN MaxPing" className="lazyload heade-logo img-responsive" />
              </Link>
            </div>
            <div className="header_left_content">
              <Link
                data-link="main-menu"
                path={`/${routeHome.component}`}
                href="/"
                className="header_logo_scroll"
              >
                <img src="/static/web/images/216x38.png" data-src="/static/web/images/216x38.png" alt="CDN MaxPing" className="img-responsive lazyloaded" />
              </Link>
              <ul className="menu_list">
                {categories && categories.data && categories.data.list && categories.data.list.map((item) => (
                  <li
                    key={item.id}
                    className={`${item.children && item.children.length > 0 ? "drop_menu" : ""} pointer drop_center`}
                  >
                    {EncodeUrl(item.nameRoute) !== 'home' && item.children && item.children.length > 0 &&
                      <React.Fragment>
                        <a data-link="cdn-full" className="link_section">{item.name}</a>
                        <ul style={{ left: '-42.6487px' }}>
                          {item.children.map((childItem) => (
                            <li key={childItem.id}>
                              <Link path={`/${redirectMenu(childItem).component}?categoryId=${childItem.id}`} data-link="cdn-what-is-cdn-full" href={`/tai-lieu-${item.id}/${EncodeUrl(childItem.name)}-${childItem.id}`}>{childItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </React.Fragment>
                    }
                    {EncodeUrl(item.nameRoute) !== 'home' && EncodeUrl(item.nameRoute) !== 'news' && !item.children &&
                      <Link data-link="cdn-full" path={`/${redirectMenu(item).component}`} className="link_section" href={`/${EncodeUrl(item.name)}`}>{item.name}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>
            <div className="header_right_content">
              {this.renderMenuRight(token)}
            </div>
          </div>
        </header>
        <div className={`mobile_menu ${openMenu}`}>
          <div className="block_menu_fix">
            <div className="header_menu_container">
              <div className="header_menu_wrapper">
                <ul className="menu_list">
                  <li
                    // key={item.id}
                    className="header_menu_item active"
                  >
                    <Link data-link="cdn-full" path={`/${routeHome.component}`} href="/">Trang chủ</Link>
                  </li>
                  {categories && categories.data && categories.data.list && categories.data.list.map((item) => (
                    <React.Fragment key={`menu-${item.id}`}>
                      {EncodeUrl(item.nameRoute) !== 'home' && item.children && item.children.length > 0 &&
                        <li
                          key={item.id}
                          className={`header_menu_item drop_menu_mob active ${item.id === openMenuChildren ? 'open_menu' : ''}`}
                          onClick={() => showMenuChildren(item.id)}
                        >
                          <a data-link="cdn-full" className="link_section" style={{}}>{item.name}</a>
                          <ul style={{ left: '-42.6487px' }}>
                            {item.children.map((childItem) => (
                              <li key={childItem.id}>
                                <Link path={`/${redirectMenu(childItem).component}?categoryId=${childItem.id}`} data-link="cdn-what-is-cdn-full" href={`/tai-lieu-${item.id}/${EncodeUrl(childItem.name)}-${childItem.id}`}>{childItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      }
                      {EncodeUrl(item.nameRoute) !== 'home' && EncodeUrl(item.nameRoute) !== 'news' && !item.children &&
                        <li
                          key={item.id}
                          className="header_menu_item active"
                        >
                          <Link data-link="cdn-full" path={`/${redirectMenu(item).component}`} href={`/${EncodeUrl(item.name)}`}>{item.name}</Link>
                        </li>}
                    </React.Fragment>
                  ))}
                  {!token && <li className="header_menu_item menu_login"><a onClick={showSystemLogin} data-popup="choice_entry">Đăng nhập</a></li>}
                  {token &&
                    <React.Fragment>
                      <li className="header_menu_item menu_login">
                        <Link path="/Dashboard/Analysis" href="/dashboard">Dashboard</Link>
                      </li>
                      <li className="header_menu_item menu_login">
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            logout();
                          }}
                          data-popup="choice_entry"
                        >
                          Đăng xuất
                        </a>
                      </li>
                    </React.Fragment>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;