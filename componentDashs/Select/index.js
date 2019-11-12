import React, { Component } from 'react';
// import { formatMessage, setLocale, getLocale } from 'umi/locale';
import { Select, Tooltip, Spin } from 'antd';
import { fnKhongDau } from '@/utils/utils';

import styles from './index.less';

export default class TableAntd extends Component {
  state = {
    selectedItems: [],
  };

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

  handleChange = selectedItems => {
    console.log("handleChange ", selectedItems)
    this.setState({ selectedItems });
    const { onChange } = this.props;
    if (onChange)
      onChange(selectedItems)
  };

  renderOptions = data => (data || []).map(item => (
    <Select.Option value={`${item.key}`} key={item.key}>
      {item.value}
    </Select.Option>
  ));

  // eslint-disable-next-line arrow-body-style
  dropdownRender = (menuNode/* , props */) => {
    // console.log("menuNode: %o \n props: %o", menuNode, props)
    return menuNode;
  }

  render() {
    const { title, loading, showArrow, mode, labelInValue, value, maxTagTextLength, maxTagCount, maxTagPlaceholder, onChange, placeholder, data, style, ...rest } = this.props;

    let { allowClear } = this.props;
    if (allowClear) {
      allowClear = true;
    } else if (allowClear === null || allowClear === undefined || allowClear === 'undefined') {
      allowClear = true;
    } else {
      allowClear = false;
    }

    const { selectedItems } = this.state;
    // console.log("maxTagCount ", maxTagCount)
    let filteredOptions = data;
    if (mode === 'multiple')
      filteredOptions = data.filter(o => !selectedItems.map(e => e.key).includes(o.key));

    return (
      <Tooltip title={title}>
        <Select
          showArrow={showArrow || true}
          allowClear={allowClear}
          mode={mode || "multiple"}
          labelInValue={labelInValue || true}
          value={value}
          maxTagTextLength={maxTagTextLength || 20}
          maxTagCount={maxTagCount || 10000}
          maxTagPlaceholder={maxTagPlaceholder || null}
          notFoundContent={loading ? <Spin size="small" /> : null}
          onChange={this.handleChange}
          // onKeyPress={e => this.handleKeyPress(e, record.key)}
          placeholder={placeholder}
          className={styles.SelectAtnd}
          style={style}
          loading={loading}
          filterOption={this.filterOption}
          dropdownRender={this.dropdownRender}
          {...rest}
        >
          {this.renderOptions(filteredOptions)}
        </Select>
      </Tooltip>
    );
  }
}
