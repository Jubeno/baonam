import React, { PureComponent } from 'react';
// import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, message } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import cookie from 'js-cookie'
import PlaceSelect from '@/componentDashs/FilterCategory/PlaceSelect'
// import NoticeIcon from '../NoticeIcon';
// import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
// import SelectLang from '../SelectLang';
import styles from './index.less';
// import log from '@/utils/log';
import publicRuntimeConfig from '@/utils/config';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  getAvatarURL = (srcImg) => {
    if (srcImg) {
      const check = srcImg.indexOf('http')
      const url = check !== -1 ? srcImg : `${publicRuntimeConfig.IMAGE_DAS_SERVER}${publicRuntimeConfig.IMAGE_PROJECT}/${srcImg}`
      return url
    }
    const url = '/static/dashBoard/images/white.png';
    return url;
  }

  onChange = (value) => {
    cookie.set('placeID', value);
    message.success("Thay đổi cơ sở y tế thành công")
    window.location.href = '/dashboard';
  }

  render() {
    const {
      currentUser,
      // fetchingNotices,
      // onNoticeVisibleChange,
      onMenuClick,
      // places,
      // onNoticeClear,
      theme,
    } = this.props;
    // log("currentUser ", currentUser)
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {/* <Menu.Item key="userCenter">
          <Icon type="user" />
          account center
        </Menu.Item> */}
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          Thiết lập tài khoản
        </Menu.Item>
        {/* <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          Trigger Error
        </Menu.Item> */}
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          Đăng xuất
        </Menu.Item>
      </Menu>
    );
    // const noticeData = this.getNoticeData();
    // const unreadMsg = this.getUnreadData(noticeData);
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    const defaultId = cookie.get("placeID") || '';
    return (
      <div className={className}>
        <PlaceSelect placeholder="Chọn cơ sở y tế" className={styles.select} onChange={this.onChange} value={`${defaultId}`} result={currentUser && currentUser.places} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder='component.globalHeader.search'
          dataSource={[
            'component.globalHeader.search.example1',
            'component.globalHeader.search.example2',
            'component.globalHeader.search.example3',
          ]}
          onSearch={value => {
            console.log('input', value); // eslint-disable-line
          }}
          onPressEnter={value => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <Tooltip title='component.globalHeader.help'>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <NoticeIcon
          className={styles.action}
          count={currentUser.unreadCount}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
            this.changeReadState(item, tabProps);
          }}
          locale={{
            emptyText: 'component.noticeIcon.empty',
            clear: 'component.noticeIcon.clear',
          }}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          clearClose
        >
          <NoticeIcon.Tab
            count={unreadMsg.notification}
            list={noticeData.notification}
            title='component.globalHeader.notification'
            name="notification"
            emptyText='component.globalHeader.notification.empty'
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            count={unreadMsg.message}
            list={noticeData.message}
            title='component.globalHeader.message'
            name="message"
            emptyText='component.globalHeader.message.empty'
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          <NoticeIcon.Tab
            count={unreadMsg.event}
            list={noticeData.event}
            title='component.globalHeader.event'
            name="event"
            emptyText='component.globalHeader.event.empty'
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIcon> */}
        {currentUser.username ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src="/static/dashBoard/images/white.png"
                // src={this.getAvatarURL(currentUser.avatar)}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.username}</span>
            </span>
          </HeaderDropdown>
        ) :
          (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
          )}
        {/* <SelectLang className={styles.action} /> */}
      </div>
    );
  }
}
