/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { TreeSelect, Spin } from 'antd';
import cookie from 'js-cookie'
import { connect } from 'react-redux';
import { fnKhongDau } from '@/utils/utils';
import log from '@/utils/log';

const { TreeNode } = TreeSelect;

@connect(({ groupMedicines: { dataAll } }) => ({
  groupMedicines: dataAll
}))
class groupMedicineselect extends Component {
  state = {
    value: `${this.props.value}`,
    sitesId: `${this.props.sitesId}`,
    loading: false,
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
    this.setState({ value });
    const { onChange } = this.props;

    if (onChange)
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

  render() {
    const { key, groupMedicines, idCategory, haveParent, placeholder, ...rest } = this.props;
    const { loading, value } = this.state;
    let arr = groupMedicines && groupMedicines.list
    if (idCategory) {
      arr = groupMedicines && groupMedicines.list && groupMedicines.list.filter(item => item.id !== idCategory)
    }
    const data = this.renderTreeNodes(arr || []);
    // log("groupMedicineselect render props: ", this.props)
    return (
      <TreeSelect
        key={key}
        style={{ width: '100%' }}
        placeholder={placeholder}
        value={value}
        notFoundContent={loading ? <Spin size="small" /> : null}
        filterOption={false}
        showSearch
        filterTreeNode={this.filterTreeNode}
        onChange={this.onChange}
        onSearch={this.search}
        // onKeyPress={e => this.handleKeyPress(e, record.key)}
        // style={{ width: '830px' }}
        loading={loading}
        {...rest}
      >
        {!haveParent ?
          <TreeNode value="0" title="Nhóm thuốc cha" key="0">
            {data}
          </TreeNode> : data}
      </TreeSelect>
    );
  }
}

export default groupMedicineselect;