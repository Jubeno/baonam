/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, message } from 'antd';
import log from '@/utils/log';
// import Select from '@/componentDashs/Select';
import { fnKhongDau } from '@/utils/utils';


// const FormItem = Form.Item;
@connect(({ templates, places }) => ({
  templates, places
}))

class Index extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value,
    // valueProvince: '',
    // valueDistrict: '',
    // valueWard: '',
    dataArr: [],
    dataOrigin: [],
    loading: false,
  };

  componentDidMount() {
    // log("Get all user didmount", this.props)
    const { dispatch, type } = this.props;
    setTimeout(() => {
      const params = {
        filter: {
          status: true
        }
      };
      if (type === 1) {
        dispatch({
          type: 'templates/fetchAll',
          payload: params,
          callback: (result) => {
            // console.log("result",result.success)
            if (result && result.success === true) {
              log('result', result)
              // const data = result && result.result.map(user => ({
              //   text: `${user.name}`,
              //   value: user.id,
              // }));
              this.setState({
                dataArr: result.result,
                dataOrigin: result.result
              })
            } else {
              message.error(result.messages);
            }

          }
        });

      }
      else if (type === 2) {
        dispatch({
          type: 'places/fetchAll',
          payload: params,
          callback: (result) => {
            // console.log("result",result.success)
            if (result && result.success === true) {
              log('result', result)
              // const data = result && result.result.map(user => ({
              //   text: `${user.name}`,
              //   value: user.id,
              // }));
              this.setState({
                dataArr: result.result,
                dataOrigin: result.result
              })
            } else {
              message.error(result.messages);
            }

          }
        });
      }
      this.setState({ loading: false });
    }, 2000);
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {

    const { value } = this.state;

    if (nextProps.value !== value)
      this.setState({ value: nextProps.value });
  }


  renderData = data => (data || []).map(
    item =>
      <Select.Option key={item.id}>{item.name}</Select.Option>
  );

  onChange = (value) => {
    // log("GroupAddress onChange value: ", value)
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };
  // renderTagPlaceHolder = (valueChannel) => (
  //   <a
  //     onClick={e => {
  //       e.preventDefault();
  //       this.setState({ maxTagCount: false })
  //     }}
  //   >
  //     bạn đã chọn {valueChannel && valueChannel.length} kênh
  //   </a>
  // )
  // search = value => {
  //   // log.group("PRODUCT SELECT INPUT")
  //   // log("search value: ", value);
  //   // const { value } = this.state;
  //   const { type } = this.props;


  //   const dataTemp = dataOrigin.filter(item => fnKhongDau(item.text).indexOf(fnKhongDau(value)) !== -1);

  //   // this.setState({ value: dataTemp });
  //   // log("search data: ", dataTemp);
  //   // log.groupEnd();
  // }
  filterTreeNode = (inputValue) => {
    // log("search filterTreeNode inputValue: %o | treeNode: %o", inputValue, treeNode);
    // const { value } = this.state;
    // log("search filterTreeNode title: %o | inputValue: %o", fn_khongdau(title), fn_khongdau(inputValue));
    const { dataOrigin } = this.state;
    const dataTemp = dataOrigin.filter(item => fnKhongDau(item.name).indexOf(fnKhongDau(inputValue)) !== -1);

    this.setState({ dataArr: dataTemp });
  }

  render() {
    // log('this props render', this.props);
    // const {
    //   form: { getFieldDecorator },

    // } = this.props;
    const { key, placeholder,
      // templates, type, places

    } = this.props;
    const { loading, value, dataArr } = this.state;
    // log(" render filter", filter)
    // let renderData;

    // // log('render value type', this.props);
    // let dataList = [];

    // switch (type) {
    //   case 1:
    //     dataList = [...templates.dataAll];
    //     break;
    //   case 2:
    //     dataList = [...places.dataAll];
    //     break;
    //   default:
    //     break;
    // }

    // eslint-disable-next-line prefer-const
    // renderData = this.renderData(dataList);
    return (
      <Select
        showSearch
        allowClear
        key={key}
        filterOption={false}
        onSearch={this.filterTreeNode}
        value={value || undefined}
        onChange={this.onChange}
        placeholder={placeholder}
        loading={loading}
      // data={renderData}
      >
        {this.renderData(dataArr)}

      </Select>

    )
  }
}
export default Index;
