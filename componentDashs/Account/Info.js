import React, { Component } from 'react';
import router from 'next/router';
import { Menu } from 'antd';
import GridContent from '@/componentDashs/PageHeaderWrapper/GridContent';
import PageHeaderWrapper from '@/componentDashs/PageHeaderWrapper';
import styles from './Info.less';
// import log from '@/utils/log';

// const PREFIX_LOG = "pages => Account => Info"
const { Item } = Menu;

/* @connect(({ user }) => ({
  currentUser: user.currentUser,
})) */
class Info extends Component {
  constructor(props) {
    super(props);
    const { selectKey } = props;
    const menuMap = {
      base: "Thông tin cá nhân",
      security: "Thay đổi mật khẩu",
    };
    // const key = pathname.replace(`${asPath}/`, '');
    const key = selectKey;
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'base',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { selectKey } = props;
    // log(`${PREFIX_LOG} => getDerivedStateFromProps => asPath: %o, pathname: %o`, asPath, pathname)
    // let selectKey = pathname.replace(`${asPath}/`, '');
    // selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    const { currentUser } = this.props;
    if (key === "base") {
      router.push('/Account/BaseView', `/account/${key}/${currentUser.username}`);
    } else {
      router.push('/Account/SecurityView', `/account/${key}/${currentUser.username}`);
    }
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      let mode = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  render() {
    // log("AccountInfo props: ", this.props)
    const { children, currentUser } = this.props;
    if (!currentUser.id) {
      return '';
    }
    const { mode, selectKey } = this.state;
    return (
      <PageHeaderWrapper
        title="Thiết lập tài khoản"
      >
        <GridContent>
          <div
            className={styles.main}
            ref={ref => {
              this.main = ref;
            }}
          >
            <div className={styles.leftmenu}>
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                {this.getmenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{this.getRightTitle()}</div>
              {children}
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Info;
