/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Select, Spin, message } from 'antd';
// import { connect } from 'react-redux';
import { fnKhongDau } from '@/utils/utils';

// @connect(({ places: { dataAll } }) => ({
//   places: places
// }))
const dataFomat = (data) => data && data.map(user => ({
  text: `${user.name}`,
  value: user.id,
})) || []
class Index extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: `${this.props.value}`,
    loading: false,
    dataArr: dataFomat(this.props.result),
    dataOrigin: dataFomat(this.props.result),
    result: this.props.result
  }

  componentWillReceiveProps(nextProps) {
    const { result } = this.state;
    // console.log(groupPlaceName !== nextProps.groupPlaceName)
    if (nextProps.result !== result) {
      this.setState({
        result: nextProps.result,
        dataArr: dataFomat(nextProps.result),
        dataOrigin: dataFomat(nextProps.result),
      })
    }
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
    if (onChange)
      onChange(value);
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
    const { key, placeholder } = this.props;
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
        // style={{ maxWidth: '336px' }}
        style={{ width: '200px' }}
        loading={loading}
      >

        {dataArr.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
      </Select>
    );
  }
}

export default Index;
