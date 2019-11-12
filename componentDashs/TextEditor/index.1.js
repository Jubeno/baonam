/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import Quill from 'quill';
import classNames from 'classnames';
import stylesLess from './index.less';
import 'quill/dist/quill.snow.css';

export default class RichTextInput extends Component {
  state = {
    // value: '',
  };

  static defaultProps = {
    options: {},
    toolbar: true,
    fullWidth: true,
  };

  componentDidMount() {
    // const { valueText } = this.state;
    const { toolbar, valueText } = this.props;

    this.quill = new Quill(this.divRef, {
      modules: { toolbar },
      theme: 'snow',
    });
    // console.log("mount texteditor value %o \nprops: %o", this.props["data-__meta"], this.props["data-__meta"].initialValue);
    // this.quill.setContents(this.quill.clipboard.convert(valueText));
    this.editor = this.divRef.querySelector('.ql-editor');
    this.quill.on('text-change', debounce(this.onTextChange, 500));
  }

  /* componentWillUpdate(nextProps){
    console.log("TextEditor => componentWillUpdate => nextProps: %o ||| this.props: %o", nextProps.valueText, this.props.valueText);
    if (nextProps.valueText !== this.props.valueText) {
      console.log("TextEditor => componentWillUpdate => nextProps.valueText !== this.props.valueText ? ", nextProps.valueText !== this.props.valueText)
      this.quill.setContents(this.quill.clipboard.convert(nextProps.valueText));
    }
  } */

  componentWillUnmount() {
    this.quill.off('text-change', this.onTextChange);
    this.quill = null;
  }

  onTextChange = () => {
    const value = this.editor.innerHTML === '<p><br></p>' ? '' : this.editor.innerHTML;
    // console.log("TextEditor => onTextChange => value: ", value)
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  updateDivRef = ref => {
    this.divRef = ref;
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
      <div style={styleEditor}>
        <div className={clsString} ref={this.updateDivRef}>
          <p>{valueText}</p>
        </div>
      </div>
    );
  }
}
