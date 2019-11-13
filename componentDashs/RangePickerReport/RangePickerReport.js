import React, { Component } from 'react';
import { DatePicker, } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;
class RangePickerAnt extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value,
    start: null,
    end: null
  }

  handleChange = (value) => {
    this.setState({
      value
    });
    const { onChange } = this.props;
    if (onChange)
      onChange(value);
  }

  handlePanelChange = (value) => {
    if (value.length === 1) {
      const dateStart = value[0].format('YYYY/MM/DD')
      const dateEnd = moment(dateStart).add(30, 'days').format('YYYY/MM/DD')

      this.setState({
        end: dateEnd,
        start: dateStart
      });
    }
    else {
      this.setState({
        start: null,
        end: null
      });
    }
  };

  disabledDate = (current) => {
    const { start, end } = this.state
    if (!start || !end) {
      return false;
    }
    return current && current.valueOf() > moment(end).valueOf() || current && current.valueOf() < moment(start).valueOf()
  }

  render() {
    const { style, placeholder, ranges } = this.props
    const { value } = this.state;
    return (
      <RangePicker
        onChange={this.handleChange}
        value={value}
        onCalendarChange={this.handlePanelChange}
        disabledDate={this.disabledDate}
        placeholder={placeholder}
        style={style}
        ranges={ranges}
      />
    );
  }
}

export default RangePickerAnt;
