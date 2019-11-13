/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import classNames from 'classnames';
import stylesLess from './index.less';
import 'react-quill/dist/quill.snow.css';

export default class RichTextInput extends Component {
  static defaultProps = {
    options: {},
    toolbar: true,
    fullWidth: true,
  };

  onTextChange = (value) => {
    // this.setState({ value })
    // console.log("TextEditor => onTextChange => value: ", value)
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    // console.log("TextEditor => render => valueText: ", this.props.valueText)
    const { className, style, valueText } = this.props;
    const styleEditor = {
      ...style,
      background: '#ffffff',
    };
    const clsString = classNames(stylesLess.myTextEditor, className);
    return (
      <ReactQuill
        className={clsString}
        style={styleEditor}
        value={valueText}
        onChange={this.onTextChange}
      />
    );
  }
}
