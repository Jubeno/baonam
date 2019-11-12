/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Select, Spin, message } from 'antd';
import { connect } from 'react-redux';
import { fnKhongDau } from '@/utils/utils';

@connect(({ groupPlaces: { dataAll } }) => ({
  groupPlaces: dataAll
}))
class Index extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: `${this.props.value}`,
    loading: false,
    dataArr: [],
    dataOrigin: [],
    groupPlaceName: this.props.groupPlaceName
  }

  componentDidMount() {
    this.fetch()
  }


  componentWillReceiveProps(nextProps) {
    const { value, groupPlaceName } = this.state;
    // console.log(groupPlaceName !== nextProps.groupPlaceName)
    if (nextProps.value !== value) {
      this.setState({ value: `${nextProps.value}` })
    }
    else if (groupPlaceName !== nextProps.groupPlaceName) {
      this.fetch()
    }
  }

  fetch = () => {
    const { dispatch } = this.props;
    setTimeout(() => {
      const params = {
        filter: {
          status: true
        }
      };
      dispatch({
        type: 'groupPlaces/fetchAll',
        payload: params,
        callback: (result) => {
          // console.log("result",result.success)
          if (result && result.success === true) {
            const data = result && result.result.map(user => ({
              text: `${user.name}`,
              value: user.id,
            }));
            this.setState({
              dataArr: data,
              dataOrigin: data
            })
          } else {
            message.error(result.messages);
          }
        }
      });
      this.setState({ loading: false });
    }, 2000);
    this.setState({ loading: true });

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
        // style={{ width: '830px' }}
        loading={loading}
      >

        {dataArr.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
      </Select>
    );
  }
}

export default Index;
