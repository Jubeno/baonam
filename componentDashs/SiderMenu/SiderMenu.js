/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import dynamic from 'next/dynamic'
import styles from './index.less';
// import PageLoading from '../PageLoading';
// import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';
import Link from '@/utils/ActiveLink';
// import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// const { SubMenu } = Menu;

const BaseMenu = dynamic(() => import('./BaseMenu'), {
  ssr: false
});
const { Sider } = Layout;

const getDefaultCollapsedSubMenus = (props) => {
  const {
    location: { pathname },
    menuData
  } = props;
  const Arr = []
  menuData && menuData.map((item) => {
    if (item.children) {
      item.children && item.children.map((childrens) => {
        Arr.push(childrens)
      })
    }
    Arr.push(item)
  })
  let selectedKeysID = Arr && Arr.filter(item => item.path === pathname)
  selectedKeysID = selectedKeysID && selectedKeysID.length > 0 && selectedKeysID[0]
  let selectedKeysParentId = Arr && Arr.filter(item => item.id === selectedKeysID.parentId)
  selectedKeysParentId = selectedKeysParentId && selectedKeysParentId.length > 0 && selectedKeysParentId[0]
  const KeysId = [selectedKeysParentId.path, selectedKeysID.path]
  return KeysId
  // return urlToList(pathname)
  //   .map(item => getMenuMatches(flatMenuKeys, item)[0])
  //   .filter(item => item);
};

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
      status: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname, status } = state;
    if (props.location.pathname !== pathname) {
      return {
        pathname: props.location.pathname,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    if (status) {
      return {
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  // componentDidMount() {
  //   this.setState = ({
  //     openKeys: getDefaultCollapsedSubMenus(this.props),
  //   });
  // }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    // log("openKeys: ", openKeys)
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
      status: false
    });
  };

  render() {
    // log("SIDER MENU props: ", this.props)
    const { logo, collapsed, onCollapse, fixSiderbar, theme } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    // console.log("openKeys", openKeys)
    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderbar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    /* return (
      <Sider width={200} style={{ background: '#fff' }}>
        <div className={styles.logo} id="logo" style={{}}>
          <Link href="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
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
      </Sider>
    ) */
    // console.log('onCollapse',collapsed)
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo" style={{}}>
          <Link path="/Dashboard/Home" href="/dashboard">
            {collapsed ? '' : <img src={logo} alt="logo" />}

            {/* <h1>{CONFIG.APP_NAME}</h1> */}
          </Link>
        </div>
        <BaseMenu
          {...this.props}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
          {...defaultProps}
        />

      </Sider>
    );
  }
}
