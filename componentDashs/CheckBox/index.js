import React, { Component } from 'react';
import { Checkbox } from 'antd';

class CheckBox extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value
  }

  onCheckedChange = (e) => {
    const { onChange, cell, row, name } = this.props;
    this.setState({ value: e.target.checked })
    if(onChange){
      onChange(e, name, cell, row)
    }
  }

  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <Checkbox checked={value} onChange={this.onCheckedChange} />
      </React.Fragment>
    );
  }
}

export default CheckBox;