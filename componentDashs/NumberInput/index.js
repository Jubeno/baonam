/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { InputNumber } from 'antd';
// import { formatNumber } from '@/utils/utils';

class NumericInput extends React.Component {
  state = {
    value: this.props.value || ''
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    if (nextProps.value !== value)
      this.setState({ value: nextProps.value })
  }

  onChange = (value) => {
    // const { value } = e.target;
    const { onChange } = this.props;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      onChange(value);
      this.setState({ value })
    }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value && value.toString().charAt(value.length - 1) === '.' || value === '-') {
      onChange(value.slice(0, -1));
      this.setState({ value: value.slice(0, -1) })
    }
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { placeholder, key, disabled, min, style } = this.props;
    // const title = value ? (
    //   <span className="numeric-input-title">
    //     {value !== '-' ? formatNumber(value) : '-'}
    //   </span>
    // ) : placeholder;

    return (
      //   <Tooltip
      //     trigger={['focus']}
      //     title={title}
      //     placement="topLeft"
      //     overlayClassName="numeric-input"
      //   >
      <InputNumber
        {...this.props}
        key={key}
        min={min}
        value={this.state.value}
        disabled={disabled}
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        onChange={this.onChange}
        onBlur={this.onBlur}
        placeholder={placeholder}
        style={style || { width: '100%' }}
        maxLength={25}
      />
      //   </Tooltip>
    );
  }
}

export default NumericInput;
