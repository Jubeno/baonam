/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react';

const sanitizeRestProps = ({
  onChange,
  value,
  ...rest
}) => rest

class TextArea extends Component {
  constructor(props) {
    super(props);

    const { value } = props;
    this.state = {
      value
    }
  }

  onTextChange = (e) => {
    const { value } = e.target;
    // console.log("TextArea value: ", value)
    const dataValue = value;
    // const dataValue = value.replace(/\\n/g, '\n').trim();
    // console.log("TextArea dataValue: ", dataValue)
    this.setState({ value: dataValue })
    const { onChange } = this.props;
    if (onChange) {
      onChange(dataValue);
    }
  }

  render() {
    const { style } = this.props;
    const newStyle = {
      ...style,
      color: "rgba(0, 0, 0, 0.65)",
      padding: "4px 11px",
      lineHeight: "initial",
      fontSize: "12px",
      // fontFamily: "consolas",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol",
      border: "1px solid #d9d9d9",
      borderRadius: "2px",
      transition: "all 0.3s",
      width: '100%',
      maxWidth: '100%'
    }
    const { value } = this.state;
    return (
      <textarea
        {...sanitizeRestProps(this.props)}
        onChange={(e) => this.onTextChange(e)}
        style={newStyle}
      >{value}</textarea>
    );
  }
}

export default TextArea;