import React from 'react';
import { Upload, Icon, Modal, Tooltip } from 'antd';
import cookie from 'js-cookie'
import getConfig from 'next/config'
import styles from './index.less';
import log from '@/utils/log'

const { publicRuntimeConfig } = getConfig()
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_985378_cfe85u6fa4.js',
});

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    // eslint-disable-next-line react/destructuring-assignment
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ file, fileList, event }) => {
    log("Upload onChange file %o \nfileList: %o \nevent: %o", file, fileList, event)
    this.setState({ fileList });
    /* const { onChange } = this.props;
    if (onChange) {
      onChange(fileList);
    } */
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { action, headers, ...rest } = this.props;
    // log("Upload render rest: ", rest)
    /* const uploadButton = (
      <div>
        <IconFont type="icon-Camera" />
        <div className="ant-upload-text">Upload</div>
      </div>
    ); */
    const uploadButton = <Tooltip title="Tải ảnh"><IconFont type="icon-Camera" /></Tooltip>;
    const cookieToken = cookie.get("token");
    const token = cookieToken !== "undefined" ? cookieToken : null;
    const cookieEmail = cookie.get("auth_email");
    // const authEmail = localStorage.getItem('antd-pro-userName') !== "undefined" ? JSON.parse(localStorage.getItem('antd-pro-userName')) : null;
    const authEmail = cookieEmail !== 'undefined' ? cookieEmail : null;
    const defaultHeaders = token ? {
      'X-Auth-Email': `${authEmail}`,
      'X-Auth-Key': `${token}`,
      'X-Auth-Project': `${publicRuntimeConfig.IMAGE_PROJECT}`
      // token,
      // authorization: `Bearer ${token}`,
    } : {}
    // document.querySelector(".anticon.anticon-delete")
    // console.log(document.querySelector(".anticon.anticon-delete"))
    return (
      <div className="clearfix">
        <style>
          {`.clearfix:hover .ant-upload.ant-upload-select-picture-card {
              display: block;
              z-index:999
          }`}
        </style>
        {/* <script>document.querySelector(".anticon.anticon-delete").title = "abc"</script> */}
        <Upload
          name="file"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          className={styles.myUpload}
          action={action}
          headers={defaultHeaders}
          {...rest}
        >
          {uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
