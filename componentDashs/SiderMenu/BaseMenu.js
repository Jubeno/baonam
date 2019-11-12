/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Menu, Icon } from 'antd';
import { MenuLink } from '@/utils/ActiveLink';
import { urlToList } from '../_utils/pathTools';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '@/utils/utils';
import styles from './index.less';
// import log from '@/utils/log';

// const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && isUrl(icon)) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export default class BaseMenu extends PureComponent {

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    // console.log("dsa", menusData)
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item, parent))
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item;
      return (
        <Menu.SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
                name
              )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </Menu.SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    // log("BaseMenu getMenuItemPath item: ", item)
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, component, id } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <MenuLink
        href={component}
        to={`${itemPath}?menuId=${id}`}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </MenuLink>
    );
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  render() {
    const {
      openKeys,
      theme,
      mode,
      location: { pathname },
      className,
      collapsed,
      handleOpenChange, style, menuData
    } = this.props;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    const cls = classNames(className, {
      'top-nav-menu': mode === 'horizontal',
    });

    /* const data = [
      {
        component: "",
        hideInMenu: false,
        icon: "form",
        name: "Quản lý hệ thống",
        path: "/system",
        children: [
          {
            path: '/system/groupUsers',
            component: 'GroupUser/List',
            icon: "",
            name: 'Quản lý nhóm tài khoản'
          },
          {
            component: "Users/List",
            icon: "",
            name: "Quản lý tài khoản",
            path: "/system/users",
          },
          {
            component: "RolesTemplate/List",
            icon: "",
            name: "Quản lý quyền mẫu",
            path: "/system/rolesTemplates",
          },
          {
            component: "Menus/List",
            icon: "",
            name: "Quản lý thanh công cụ",
            path: "/system/menus",
          },
        ]
      },
      {
        component: "",
        hideInMenu: false,
        icon: "form",
        name: "Quản lý danh mục",
        path: "/category",
        children: [
          {
            component: "Templates/List",
            icon: "",
            name: "Quản lý thư viện giao diện",
            path: "/category/templates",
          },
          {
            path: '/category/categorys',
            component: 'Category/List',
            icon: "",
            // component: 'TblSmsTemplates/List',
            name: 'Quản lý danh mục'
          },
          {
            path: '/category/groupWebsites',
            component: 'GroupWebsite/List',
            icon: "",
            // component: 'TblSmsTemplates/List',
            name: 'Quản lý nhóm website'
          },
          {
            path: '/category/website',
            icon: "",
            component: 'Website/List',
            name: 'Quản lý website'
          },
          {
            path: '/category/ad',
            component: 'Ad/List',
            icon: "",
            // component: 'TblSmsTemplates/List',
            name: 'Quản lý quảng cáo'
          },
          {
            path: '/category/adsPosition',
            icon: "",
            component: 'AdsPosition/List',
            // component: 'TblSmsTemplates/List',
            name: 'Quản lý vị trí quảng cáo'
          },
          {
            path: '/category/adstype',
            icon: "",
            component: 'AdsType/List',
            // component: 'TblSmsTemplates/List',
            name: 'Quản lý loại quảng cáo'
          },
          {
            path: '/category/province',
            icon: "",
            component: 'Province/List',
            name: 'Quản lý Tỉnh/Thành phố'
          },
          {
            path: '/category/district',
            icon: "",
            component: 'District/List',
            name: 'Quản lý Quận/Huyện'
          }, {
            path: '/category/ward',
            icon: "",
            component: 'Ward/List',
            name: 'Quản lý Phường/Xã'
          },
          {
            path: '/category/groupPlace',
            component: 'GroupPlace/List',
            icon: "",
            name: 'Quản lý nhóm cơ sở y tế'
          },
          {
            path: '/category/place',
            icon: "",
            component: 'Place/List',
            name: 'Quản lý cơ sở y tế'
          },
          {
            path: '/category/news',
            component: 'News/List',
            icon: "",
            name: 'Quản lý tin tức'
          },
          {
            path: '/category/templateLayouts',
            component: 'TemplateCategory/List',
            icon: "",
            name: 'Quản lý giao diện danh mục'
          },
        ]
      },
    ] */
    // log("BaseMenu props: ", this.props)
    const Arr = []
    menuData && menuData.map((item) => {
      if (item.children) {
        item.children && item.children.map((childrens) => {
          Arr.push(childrens)
        })
      }
      Arr.push(item)
    })
    const selectedKey = selectedKeys && selectedKeys.length > 1 && selectedKeys[1]
    let selectedKeysID = Arr && Arr.filter(item => item.path === selectedKey)
    selectedKeysID = selectedKeysID && selectedKeysID.length > 0 && selectedKeysID[0]
    let selectedKeysParentId = Arr && Arr.filter(item => item.id === selectedKeysID.parentId)
    selectedKeysParentId = selectedKeysParentId && selectedKeysParentId.length > 0 && selectedKeysParentId[0]
    const KeysId = [selectedKeysParentId.path, selectedKeysID.path]
    if (openKeys && !collapsed) {
      // let openKeysUpdate
      // switch (openKeys && openKeys.length) {
      //   case 1:
      //     openKeysUpdate = KeysId
      //     break;
      //   case 2:
      //     openKeysUpdate = openKeys
      //     break;
      //   default:
      //     openKeysUpdate = []
      // }
      props = {
        openKeys: openKeys.length === 0 ? [...KeysId] : openKeys,
      };
    }
    // console.log("openKeys", openKeys)
    return (
      <Menu
        key="Menu"
        mode={mode}
        theme={theme}
        onOpenChange={handleOpenChange}
        // openKeys={KeysParentId}
        selectedKeys={KeysId}
        style={style}
        className={cls}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
    /* return (
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
      >
        <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    ) */
  }
}
