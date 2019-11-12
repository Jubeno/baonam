/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
import React, { Component } from 'react';
import { Select, Spin } from 'antd';
// import cookie from 'js-cookie'
// import _ from 'lodash';
// import { connect } from 'react-redux';
import { fnKhongDau } from '@/utils/utils';

// @connect(({ medicines: { dataAll } }) => ({
//   medicines: dataAll
// }))
class Index extends Component {
  state = {
    value: `${this.props.value}`,
    loading: false,
    dataSource: this.props.dataSource,
    dataArr: [],
    dataOrigin: []
  }

  componentDidMount() {
    // const { dispatch, dataSource } = this.props;
    // setTimeout(() => {
    //   const params = {
    //     filter: {
    //       status: true,
    //       placesId: cookie.get("placeID"),
    //       warehousesId: 7
    //     }
    //   };
    //   dispatch({
    //     type: 'medicines/fetchWarehouse',
    //     payload: params,
    //     callback: (result) => {
    //       // console.log("result",result.success)
    //       if (result && result.success === true) {
    //         const dataV1 = this.getFinalMedicines(dataSource, result && result.result).map(e => ({ id: e.id, retailQuantities: e.retailQuantities, coefficient: e.coefficient }));

    //         console.log("dataV1", dataV1)
    //         const data = result && result.result.map(user => ({
    //           text: `${user.barcode}-${user.name}`,
    //           value: user.id,
    //         }));
    //         this.setState({
    //           dataArr: data,
    //           dataOrigin: data
    //         })
    //       } else {
    //         message.error(result.error && result.error.messages);
    //       }
    //     }
    //   });
    //   this.setState({ loading: false });
    // }, 2000);
    // this.setState({ loading: true });
    const { dataSource } = this.state;
    this.fetch(dataSource)
  }


  componentWillReceiveProps(nextProps) {
    const { value, dataSource } = this.state;
    if (nextProps.value !== value) {
      this.setState({ value: `${nextProps.value}` })
    }
    // console.log("dataSource", dataSource)
    // console.log("nextProps.dataSource", nextProps.dataSource)
    if (nextProps.dataSource !== dataSource) {
      this.fetch(nextProps.dataSource)
      this.setState({ dataSource: nextProps.dataSource })
    }
  }

  fetch = (dataSource) => {
    const data = dataSource && dataSource.map(user => ({
      text: `${user.barcode}-${user.name}`,
      value: user.id,
    })) || []
    this.setState({
      dataArr: data,
      dataOrigin: data
    })
  }

  renderData = data =>
    // log("renderTreeNodes data: ", data)
    (data || []).map((item) => (
      <Select.Option value={`${item.value}`} key={item.value}>{item.text.trim()}</Select.Option>
    ))


  onChange = (value) => {
    this.setState({
      value
    });
    const { onChange } = this.props;
    const { dataSource } = this.state;
    let data = dataSource && dataSource.filter(item => item.id === value)
    data = data && data.length > 0 && data[0]
    if (onChange)
      onChange(value, data);
  }

  search = value => {
    // log.group("PRODUCT SELECT INPUT")
    // log("search value: ", value);
    const { dataOrigin } = this.state;
    const dataTemp = dataOrigin.filter(item => fnKhongDau(item.text).indexOf(fnKhongDau(value)) !== -1);
    this.setState({ dataArr: dataTemp });
    // log("search data: ", dataTemp);
    // log.groupEnd();
  }

  render() {
    const { key, placeholder, style } = this.props;
    const { loading, value, dataArr } = this.state;
    // console.log('dsaas',dataArr)
    // console.log("dataArr", dataArr)
    // const data = this.renderData(dataArr || []);
    return (
      <Select
        key={key}
        showSearch
        value={value || undefined}
        notFoundContent={loading ? <Spin size="small" /> : null}
        onChange={this.onChange}
        onSearch={this.search}
        filterOption={false}
        // onKeyPress={e => this.handleKeyPress(e, record.key)}
        placeholder={placeholder}
        style={style || { width: '100%' }}
        // style={{ maxWidth: '336px' }}
        // style={{ width: '830px' }}
        loading={loading}
      >

        {dataArr.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
      </Select>
    );
  }
}

export default Index;
