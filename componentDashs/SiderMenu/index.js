import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';

const SiderMenuWrapper = React.memo(props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  // console.log("isMobile: ", isMobile)
  // const data = [
  //   {
  //     component: "",
  //     hideInMenu: false,
  //     icon: "form",
  //     name: "Quản lý hệ thống",
  //     path: "/system",
  //     children: [
  //       {
  //         path: '/system/groupUsers',
  //         component: 'GroupUser/List',
  //         icon: "",
  //         name: 'Quản lý nhóm tài khoản'
  //       },
  //       {
  //         component: "Users/List",
  //         icon: "",
  //         name: "Quản lý tài khoản",
  //         path: "/system/users",
  //       },
  //       {
  //         component: "RolesTemplate/List",
  //         icon: "",
  //         name: "Quản lý quyền mẫu",
  //         path: "/system/rolesTemplates",
  //       },
  //       {
  //         component: "Menus/List",
  //         icon: "",
  //         name: "Quản lý thanh công cụ",
  //         path: "/system/menus",
  //       },
  //     ]
  //   },
  //   {
  //     component: "",
  //     hideInMenu: false,
  //     icon: "form",
  //     name: "Quản lý danh mục",
  //     path: "/category",
  //     children: [
  //       {
  //         component: "Templates/List",
  //         icon: "",
  //         name: "Quản lý thư viện giao diện",
  //         path: "/category/templates",
  //       },
  //       {
  //         path: '/category/categorys',
  //         component: 'Category/List',
  //         icon: "",
  //         // component: 'TblSmsTemplates/List',
  //         name: 'Quản lý danh mục'
  //       },
  //       {
  //         path: '/category/groupWebsites',
  //         component: 'GroupWebsite/List',
  //         icon: "",
  //         // component: 'TblSmsTemplates/List',
  //         name: 'Quản lý nhóm website'
  //       },
  //       {
  //         path: '/category/website',
  //         icon: "",
  //         component: 'Website/List',
  //         name: 'Quản lý website'
  //       },
  //       {
  //         path: '/category/ad',
  //         component: 'Ad/List',
  //         icon: "",
  //         // component: 'TblSmsTemplates/List',
  //         name: 'Quản lý quảng cáo'
  //       },
  //       {
  //         path: '/category/adsPosition',
  //         icon: "",
  //         component: 'AdsPosition/List',
  //         // component: 'TblSmsTemplates/List',
  //         name: 'Quản lý vị trí quảng cáo'
  //       },
  //       {
  //         path: '/category/adstype',
  //         icon: "",
  //         component: 'AdsType/List',
  //         // component: 'TblSmsTemplates/List',
  //         name: 'Quản lý loại quảng cáo'
  //       },
  //       {
  //         path: '/category/province',
  //         icon: "",
  //         component: 'Province/List',
  //         name: 'Quản lý Tỉnh/Thành phố'
  //       },
  //       {
  //         path: '/category/district',
  //         icon: "",
  //         component: 'District/List',
  //         name: 'Quản lý Quận/Huyện'
  //       }, {
  //         path: '/category/ward',
  //         icon: "",
  //         component: 'Ward/List',
  //         name: 'Quản lý Phường/Xã'
  //       },
  //       {
  //         path: '/category/groupPlace',
  //         component: 'GroupPlace/List',
  //         icon: "",
  //         name: 'Quản lý nhóm cơ sở y tế'
  //       },
  //       {
  //         path: '/category/place',
  //         icon: "",
  //         component: 'Place/List',
  //         name: 'Quản lý cơ sở y tế'
  //       },
  //       {
  //         path: '/category/news',
  //         component: 'News/List',
  //         icon: "",
  //         name: 'Quản lý tin tức'
  //       },
  //       {
  //         path: '/category/templateLayouts',
  //         component: 'TemplateCategory/List',
  //         icon: "",
  //         name: 'Quản lý giao diện danh mục'
  //       },
  //     ]
  //   },
  // ]

  const flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <SiderMenu {...props} flatMenuKeys={flatMenuKeys} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) :
    (
      <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
    );
});

export default SiderMenuWrapper;
