/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Input, } from 'antd';
import cookie from 'js-cookie'
import getConfig from 'next/config'
import ImageUpload from '@/componentDashs/UploadImage/ImageUpload'


const { publicRuntimeConfig } = getConfig()

// import { connect } from 'react-redux';
// import { fnKhongDau } from '@/utils/utils';
// import log from '@/utils/log';



class Index extends Component {
  state = {
    value: this.props.value,

  }

  componentWillReceiveProps(nextProps) {
    const { type, onChange } = this.props;
    if (nextProps.type !== type) {
      this.setState({ value: '' })
      onChange('')
    }
  }

  onChange = (value) => {
    this.setState({ value });
    const { onChange } = this.props;

    if (onChange)
      onChange(value);
  }



  render() {
    const { type, placeholder, key } = this.props;
    const { value } = this.state;


    // log("groupMedicineselect render props: ", this.props)
    if (type === '25') return (
      <Input.TextArea
        key={`text_${key}`}
        placeholder={placeholder}
        Row={2}
        onChange={e => this.onChange(e.target.value)}
        value={value || ''}
      />
    )
    return (
      // <ImageUpload
      //   // key={`screenShots-${data.id}-${uuidv1()}`}
      //   key="screenShots"
      //   postUrl={`${publicRuntimeConfig.UPLOAD_IMAGE_SINGER}`}
      //   acceptedFiles="image/*"
      //   maxFiles={5}
      //   maxFilesize={100}
      //   value={value || ''}
      //   onChange={this.onChange}
      //   // resizeHeight={250}
      //   // resizeQuality={0.8}
      //   iconFiletypes={['.jpg', '.png', '.jpeg', '.gif']}
      //   showFiletypeIcon
      //   // extractWidth={["35", "1000"]}
      //   // extractHeight={["10", "750"]}
      //   ratio="1:1"
      //   maxWidth="800"
      //   minWidth="400"
      //   helperText="Tỷ lê ảnh 1:1, kích thước ảnh từ 400px đến 800px."
      // />
      <ImageUpload
        key={`screenShots_${key}`}
        postUrl={`${publicRuntimeConfig.UPLOAD_IMAGE_SINGER}`}
        acceptedFiles="image/*"
        maxFiles={1}
        maxFilesize={100}
        value={value || ''}
        onChange={this.onChange}
        // resizeWidth={300}
        // resizeHeight={250}
        // resizeQuality={0.8}
        extractWidth={["300", "5000"]}
        extractHeight={["150", "3000"]}
        iconFiletypes={['.jpg', '.png', '.jpeg', '.gif']}
        showFiletypeIcon={true}
        helperText={'Lưu 1 ảnh, kích thước rộng từ 300px->5000px, cao từ 150px->3000px'}
      />

    );
  }
}

export default Index;