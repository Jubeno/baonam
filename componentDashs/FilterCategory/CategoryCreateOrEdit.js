/* eslint-disable no-self-compare */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { TreeSelect, Spin } from 'antd';
import { connect } from 'react-redux';
import { fnKhongDau } from '@/utils/utils';
// import log from '@/utils/log';

const { TreeNode } = TreeSelect;

@connect(({ categories: { dataAll } }) => ({
  categories: dataAll
}))
class categorieselect extends Component {
  state = {
    value: `${this.props.value}`,
    sitesId: this.props.sitesId,
    loading: false,
    sitesIdChange: false
  }

  componentDidMount() {
    // console.log("categorieselect didmount props: ", this.props)
    this.fetch();
  }

  componentDidUpdate() {
    // console.log("categorieselect didupdate props: ", this.state);
    const { sitesIdChange } = this.state;
    if (sitesIdChange)
      this.fetch();
  }

  static getDerivedStateFromProps(nextProps, preState) {
    // const { multiple } = this.props
    // console.log("nextProps.multiple", nextProps.value !== preState.value)
    if (`${nextProps.value}` !== preState.value || `${nextProps.sitesId}` !== preState.sitesId) {
      return {
        value: `${nextProps.value}`,
        sitesId: `${nextProps.sitesId}`,
        sitesIdChange: true
      };
    }
    return null;
  }

  fetch = () => {
    const { dispatch, sitesId, checkParent } = this.props;
    let params = {
      filter: {}
    };

    if (sitesId) {
      const { filter } = params;
      params = {
        filter: {
          ...filter,
          sitesId
        }
      };
    }
    if (checkParent) {
      const { filter } = params;
      params = {
        filter: {
          ...filter,
          status: true
        }
      }
    }
    // const { filter } = params;
    // params = {
    //   filter: JSON.stringify(filter)
    // }

    dispatch({
      type: 'categories/fetchAll',
      payload: params,
    });
    this.setState({ sitesIdChange: false })
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
    const { categories, idCategory, checkParent, ...rest } = this.props;
    const { loading, value } = this.state;
    let arr = categories && categories.list
    if (idCategory) {
      arr = categories && categories.list && categories.list.filter(item => item.id !== idCategory)
    }
    const data = this.renderTreeNodes(arr || []);
    // const data = this.renderTreeNodes(categories && categories.list || []);
    // console.log("categorieselect render props: ", this.props)
    return (
      <TreeSelect
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
        {!checkParent ?
          <TreeNode value="0" title="Chuyên mục cha" key="0">
            {data}
          </TreeNode> : data
        }
      </TreeSelect>
    );
  }
}

export default categorieselect;