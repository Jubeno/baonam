/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
// import { Spin } from 'antd';
import { connect } from 'react-redux';
import { fnKhongDau } from '@/utils/utils';
import Select from '@/componentDashs/Select';

@connect(({ groupProducers: { dataAll } }) => ({
  groupProducers: dataAll || []
}))
class Index extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value,
    loading: false,
    maxTagCount: false
  }

  componentDidMount() {
    const { dispatch } = this.props;
    setTimeout(() => {
      const params = {
        filter: {
          status: true
        }
      };
      dispatch({
        type: 'groupProducers/fetchAll',
        payload: params,
      });
      this.setState({ loading: false });
    }, 2000);
    this.setState({ loading: true });
  }

  // componentWillReceiveProps(nextProps) {
  //   const { value } = this.state;
  //   if (nextProps.value !== value)
  //     this.setState({ value: `${nextProps.value}` })
  // }

  renderData = data =>
    (data || []).map(item => ({ key: `${item.id}`, value: `${item.name}` }));


  onChange = (value) => {
    if (value && value.length <= 2)
      this.setState({ maxTagCount: true })
    this.setState({
      value
    });
    const { onChange } = this.props;
    if (onChange)
      onChange(value);
  }

  filterOption = (value, option) => {
    const {
      props: { children },
    } = option;
    // log("search filterTreeNode title: %o | inputValue: %o", fn_khongdau(title), fn_khongdau(inputValue));
    if (fnKhongDau(children).indexOf(fnKhongDau(value)) !== -1) {
      return true;
    }
    return false;
  };

  renderTagPlaceHolder = (valueChannel) => (
    <a
      onClick={e => {
        e.preventDefault();
        this.setState({ maxTagCount: false })
      }}
    >
      bạn đã chọn {valueChannel && valueChannel.length} nhóm nhà sản xuất
    </a>
  )

  render() {
    const { groupProducers, key, placeholder } = this.props;
    const { loading, value, maxTagCount } = this.state;
    const tagCountType = (value && value.length) || 0;
    const keyOption = value.map(item => item.key)
    const filteredOptions = groupProducers && groupProducers.filter(o => !keyOption.includes(`${o.id}`))
    const data = this.renderData(filteredOptions || []);
    return (
      <Select
        // title="Chọn tài khoản quản lý"
        key={key}
        // showArrow
        // allowClear
        // mode="multiple"
        // labelInValue
        value={value}
        // maxTagTextLength={20}
        maxTagCount={maxTagCount ? (tagCountType > 2 ? 2 : 2) : 10000}
        maxTagPlaceholder={this.renderTagPlaceHolder(value)}
        // notFoundContent={loading ? <Spin size="small" /> : null}
        onChange={this.onChange}
        // onKeyPress={e => this.handleKeyPress(e, record.key)}
        placeholder={placeholder}
        style={{ width: '100%' }}
        // filterOption={this.filterOption}
        loading={loading}
        data={data}
      />
    );
  }
}

export default Index;