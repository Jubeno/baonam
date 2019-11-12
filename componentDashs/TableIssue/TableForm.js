/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-shadow */
/* eslint-disable dot-notation */
import React, { PureComponent, Fragment } from 'react';
import {
  Card,
  Form,
  Table,
  Button,
  Input,
  message,
  Popconfirm,
  Divider,
  Select,
  InputNumber,
  Row,
  Col,
  Modal,
  Checkbox,
  Tooltip
} from 'antd';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import _ from 'lodash';
import { /* defineMessages, */ injectIntl, FormattedMessage } from 'react-intl';
import cookie from 'js-cookie'
import NumberInput from '@/componentDashs/NumberInput'
import UnitsSelect from '@/componentDashs/FilterMedicines/UnitsSelect';
import PakgateSelect from '@/componentDashs/FilterMedicines/PakgateSelect';
import MedicineWarehouse from '@/componentDashs/FilterMedicines/MedicineWarehouse';
// import log from '@/utils/log';
import { formatNumber } from '@/utils/utils';

const FormItem = Form.Item;

const styles = {
  card: {
    marginBottom: "24px"
  },
  heading: {
    "fontSize": "14px",
    "lineHeight": "22px",
    "margin": "0 0 16px 0",
  },
  errorIcon: {
    cursor: 'pointer',
    color: "red",
    marginRight: "24px",
  },
  i: {
    marginRight: "4px",
  },
  errorPopover: {
    padding: '0',
    maxHeight: "290px",
    overflow: 'auto',
    minWidth: '256px'
  },
  errorListItem: {
    listStyle: 'none',
    borderBottom: '1px solid #ccc',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      background: 'yellow'
    },
    '&:lastChild': {
      border: 0
    },
  },
  errorField: {
    fontsize: '12px',
    color: 'red',
    marginTop: '2px',
  },
  editable: {
    '&: td': {
      paddingTop: '13px !important',
      paddingBottom: '12.5px !important'
    }
  },
  optional: {
    color: 'grey',
    fontStyle: 'normal'
  }
}

// const CreateForm = Form.create()(props => {
//   const { modalVisible, form, handleAdd, handleModalVisible } = props;
//   const okHandle = () => {
//     form.validateFields((err, fieldsValue) => {
//       log("TableForm => CreateForm +> okHandle +> validateFields => err %o | fieldsValue: %o", err, fieldsValue)
//       if (err) return;
//       form.resetFields();
//       handleAdd(fieldsValue);
//     });
//   };
//   return (
//     <Modal
//       destroyOnClose
//       title="Thêm nhanh sản phẩm"
//       visible={modalVisible}
//       onOk={okHandle}
//       onCancel={() => handleModalVisible()}
//     >
//       <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="Danh mục">
//         {form.getFieldDecorator('CategoryID', {
//           rules: [{ required: true, message: 'Bạn chưa chọn danh mục' }],
//         })(<CategoryProductSelect placeholder="Danh mục" />)}
//       </FormItem>
//       <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="Nhà cung cấp">
//         {form.getFieldDecorator('SupplierID', {
//           rules: [{ required: true, message: 'Bạn chưa chọn nhà cung cấp' }],
//         })(<SupplierProductSelect placeholder="Nhà cung cấp" />)}
//       </FormItem>
//       <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="Tên sản phẩm">
//         {form.getFieldDecorator('ProductName', {
//           rules: [{ required: true, message: 'Tên sản phẩm chưa có', min: 5 }],
//         })(<Input
//           placeholder="Tên sản phẩm"
//           style={{ width: '250px' }} />)}
//       </FormItem>
//       <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="Giá">
//         {form.getFieldDecorator('Price', {
//           rules: [{ required: true, message: 'Bạn chưa nhập giá SP' }],
//         })(<InputNumber
//           placeholder="Giá"
//           min={0}
//           max={1000000000}
//           style={{ width: '250px' }}
//           formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />)}
//       </FormItem>
//     </Modal>
//   );
// });

const EditableContext = React.createContext();

