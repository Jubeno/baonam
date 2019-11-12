import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'js-cookie'
import Select from '@/componentDashs/Select';
import log from '@/utils/log';
import { fnKhongDau } from '@/utils/utils';


@connect(({ groupCustomers, customers, }) => ({
  // users: dataAll,
  groupCustomers,
  customers,

}))

class FilterCustomerDepend extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value,
    loading: false,
    maxTagCount: false,

  }

  componentDidMount() {


    // log("Get all user didmount", this.props)
    const { dispatch } = this.props;
    setTimeout(() => {
      const params = {
        filter: { placesId: cookie.get("placeID") },
        sort: ["name", "ASC"]
      };



      dispatch({
        type: 'customers/fetchAll',
        payload: params,
      });
      dispatch({
        type: 'groupCustomers/fetchAll',
        payload: params,
      });
      this.setState({ loading: false });
    }, 2000);
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    // log("componentWillReceiveProps nextProps", nextProps.users)
    if (nextProps.value !== value)
      this.setState({ value: nextProps.value })

  }

  renderData = data =>
    (data || []).map(item => ({ key: `${item.id}`, value: `${item.name}` }));



  onChange = (value) => {
    if (value && value.length <= 2)
      this.setState({ maxTagCount: true })
    this.setState({
      value
    });
    // this.triggerChange({ value }); 
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }


  // triggerChange = changedValue => {
  //   // Should provide an event to pass value to Form.
  //   const { onChange } = this.props;
  //   if (onChange) {
  //     // log('')
  //     console.log('giá trị cho ô select', Object.assign({}, this.state, changedValue));
  //     onChange(Object.assign({}, this.state, changedValue));
  //   }
  // };

  renderTagPlaceHolder = (valueChannel) => {
    const { type } = this.props;
    // eslint-disable-next-line no-return-assign
    return (
      <a
        onClick={e => {
          e.preventDefault();
          this.setState({ maxTagCount: false })
        }}
      >
        bạn đã chọn {valueChannel && valueChannel.length} {type === 1 ? "nhóm khách hàng" : 'khách hàng'}
      </a>
    )
  }

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


  render() {
    const { key, placeholder, groupCustomers, customers, type, filterField } = this.props;
    const { loading, value, maxTagCount } = this.state;
    const filterField1 = filterField ? filterField.map(item => item.key) : filterField
    log(" render filter", filterField)
    let renderData;
    // log('render value type', this.props);
    let dataList = []
    const keyOption = value.map(item => item.key)
    // let filteredOptions = []

    switch (type) {
      case 1:
        if (groupCustomers.dataAll && groupCustomers.dataAll.length) {
          dataList = [...groupCustomers.dataAll]
          dataList = dataList.filter(o => !keyOption.includes(`${o.id}`))
        }
        // else {
        //   dataList.push({
        //     id: '-1',
        //     name: 'Tất cả bản ghi',
        //   })
        // }
        //  log("render filterField1 channel before",dataList )
        // if (filterField1 && filterField1.length) {
        //   dataList = dataList.filter(x => filterField1.includes(x.id))
        // }
        // log(" render filterField channel", filterField1)
        // log("render filterField1 after channel ",dataList )


        // const  filteredOptions = groupSuppliers && groupSuppliers

        renderData = this.renderData(dataList);
        break;
      case 2:
        if (customers.dataAll && customers.dataAll.length) {
          dataList = [...customers.dataAll]
          dataList = dataList.filter(o => !keyOption.includes(`${o.id}`))
        }
        // else {

        //   dataList.push({
        //     id: '-1',
        //     name: 'Tất cả bản ghi',
        //   })
        // }
        // log("render filterField1 socialaccount before",dataList )
        if (filterField1 && filterField1.length) {

          dataList = dataList.filter(x => filterField1.includes(x.groupCustomersId))
        }
        else dataList = []
        // log(" render filterField socialaccount", filterField1)
        // log("render filterField1 after socialaccount ",dataList )
        renderData = this.renderData(dataList);
        break;


      default:
        break;
    }

    const tagCountChannel = value && value.length || 0;

    // log('render renderData', renderData);
    // log("Get all user didmount", dataList)

    // const renderdata = this.renderData(dataList);
    // const data= []
    return (
      <Select
        // title="Channel"
        key={key}
        // mode="multiple"
        value={value || undefined}
        // notFoundContent={loading ? <Spin size="small" /> : null}
        onChange={this.onChange}
        // eslint-disable-next-line no-nested-ternary
        maxTagCount={maxTagCount ? (tagCountChannel > 2 ? 2 : 2) : 10000}
        maxTagPlaceholder={this.renderTagPlaceHolder(value)}
        // onKeyPress={e => this.handleKeyPress(e, record.key)}
        placeholder={placeholder}
        // style={{ width: '830px' }}
        // filterOption={this.filterOption}
        loading={loading}
        // optionLabelProp="label"
        data={renderData}
      />
    );
  }
}

export default FilterCustomerDepend;
