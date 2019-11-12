/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { TreeSelect, Spin } from 'antd';
import cookie from 'js-cookie'
import { connect } from 'react-redux';
import { fnKhongDau } from '@/utils/utils';
// import log from '@/utils/log';

const { TreeNode } = TreeSelect;

@connect(({ groupMedicines: { dataAll } }) => ({
  groupMedicines: dataAll
}))
class Index extends Component {
  state = {
    value: this.props.value,
    sitesId: `${this.props.sitesId}`,
    loading: false,
    maxTagCount: false
  }

  componentDidMount() {
    this.fetch();
  }


  fetch = () => {
    const { dispatch } = this.props;
    let params = {
      filter: {
        placesId: cookie.get("placeID")
      }
    };
    const { filter } = params;
    params = {
      filter: JSON.stringify(filter)
    }
    dispatch({
      type: 'groupMedicines/fetchAll',
      payload: params,
    });
  }

  renderTreeNodes = data =>
    // log("renderTreeNodes data: ", data)
    data.map((item) => {
      if (item && item.children) {
        return (
          <TreeNode value={item.id} title={item.name && item.name.trim()} key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      if (item)
        return <TreeNode value={item.id} title={item.name && item.name.trim()} key={item.id} />;
      return null;
    })
    ;

  onChange = (value) => {
    // console.log("onchange value", value)
    if (value && value.length <= 2)
      this.setState({ maxTagCount: true })
    this.setState({ value });
    const { onChange } = this.props;

    if (onChange)
      // log('dhsh')
      onChange(value);
  }

  filterTreeNode = (inputValue, treeNode) => {
    // log("search filterTreeNode inputValue: %o | treeNode: %o", inputValue, treeNode);
    const { props: { title } } = treeNode;
    // log("search filterTreeNode title: %o | inputValue: %o", fn_khongdau(title), fn_khongdau(inputValue));
    if (fnKhongDau(title).indexOf(fnKhongDau(inputValue)) !== -1) {
      return true;
    }
    return false;
  }

  renderTagPlaceHolder = (valueChannel) =>
    // log('valueChannel', valueChannel)
    (
      <a
        onClick={e => {
          // log('bdj')
          e.preventDefault();
          this.setState({ maxTagCount: false })
        }}
      >
        bạn đã chọn {valueChannel && valueChannel.length} nhóm thuốc
      </a>
    )


  render() {
    const { groupMedicines, idCategory, haveParent, placeholder, style } = this.props;
    const { loading, value, maxTagCount } = this.state;
    const tagCountType = (value && value.length) || 0;
    let arr = groupMedicines && groupMedicines.list
    if (idCategory) {
      arr = groupMedicines && groupMedicines.list && groupMedicines.list.filter(item => item.id !== idCategory)
    }
    // log('render value', this.props)
    const data = this.renderTreeNodes(arr || []);
    // log("groupMedicineselect render props: ", this.props)
    return (
      <TreeSelect
        // dropdownStyle={{ overflowX: 'hidden' }}
        multiple
        dropdownMatchSelectWidth
        placeholder={placeholder}
        value={value}
        notFoundContent={loading ? <Spin size="small" /> : null}
        filterOption={false}
        showSearch
        filterTreeNode={this.filterTreeNode}
        onChange={this.onChange}
        // eslint-disable-next-line no-nested-ternary
        maxTagCount={maxTagCount ? (tagCountType > 2 ? 2 : 2) : 10000}
        maxTagPlaceholder={() => this.renderTagPlaceHolder(value)}
        // onSearch={this.search}
        // onKeyPress={e => this.handleKeyPress(e, record.key)}
        style={style || { width: '100%' }}
        loading={loading}
      // {...rest}
      >
        {!haveParent ?
          <TreeNode value="0" title="Nhóm thuốc cha" key="0">
            {data}
          </TreeNode> : data}
      </TreeSelect>
    );
  }
}

export default Index;