const EditableRow = ({ form, index, editing, ...props }) =>
  // log("EditableRow props: ", editing)
  editing ? (
    <EditableContext.Provider value={form}>
      <tr>
        <td colSpan='12'>
          <Row {...props} />
        </td>
      </tr>
    </EditableContext.Provider>
  ) :
    (
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    )
  ;

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <React.Fragment>
              {!editing ? (<td {...restProps}>
                {restProps.children}
              </td>) : (
                  <React.Fragment>
                    {index === 0 ? (
                      <Col sm={24} xs={24} style={{ padding: '5px' }}>Loại bán lẻ: &nbsp;{restProps.children}</Col>
                    ) : ''}
                    {index === 2 ? (
                      <Col sm={12} xs={24} style={{ padding: '5px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Tên thuốc: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 3 ? (
                      <Col sm={12} xs={24} style={{ padding: '5px' }}><Col span={24}>Đơn vị tính: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 4 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Số lượng: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 5 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Giá: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 6 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px' }}><Col span={24}>Giảm giá: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 7 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px' }}><Col span={24}>Thành tiền: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 8 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Liều/ngày: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 9 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;SL/lượt uống: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 11 ? (
                      <Col sm={12} xs={24} style={{ padding: '5px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Đường dùng: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 10 ? (
                      <Col sm={24} xs={24} style={{ padding: '5px' }}>{restProps.children}</Col>
                    ) : ''}
                  </React.Fragment>

                )}
            </React.Fragment>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
@injectIntl
@connect(({ medicines: { dataWarehouse } }) => ({
  medicines: dataWarehouse
}))
class TableForm extends PureComponent {
  index = -9999;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      editingKey: '',
      data: props.value,
      dataSource: props.dataSource || [],
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
      warehousesDetail: props.warehousesDetail,
      visible: false,
      modalVisible: false,
      updateModalVisible: false,
      buttonNew: false,
      highlight1: false,
      highlight2: false,
      highlight3: false,
      highlight4: false,
      highlight5: false,
      highlight6: false,
      highlight7: false,
      dataOrigin: [],
      provincesIdChange: false
    };
  }

  componentDidMount() {
    const { dataSource, warehousesDetail } = this.state
    this.fetch(dataSource, warehousesDetail)
  }

  componentDidUpdate() {
    const { provincesIdChange, dataSource, warehousesDetail } = this.state;
    if (provincesIdChange) {
      this.fetch(dataSource, warehousesDetail)
    }
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    // console.log("nextProps.value", nextProps.value)
    return {
      warehousesDetail: nextProps.warehousesDetail,
      dataSource: nextProps.dataSource,
      data: nextProps.value,
      value: nextProps.value,
      provincesIdChange: true
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => Number(item.id) === Number(key))[0];
  }

  fetch = (dataSource, warehousesDetail) => {
    const { dispatch } = this.props;
    const params = {
      filter: {
        status: true,
        placesId: cookie.get("placeID"),
        warehousesId: warehousesDetail
      }
    };
    if (warehousesDetail !== '') {
      // console.log("dispatch", dispatch)
      dispatch({
        type: 'medicines/fetchWarehouse',
        payload: params,
        callback: (result) => {
          // console.log("result", result)
          this.setState({
            provincesIdChange: false
          })
          if (result && result.success === true) {
            const dataV1 = this.getFinalMedicines(dataSource, result && result.result)
            // console.log("dataV1", dataV1)
            this.setState({
              dataOrigin: dataV1
            })
          } else {
            message.error(result.error && result.error.messages);
          }

        }
      });
    }
  }

  getFinalMedicines = (issueDetail, medicines) => {
    const issueDetails = issueDetail && issueDetail.map(e => {
      const coefficient = parseInt(e.medicines.packages.quantities);
      const quantities = parseInt(e.quantities);
      const retailQuantities = (e.isRetail && quantities) || (quantities * coefficient);

      return { ...e.medicines, coefficient, retailQuantities }
    }) || []

    const medicine = medicines && medicines.map(e => ({ ...e, retailQuantities: parseInt(e.retailQuantities), coefficient: parseInt(e.coefficient) })) || []

    return _.reduce(issueDetails.concat(medicine).reduce((r, e) => {
      r[e.id] && (r[e.id].retailQuantities += e.retailQuantities) || (r[e.id] = e);

      return r;
    }, {}), (result, value) => {
      result.push(value);

      return result;
    }, []);
  }

  toggleEditable = (e, key, value) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item, editable: false }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      if (value) {
        target.editable = false
      }
      else {
        target.editable = true
      }
      this.setState({ data: newData, editingKey: key, buttonNew: true });
    }
  };

  newMember = () => {
    const { data, buttonNew } = this.state;
    // const { goodsIssuesId } = this.props
    const newData = data && data.map(item => ({ ...item, editable: false })) || [];
    // log("TableForm => newMemeber => warehouseExportId: ", goodsIssuesId)
    newData.push({
      id: `${this.index}`,
      // goodsIssuesId,
      medicinesId: '',
      medicines: {
        name: '',
        barcode: ''
      },
      duongDung: '',
      dosePerDay: undefined,
      price: undefined,
      quantities: undefined,
      quantitiesPerTime: undefined,
      placesId: undefined,
      total: undefined,
      isRetail: false,
      unitsId: '',
      units: {
        name: ''
      },
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData, buttonNew: true });

  };

  newProduct = product => {
    const { data } = this.state;
    const { warehouseExportId } = this.props
    const newData = data.map(item => ({ ...item, editable: false }));
    newData.push({
      id: `${this.index}`,
      Price: 0,
      ProductId: product.id,
      QuantityReal: 0,
      QuantityVoucher: 0,
      SupplierId: product.SupplierID,
      CategoryId: product.CategoryID,
      WarehouseExportId: warehouseExportId,
      UnitId: undefined,
      Unit: {},
      Product: {
        ...product
      },
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  handleFieldChange = (value, fieldName, key, dataSelect, record) => {
    // log.group("TABLE FORM handleFieldChange");
    // log("value %o, fieldName %o, key %o this.state %o", value, fieldName, key, this.state);
    const { data } = this.state;
    const newData = data && data.map(item => ({ ...item })) || [];
    const target = this.getRowByKey(key, newData);
    if (target) {
      let medicinesData = record && record.medicines
      // console.log("record", record)
      target[fieldName] = value;
      if (fieldName === "medicinesId") {
        medicinesData = dataSelect
        target["medicinesId"] = value;
        target["medicines"] = medicinesData
        // target["medicines"].barcode = medicinesData && medicinesData.barcode;
        if (target['isRetail']) {
          target["units"].name = medicinesData && medicinesData.packages && medicinesData.packages.units && medicinesData.packages.units.name;
          target["unitsId"] = medicinesData && medicinesData.packages && medicinesData.packages.unitsId;
          target["price"] = Number(medicinesData && medicinesData.retailPrice);
        }
        else {
          target["units"].name = medicinesData && medicinesData.packages && medicinesData.packages.wholesaleUnits && medicinesData.packages.wholesaleUnits.name;
          target["unitsId"] = medicinesData && medicinesData.packages && medicinesData.packages.wholesaleUnitsId;
          target["price"] = Number(medicinesData && medicinesData.wholesalePrice);
        }
      }
      if (fieldName === "duongDung") {
        target["duongDung"] = value.target.value
      }
      if (fieldName === "isRetail") {
        // console.log("medicines", medicinesData)
        target["isRetail"] = value.target.checked
        // const medicines = record && record.record
        if (target['isRetail']) {
          target["units"].name = medicinesData && medicinesData.packages && medicinesData.packages.units && medicinesData.packages.units.name || '';
          target["unitsId"] = medicinesData && medicinesData.packages && medicinesData.packages.unitsId || '';
          target["price"] = Number(medicinesData && medicinesData.retailPrice) || undefined;
        }
        else {
          target["units"].name = medicinesData && medicinesData.packages && medicinesData.packages.wholesaleUnits && medicinesData.packages.wholesaleUnits.name || '';
          target["unitsId"] = medicinesData && medicinesData.packages && medicinesData.packages.wholesaleUnitsId || '';
          target["price"] = Number(medicinesData && medicinesData.wholesalePrice) || undefined;
        }
      }
      if (fieldName === "quantities" || fieldName === "price" || fieldName === "discounts") {
        target["total"] = Number(target["quantities"] || 0) * Number(target["price"] || 0) - Number(target["discounts"] || 0)
      }
      if (target['discounts']) {
        this.setState({
          highlight4: false
        });
      }
      this.setState({
        loading: false,
        highlight7: !target.duongDung,
        highlight1: !target.medicinesId,
        highlight2: !target.quantities,
        highlight3: !target.price,
        highlight5: !target.dosePerDay,
        highlight6: !target.quantitiesPerTime,
      });
      // console.log("sá", target["total"])
      this.setState({ data: newData });
    }

    // if (fieldName === "CategoryId") {
    //   this.setState({ categoryId: value });
    // }
    // if (fieldName === "SupplierId") {
    //   this.setState({ supplierId: value });
    // }
    // log.groupEnd();
  }


  handleAdd = fields => {
    const record = {
      Adresses: "",
      CountdownTimes: 0,
      CreateDate: new Date(),
      DeadlineDate: new Date(),
      DealPrice: 0,
      HighlightInformation: "",
      Likes: 0,
      ProductImage: "",
      ProductInformation: "",
      Quantities: 0,
      Ratings: 0,
      SavePrice: 0,
      ScreenShots: null,
      Shares: 0,
      Status: 2,
      TermsOfUse: "",
      Type: 0,
      Views: 0,
      ...fields
    }
    // createProduct(record).then(results => {
    //   log("TableForm => handleAdd => createProduct => results: ", results);
    //   const { status, json } = results;
    //   if (status === 200) {
    //     message.success('Thêm thành công!');
    //     this.newProduct(json);
    //   } else {
    //     message.success('Thêm thất bại!');
    //   }

    //   this.handleModalVisible();
    // });
  };


  // getDataCheckQuatity = (key) => {
  //   const { dataOrigin, data } = this.state
  //   let datav2 = data && data.filter((item) => Number(item.id) !== Number(key)) || []
  //   datav2 = datav2.map(e => {
  //     const coefficient = parseInt(e.medicines.packages.quantities);
  //     const quantities = parseInt(e.quantities);
  //     const retailQuantities = (e.isRetail && quantities) || (quantities * coefficient);

  //     return { ...e.medicines, coefficient, retailQuantities }
  //   });

  //   const datav3 = dataOrigin.map(e => ({ ...e, retailQuantities: parseInt(e.retailQuantities), coefficient: parseInt(e.coefficient) }))
  //   // console.log('datav3 %o,datav2 ', datav3, datav2)
  //   return _.reduce(datav3.concat(datav2).reduce((r, e) => {
  //     r[e.id] && (r[e.id].retailQuantities -= e.retailQuantities) || (r[e.id] = e);

  //     return r;
  //   }, {}), (result, value) => {
  //     result.push(value);

  //     return result;
  //   }, []);
  // }

  getDataCheckQuatity = (key) => {
    const state = _.cloneDeep(this.state);
    const { dataOrigin: _dataOrigin, data: _data } = state;
    // console.log("dataOrigin %o, data ", dataOrigin, data)
    // const datav2 = data.map(e => {
    //   const coefficient = parseInt(e.medicines.packages.quantities);
    //   const quantities = parseInt(e.quantities);
    //   const retailQuantities = (e.isRetail && quantities) || (quantities * coefficient);
    //   return { ...e.medicines, coefficient, retailQuantities }
    // })
    //   .reduce((r, e) => {
    //     r[e.id] && (r[e.id].retailQuantities += e.retailQuantities) || (r[e.id] = e);
    //     return r;
    //   }, {});
    // const datav3 = dataOrigin.reduce((r, e) => {
    //   r[e.id] && 1 || (r[e.id] = e);
    //   return r;
    // }, {});
    // const datav4 = _.reduce(datav2, (r, v, k) => {
    //   datav3[v.id] && (v.retailQuantities -= datav3[v.id].retailQuantities) || (v.retailQuantities = -v.retailQuantities);
    //   r.push(v);
    //   return r;
    // }, []);
    // console.log("datav4", datav4)
    // return _.reduce(datav2, (r, v, k) => {
    //   datav3[v.id] && (v.retailQuantities -= datav3[v.id].retailQuantities) || (v.retailQuantities = -v.retailQuantities);
    //   r.push(v);
    //   return r;
    // }, []);
    const dataOrigin = _.cloneDeep(_dataOrigin);
    const data = _.cloneDeep(_data);
    let datav2 = data && data.filter((item) => Number(item.id) !== Number(key)) || []
    datav2 = datav2.map(e => {
      const coefficient = parseInt(e.medicines.packages.quantities);
      const quantities = parseInt(e.quantities);
      const retailQuantities = (e.isRetail && quantities) || (quantities * coefficient);
      return { ...e.medicines, coefficient, retailQuantities }
    }).reduce((r, e) => {
      r[e.id] && (r[e.id].retailQuantities += e.retailQuantities) || (r[e.id] = e);
      return r;
    }, {});
    // console.log("datav2 %o,dataOrigin", datav2, dataOrigin)
    // const datav3 = dataOrigin.reduce((r, e) => {
    //   r[e.id] && 1 || (r[e.id] = e);
    //   return r;
    // }, {});
    return (
      dataOrigin && dataOrigin.map((v) => {
        datav2[v.id] && (v.retailQuantities -= datav2[v.id].retailQuantities)
        return v;
      }) || []);
  }

  // isEditing = record => record.key === this.state.editingKey;
  isEditing = record => record.editable;

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    const dataChecked = this.getDataCheckQuatity(key)
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.medicinesId ||
        !target.dosePerDay ||
        !target.quantities ||
        !target.price ||
        // !target.discounts ||
        !target.quantitiesPerTime) {
        message.error('Vui lòng nhập đầy đủ thông tin chi tiết phiếu');
        e.target.focus();
        this.setState({
          loading: false,
          highlight1: !target.medicinesId,
          highlight2: !target.quantities,
          highlight3: !target.price,
          highlight7: !target.duongDung,
          highlight5: !target.dosePerDay,
          highlight6: !target.quantitiesPerTime,
        });
        return;
      }
      if (target.total < 0) {
        message.error('Vui lòng nhập giảm giá nhỏ hơn tổng tiền');
        e.target.focus();
        this.setState({
          loading: false,
          highlight4: true,
        });
        return;
      }
      const checked = dataChecked && dataChecked.find(item => Number(item.id) === Number(target.medicinesId))
      if (target.isRetail && checked.retailQuantities < target.quantities) {
        message.error(`Vui lòng nhập lại số lượng, ${checked.name} trong kho chỉ còn ${checked.retailQuantities} ${target.units && target.units.name}`);
        e.target.focus();
        this.setState({
          loading: false,
          highlight2: true,
        });
        return;
      }
      if (!target.isRetail && (checked.retailQuantities / checked.coefficient) < target.quantities) {
        message.error(`Vui lòng nhập lại số lượng, ${checked.name} trong kho chỉ còn ${Math.floor(checked.retailQuantities / checked.coefficient)} ${target.units && target.units.name}`);
        e.target.focus();
        this.setState({
          loading: false,
          highlight2: true,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key, 1);
      const { data } = this.state
      const { onChange } = this.props;
      onChange(data);
      this.setState({
        loading: false,
        editingKey: '',
        buttonNew: false
      });
    }, 500);
  }

  cancel(e, key) {
    // console.log("dsa",key) 
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data && data.map(item => ({ ...item })) || [];
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({
      data: newData,
      buttonNew: false,
      highlight1: false,
      highlight2: false,
      highlight3: false,
      highlight4: false,
      highlight5: false,
      highlight6: false,
      highlight7: false
    });
    this.clickedCancel = false;
  }

  // handleModalVisible = flag => {
  //   this.setState({
  //     modalVisible: !!flag,
  //   });
  // };


  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => Number(item.id) !== Number(key));
    this.setState({
      data: newData,
      buttonNew: false,
      highlight1: false,
      highlight2: false,
      highlight3: false,
      highlight4: false,
      highlight5: false,
      highlight6: false,
      highlight7: false
    });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  render() {
    const { loading, data, categoryId, supplierId, modalVisible, buttonNew, highlight1, highlight2, highlight3, highlight4, highlight5, highlight6, highlight7, dataOrigin } = this.state;
    const { classes, record, warehouseId } = this.props;
    const dataArr = data && data.map((item) => {
      const total = Number(item.price || 0) * Number(item.quantities || 0) - Number(item.discounts || 0)
      return {
        ...item,
        total
      }
    }) || []
    let total = dataArr.length > 0 && dataArr.map((item) => Number(item.price || 0) * Number(item.quantities || 0) - Number(item.discounts || 0)) || 0
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    total = total === 0 ? 0 : total.reduce(reducer)
    dataArr.push({
      isRetail: "1",
      total
    })
    // console.log("dataOrigin", dataOrigin)
    const columns = [
      {
        title: 'Loại bán lẻ',
        dataIndex: 'isRetail',
        key: 'isRetail',
        // width: '20%',
        render: (text, record, index) => {
          const obj = {
            children: <h3 style={{ textAlign: 'center' }}>Khách hàng phải trả</h3>,
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 7;
            return obj;
          }
          if (record.editable) {
            return <Checkbox checked={text} onChange={value => this.handleFieldChange(value, 'isRetail', record.id, {}, record)} />
          }
          return <Checkbox checked={text} disabled />;
        },
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: 'medicines.barcode',
          title: 'Loại bán lẻ',
          editing: this.isEditing(record),
          index: 0
        }),
      },
      {
        title: 'Mã thuốc',
        dataIndex: 'medicines.barcode',
        key: 'barcode',
        // width: '20%',
        render: (text, record, index) => {
          const obj = {
            children: text,
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            return (null);
          }
          return obj;

        },
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: 'medicines.barcode',
          title: 'Tên thuốc',
          editing: this.isEditing(record),
          index: 1
        }),
      },
      {
        title: 'Tên thuốc',
        dataIndex: 'medicines.name',
        key: 'medicinesId',
        // width: '30%',
        render: (text, record, index) => {
          const obj = {
            children: text,
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            // return <Input />
            return <MedicineWarehouse
              dataSource={dataOrigin}
              style={{ border: highlight1 ? '1px solid red' : '1px solid #e8e8e8', width: '100%' }}
              placeholder="Chọn tên thuốc"
              value={record.medicinesId}
              onChange={(value, medicines) => this.handleFieldChange(value, 'medicinesId', record.id, medicines, record)}
            />
          }
          return obj;

          // if (record.editable) {
          //   // log("TableForm => render => edit => record ", record);
          //   return (
          //     <MedicineSelect placeholder="Chọn tên thuốc" value={record.medicinesId} onChange={(value, medicines) => this.handleFieldChange(value, 'medicinesId', record.id, medicines)} />
          //   );
          // }
          // return text;
        },
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: 'medicines.name',
          title: 'Tên thuốc',
          editing: this.isEditing(record),
          index: 2
        }),
      },
      {
        title: 'Đơn vị tính',
        dataIndex: 'units.name',
        key: 'units.name',
        // width: '10%',
        render: (text, record, index) => {
          const obj = {
            children: text,
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            return <UnitsSelect
              style={{ border: '1px solid #e8e8e8', width: '100%' }}
              placeholder="Chọn đơn vị tính"
              value={record.unitsId}
              disabled
            />
          }
          return obj;
        },
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: 'units.name',
          title: 'Đơn vị tính',
          editing: this.isEditing(record),
          index: 3
        }),
      },
      {
        title: 'Số lượng',
        dataIndex: 'quantities',
        key: 'quantities',
        // width: '20%',
        render: (text, record, index) => {
          const obj = {
            children: formatNumber(text || 0),
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            return (
              <NumberInput
                style={{ border: highlight2 ? '1px solid red' : '1px solid #e8e8e8', width: '100%' }}
                min={0}
                value={text}
                placeholder="Nhập số lượng"
                onChange={value => this.handleFieldChange(value, 'quantities', record.id)}
              />
            );
          }
          return obj
        },
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: 'quantities',
          title: 'Số lượng',
          editing: this.isEditing(record),
          index: 4
        }),
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        // width: '20%',
        render: (text, record, index) => {
          const obj = {
            children: formatNumber(text || 0),
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            return (
              <NumberInput
                style={{ border: highlight3 ? '1px solid red' : '1px solid #e8e8e8', width: '100%' }}
                min={0}
                value={text}
                placeholder="Nhập giá"
                onChange={value => this.handleFieldChange(value, 'price', record.id)}
              />
            );
          }
          return obj
        },
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: 'price',
          title: 'SL thực',
          editing: this.isEditing(record),
          index: 5
        }),
      },
      {
        title: 'Giảm giá',
        dataIndex: 'discounts',
        key: 'discounts',
        // width: '30%',
        render: (text, record, index) => {
          const obj = {
            children: formatNumber(text || 0),
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            return (
              <NumberInput
                style={{ border: highlight4 ? '1px solid red' : '1px solid #e8e8e8', width: '100%' }}
                value={text}
                min={0}
                placeholder="Nhập giảm giá"
                onChange={value => this.handleFieldChange(value, 'discounts', record.id)}
              />
            );
          }
          return obj
        },
        onCell: record => ({
          record,
          inputType: 'number',
          dataIndex: 'discounts',
          title: 'Giá',
          editing: this.isEditing(record),
          index: 6
        }),
      },
      {
        title: 'Thành tiền',
        dataIndex: 'total',
        key: 'total',
        // width: '30%',
        render: (text, record, index) => {
          const obj = {
            children: formatNumber(text || 0),
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 5;
          }
          if (record.editable) {
            return (
              <NumberInput
                style={{ border: '1px solid #e8e8e8', width: '100%' }}
                value={text}
                disabled
                placeholder="Nhập thành tiền"
              />
            );
          }
          return obj
        },
        onCell: record => ({
          record,
          inputType: 'number',
          dataIndex: 'total',
          title: 'Thành tiền',
          editing: this.isEditing(record),
          index: 7
        }),
      },

      {
        title: 'Liều /ngày',
        dataIndex: 'dosePerDay',
        key: 'dosePerDay',
        // width: '30%',
        render: (text, record, index) => {
          const obj = {
            children: formatNumber(text || 0),
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            return (
              <NumberInput
                style={{ border: highlight5 ? '1px solid red' : '1px solid #e8e8e8', width: '100%' }}
                min={0}
                value={text}
                onChange={value => this.handleFieldChange(value, 'dosePerDay', record.id)}
                placeholder="Nhập số liều/ngày"
              />
            );
          }
          return obj
        },
        onCell: record => ({
          record,
          inputType: 'number',
          dataIndex: 'dosePerDay',
          title: 'Liều /ngày',
          editing: this.isEditing(record),
          index: 8
        }),
      },

      {
        title: 'SL /lượt uống',
        dataIndex: 'quantitiesPerTime',
        key: 'quantitiesPerTime',
        // width: '30%',
        render: (text, record, index) => {
          const obj = {
            children: formatNumber(text || 0),
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            return (
              <NumberInput
                style={{ border: highlight6 ? '1px solid red' : '1px solid #e8e8e8', width: '100%' }}
                min={0}
                value={text}
                onChange={value => this.handleFieldChange(value, 'quantitiesPerTime', record.id)}
                placeholder="Nhập số lượng/lượt uống"
              />
            );
          }
          return obj
        },
        onCell: record => ({
          record,
          inputType: 'number',
          dataIndex: 'quantitiesPerTime',
          title: 'SL /lượt uống',
          editing: this.isEditing(record),
          index: 9
        }),
      },
      {
        title: 'Đường dùng',
        dataIndex: 'duongDung',
        key: 'duongDung',
        // width: '30%',
        render: (text, record, index) => {
          const obj = {
            children: text || '',
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (record.editable) {
            return (
              <Input
                style={{ border: highlight7 ? '1px solid red' : '1px solid #e8e8e8', width: '100%' }}
                value={text}
                onChange={value => this.handleFieldChange(value, 'duongDung', record.id)}
                placeholder="Nhập đường dùng"
              />
            );
          }
          return obj
        },
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: 'duongDung',
          title: 'Đường dùng',
          editing: this.isEditing(record),
          index: 11
        }),
      },
      {
        title: 'Nút lệnh',
        dataIndex: 'action',
        key: 'action',
        width: '10%',
        render: (text, record, index) => {
          const { loading } = this.state;
          const { intl } = this.props
          const obj = {
            children: <span>
              {!buttonNew && <Tooltip title={intl.formatMessage({ id: 'app.tooltip.edit' })}>
                <Button onClick={e => this.toggleEditable(e, record.id)} icon="edit" type="ghost" shape="circle" />
              </Tooltip>}
              <Tooltip title="Xoá">
                <Popconfirm title="Có chắc muốn xoá ?" onConfirm={() => this.remove(record.id)}>
                  <Button icon="delete" type="ghost" shape="circle" />
                </Popconfirm>
              </Tooltip>
            </span>,
            props: {},
          };
          if (index === dataArr.length - 1) {
            obj.props.colSpan = 0;
          }
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span style={{ float: 'right' }}>
                  {/* <a onClick={e => this.saveRow(e, record.id)}>Lưu lại</a> */}
                  <Tooltip title='Lưu lại'>
                    <Button onClick={e => this.saveRow(e, record.id)} icon="save" type="ghost" shape="circle" />
                  </Tooltip>&nbsp;&nbsp;
                  <Tooltip title="Xoá">
                    <Popconfirm title="Có chắc muốn xoá ?" onConfirm={() => this.remove(record.id)}>
                      <Button icon="delete" type="ghost" shape="circle" />
                    </Popconfirm>
                  </Tooltip>
                </span>
              );
            }
            return (
              <span style={{ float: 'right' }}>
                {/* <a onClick={e => this.saveRow(e, record.id)}>Lưu lại</a> */}
                <Tooltip title='Lưu lại'>
                  <Button onClick={e => this.saveRow(e, record.id)} icon="save" type="ghost" shape="circle" />
                </Tooltip>&nbsp;&nbsp;
                {/* <a onClick={e => this.cancel(e, record.id)}>Hủy</a> */}
                <Tooltip title="Hủy">
                  <Popconfirm title="Có chắc muốn hủy ?" onConfirm={e => this.cancel(e, record.id)}>
                    <Button icon="close" type="ghost" shape="circle" />
                  </Popconfirm>
                </Tooltip>
              </span>
            );
          }
          return obj
        },
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: 'action',
          title: "Nút lệnh",
          editing: this.isEditing(record),
          index: 10
        }),
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    return (
      <Fragment>
        <Row guiter={6}>
          <Tooltip title='Thêm mới bản ghi'>
            <Button
              style={{ float: 'right', marginBottom: 8 }}
              type="primary"
              onClick={this.newMember}
              disabled={buttonNew}
            >
              Thêm
            </Button>
          </Tooltip>
        </Row>
        <Table
          components={components}
          loading={loading}
          columns={columns}
          dataSource={dataArr || []}
          scroll={{ x: true, y: false }}
          pagination={false}
          bordered
          rowClassName={record => (record.editable ? styles.editable : '')}
          onRow={(record, index) =>
            // log("onRow record: ", record)
            ({
              record,
              index,
              editing: record.editable
            })
          }
        />
        {/* <Row guiter={6}>
          <Col span={24}>
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              onClick={this.newMember}
              icon="plus"
            >
              Thêm mới
            </Button>
          </Col>
           <Col span={12}>
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8, marginLeft: 6, }}
              type="dashed"
              onClick={() => this.handleModalVisible(true)}
              icon="plus"
            >
              Thêm SP
          </Button>
          </Col> 
        </Row> */}
        {/* <CreateForm {...parentMethods} modalVisible={modalVisible} /> */}
      </Fragment>
    );
  }
}

export default Form.create()(TableForm);
