/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, message, Spin } from 'antd';
import log from '@/utils/log';
import { fnKhongDau } from '@/utils/utils';
// import Select from '@/componentDashs/Select';

// const FormItem = Form.Item;
@connect(({ provinces, districts, places, groupPlaces, wards, groupWebsites }) => ({
  places,
  groupPlaces,
  groupWebsites,
  wards,
  // users: dataAll,
  provinces,
  districts,
}))



class Index extends Component {
  // checkChangeProvince = false

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value,
    dataArr: [],
    dataOrigin: [],
    dataNot: [],
    loading: false,
    filterField: this.props.filterField,
    resetField: this.props.resetField,
    number: 1
  };

  componentDidMount() {
    this.fetch()
  }


  componentWillReceiveProps(nextProps) {
    const { value, filterField, resetField, number } = this.state;
    const { type, onChange, edit } = this.props;
    // console.log("nextProps.resetField %o,  resetField", nextProps.resetField, resetField)
    // console.log("nextProps.resetField !== resetField", nextProps.resetField !== resetField)
    if (type === 1 || type === 4) {
      if (nextProps.value !== value)
        this.setState({ value: nextProps.value });
    }
    else if (nextProps.filterField !== filterField || nextProps.resetField !== resetField) {
      if (filterField && (number === 2 || !edit)) {
        this.setState({ value: '' });
        onChange('')
      }
      this.changeData(nextProps.filterField, nextProps.resetField)
      this.setState({
        filterField: nextProps.filterField,
        resetField: nextProps.resetField
      })
    }
    else if (edit && filterField && number === 1 && (type === 2 || type === 3)) {
      this.fetch()
      this.setState({ number: 2 });
    }
    else if (nextProps.value !== value)
      this.setState({ value: nextProps.value });
  }

  fetch = () => {
    const { dispatch, type, filterField, resetField } = this.props;
    const params = {
      filter: {
        status: true
      }
    };
    if (type === 1) {
      dispatch({
        type: 'provinces/fetchAll',
        payload: params,
        callback: (result) => {
          if (result && result.success === true) {
            const data = result && result.result.map(user => ({
              text: `${user.name}`,
              value: user.id,
            }));
            this.setState({
              dataArr: data,
              dataOrigin: data,
              dataNot: data
            })
          } else {
            message.error(result.messages);
          }
        }
      });
    } else if (type === 2) {
      dispatch({
        type: 'districts/fetchAll',
        payload: params,
        callback: (result) => {
          if (result && result.success === true) {
            const data = result && result.result.map(user => ({
              text: `${user.name}`,
              value: user.id,
              provincesId: user.provincesId
            }));
            this.setState({
              dataNot: data
            })
            if (filterField) {
              const dataList = data.filter(x => x.provincesId === filterField);
              this.setState({
                dataArr: dataList,
                dataOrigin: dataList,
              })
            }
          } else {
            message.error(result.messages);
          }
        }
      });
    }
    else if (type === 3) {
      dispatch({
        type: 'wards/fetchAll',
        payload: params,
        callback: (result) => {
          if (result && result.success === true) {
            const data = result && result.result.map(user => ({
              text: `${user.name}`,
              value: user.id,
              districtsId: user.districtsId
            }));
            this.setState({
              dataNot: data
            })
            if (filterField && resetField) {
              const dataList = data.filter(x => x.districtsId === filterField);
              this.setState({
                dataArr: dataList,
                dataOrigin: dataList,
              })
            }
          } else {
            message.error(result.messages);
          }
        }
      });
    }
    else if (type === 4) {
      dispatch({
        type: 'groupWebsites/fetchAll',
        payload: params,
        callback: (result) => {
          if (result && result.success === true) {
            const data = result && result.result.map(user => ({
              text: `${user.name}`,
              value: user.id,
            }));
            this.setState({
              dataArr: data,
              dataOrigin: data,
              dataNot: data
            })
          } else {
            message.error(result.messages);
          }
        }
      });
    }
    else if (type === 5) {
      dispatch({
        type: 'places/fetchAll',
        payload: params,
        callback: (result) => {
          if (result && result.success === true) {
            const data = result && result.result.map(user => ({
              text: `${user.name}`,
              value: user.id,
            }));
            this.setState({
              dataArr: data,
              dataOrigin: data,
              dataNot: data
            })
          } else {
            message.error(result.messages);
          }
        }
      });
    }
  }

  changeData = (filterField, resetField) => {
    log('changeData filterField ', filterField)
    // this.fecth()
    const { type } = this.props;
    const { dataNot } = this.state
    let dataList;
    if (type === 2 && filterField) {
      // if (filterField) {
      dataList = dataNot;
      dataList = dataList.filter(x => x.provincesId === filterField);
      this.setState({
        dataArr: dataList,
        dataOrigin: dataList
      })
    }
    if (type === 3 && filterField && resetField) {
      // console.log("dsadsadsa")
      dataList = dataNot
      dataList = dataList.filter(x => x.districtsId === filterField);
      this.setState({
        dataArr: dataList,
        dataOrigin: dataList
      })
    }
  }


  onChange = (value) => {
    // log("GroupAddress onChange value: ", value)
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  search = value => {
    // log.group("PRODUCT SELECT INPUT")
    // log("search value: ", value);
    const { dataOrigin } = this.state;
    const dataTemp = dataOrigin.filter(item => fnKhongDau(item.text).indexOf(fnKhongDau(value)) !== -1);

    this.setState({ dataArr: dataTemp });
    // log("search data: ", dataTemp);
    // log.groupEnd();
  }

  render() {
    const { key, placeholder, filter } = this.props;
    const { loading, value, dataArr } = this.state;
    // log(" render filter", filter)

    // log('render value type', this.props);
    // let dataList = [];

    // switch (type) {
    //   case 1:
    //     dataList = provinces && provinces.dataAll;
    //     break;
    //   case 2:
    //     if (filterField) {
    //       dataList = districts && districts.dataAll;
    //       dataList = dataList.filter(x => x.provincesId === filterField);
    //     }
    //     break;
    //   case 3:
    //     // eslint-disable-next-line no-unused-vars
    //     if (filterField && resetField) {
    //       dataList = wards && wards.dataAll;
    //       // log("render dataList socialaccount before",dataList )
    //       // const filterField1 = filterField ? filterField.map(item => item.key) : filterField;
    //       dataList = dataList.filter(x => x.districtsId === filterField);
    //     }
    //     // log(" render filterField socialaccount", filterField1)
    //     // log("render filterField1 after socialaccount ",dataList )
    //     // eslint-disable-next-line prefer-const
    //     break;
    //   case 4:
    //     dataList = groupWebsites && groupWebsites.dataAll
    //     break;
    //   case 5:
    //     dataList = places && places.dataAll
    //     break;
    //   default:
    //     break;
    // }
    // eslint-disable-next-line prefer-const

    return (
      <Select
        allowClear={!!filter}
        showSearch
        key={key}
        onSearch={this.search}
        notFoundContent={loading ? <Spin size="small" /> : null}
        value={value || undefined}
        onChange={this.onChange}
        filterOption={false}
        placeholder={placeholder}
        loading={loading}
      // data={renderData}
      >
        {dataArr.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
      </Select>

    )
  }
}
export default Index
