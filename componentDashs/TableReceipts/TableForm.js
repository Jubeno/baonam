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
  Tooltip,
  DatePicker
} from 'antd';
import isEqual from 'lodash/isEqual';
import { /* defineMessages, */ injectIntl, FormattedMessage } from 'react-intl';
import moment from 'moment';
import NumberInput from '@/componentDashs/NumberInput'
import UnitsSelect from '@/componentDashs/FilterMedicines/UnitsSelect';
import PakgateSelect from '@/componentDashs/FilterMedicines/PakgateSelect';
import MedicineSelect from '@/componentDashs/FilterMedicines/MedicineSelect';
import log from '@/utils/log';
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
    borderBottom: '1.1px solid #ccc',
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

const EditableRow = ({ form, index, editing, ...props }) => {
  log("EditableRow props: ", editing)
  return editing ? (
    <EditableContext.Provider value={form}>
      <tr>
        <td colSpan='16'>
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
};

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
                    {index === 2 ? (
                      <Col sm={12} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Tên thuốc: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 3 ? (
                      <Col sm={12} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}>Quy cách đóng gói: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 4 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Số lô: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 15 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Hạn sử dụng: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 16 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Ngày sản xuất: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 5 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Số lượng chứng từ: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 6 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Số lượng nhập: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 7 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}>Đơn vị tính sỉ: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 8 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Giá nhập (chưa VAT): </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 9 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Thành tiền (chưa VAT): </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 10 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}>Số lượng lẻ: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 11 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}>Đơn vị tính lẻ: </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 12 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Giá bán lẻ (10% VAT): </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 13 ? (
                      <Col sm={6} xs={24} style={{ padding: '5px', height: '65px' }}><Col span={24}><span style={{ color: 'red' }}>*</span>&nbsp;Giá bán sỉ  (10% VAT): </Col>{restProps.children}</Col>
                    ) : ''}
                    {index === 14 ? (
                      <Col sm={24} xs={24} style={{ padding: '5px', height: '65px' }}>{restProps.children}</Col>
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
@Form.create()
class TableForm extends PureComponent {
  index = -9999;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      editingKey: '',
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
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
      highlight8: false,
      highlight9: false
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => Number(item.id) === Number(key))[0];
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
    const newData = data.map(item => ({ ...item, editable: false }));
    // console.log("data", data)
    // log("TableForm => newMemeber => warehouseExportId: ", goodsIssuesId)
    newData.push({
      id: `${this.index}`,
      // goodsIssuesId,
      medicinesId: '',
      medicines: {
      },
      packagesId: '',
      packages: {},
      wholesaleUnits: {},
      wholesaleUnitsId: '',
      expiredDate: undefined,
      manufacturingDate: undefined,
      lotNumber: '',
      price: undefined,
      quantitiesRequest: undefined,
      quantitiesReceived: undefined,
      retailQuantities: undefined,
      total: undefined,
      unitsId: '',
      units: {
      },
      retailPrice: undefined,
      wholesalePrice: undefined,
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
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      let medicinesData = record && record.medicines
      // console.log("record", record)
      target[fieldName] = value;
      if (fieldName === "medicinesId") {
        // this.setState({
        //   highlight1: false
        // });
        medicinesData = dataSelect
        target["medicinesId"] = value;
        target["medicines"] = medicinesData
        target["retailPrice"] = medicinesData && medicinesData.retailPrice
        target["wholesalePrice"] = medicinesData && medicinesData.wholesalePrice
        target["packages"] = medicinesData && medicinesData.packages
        target["units"] = medicinesData && medicinesData.packages && medicinesData.packages.units
        target["wholesaleUnits"] = medicinesData && medicinesData.packages && medicinesData.packages.wholesaleUnits
        target["packagesId"] = medicinesData && medicinesData.packagesId
        target["unitsId"] = medicinesData && medicinesData.packages && medicinesData.packages.unitsId
        target["wholesaleUnitsId"] = medicinesData && medicinesData.packages && medicinesData.packages.wholesaleUnitsId
        target["retailQuantities"] = Number(target["quantitiesReceived"] || 0) * Number(medicinesData && medicinesData.packages && medicinesData.packages.quantities || 0)
      }
      if (fieldName === "quantitiesReceived") {
        target["retailQuantities"] = Number(target["quantitiesReceived"] || 0) * Number(medicinesData && medicinesData.packages && medicinesData.packages.quantities || 0)
      }
      if (fieldName === "lotNumber") {
        target["lotNumber"] = value.target.value
      }
      if (fieldName === "quantitiesReceived" || fieldName === "price") {
        target["total"] = Number(target["quantitiesReceived"] || 0) * Number(target["price"] || 0)
      }
      // if (!target.medicinesId ||
      //   !target.lotNumber ||
      //   !target.expiredDate ||
      //   !target.quantitiesReceived ||
      //   !target.quantitiesRequest ||
      //   !target.price ||
      //   !target.retailPrice ||
      //   !target.wholesalePrice) {
      //   console.log("target", target)
      this.setState({
        loading: false,
        highlight1: !target.medicinesId,
        highlight2: !target.lotNumber,
        highlight3: !target.expiredDate,
        highlight4: !target.quantitiesRequest,
        highlight5: !target.quantitiesReceived,
        highlight6: !target.price,
        highlight7: !target.retailPrice,
        highlight8: !target.wholesalePrice,
        highlight9: !target.manufacturingDate
      });
      // }
      this.setState({ data: newData });
    }
    log.groupEnd();
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

  // isEditing = record => record.key === this.state.editingKey;
  isEditing = record => record.editable;

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const { form: { setFields } } = this.props
      const target = this.getRowByKey(key) || {};
      // log("TableForm => saveRow => target: ", target)
      if (!target.medicinesId ||
        !target.lotNumber ||
        !target.expiredDate ||
        !target.quantitiesReceived ||
        !target.quantitiesRequest ||
        !target.price ||
        !target.retailPrice ||
        !target.wholesalePrice ||
        !target.manufacturingDate) {
        message.error('Vui lòng nhập đầy đủ thông tin chi tiết phiếu');
        e.target.focus();
        this.setState({
          loading: false,
          highlight1: !target.medicinesId,
          highlight2: !target.lotNumber,
          highlight3: !target.expiredDate,
          highlight4: !target.quantitiesRequest,
          highlight5: !target.quantitiesReceived,
          highlight6: !target.price,
          highlight7: !target.retailPrice,
          highlight8: !target.wholesalePrice,
          highlight9: !target.manufacturingDate
        });
        return;
      }
      if (target.quantitiesRequest < target.quantitiesReceived) {
        message.error('Vui lòng nhập số lượng nhập nhỏ hơn số lượng chứng từ');
        e.target.focus();
        this.setState({
          loading: false,
          highlight4: true,
          highlight5: true,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key, 1);
      const { data } = this.state;
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
    const newData = data.map(item => ({ ...item }));
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
      highlight7: false,
      highlight8: false,
      highlight9: false
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
      highlight7: false,
      highlight8: false,
      highlight9: false
    });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  render() {
    const { loading, data, categoryId, supplierId, modalVisible, buttonNew, highlight1, highlight2, highlight3, highlight4, highlight5, highlight6, highlight7, highlight8, highlight9 } = this.state;
    const { classes, record, warehouseId, form: { getFieldDecorator } } = this.props;
    // console.log("warehouseId: ", warehouseId)
    // const dataArr = data && data.map((item) => {
    //   const total = Number(item.price || 0) * Number(item.quantitiesReceived || 0)
    //   return {
    //     ...item,
    //     total
    //   }
    // }) || []
    const dataArr = data
    // let total = dataArr.length > 0 && dataArr.map((item) => item.total || 0) || 0
    // const reducer = (accumulator, currentValue) => accumulator + currentValue
    // total = total === 0 ? 0 : total.reduce(reducer)
    // dataArr.push({
    //   total
    // })
    const columns = [

      {
        title: 'Thông tin phiếu nhập',
        dataIndex: null,
        children: [
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
              // if (index === dataArr.length - 1) {
              //   obj.props.colSpan = 0;
              // }
              if (record.editable) {
                return (null);
              }
              return obj
            }
            ,
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
              // if (index === dataArr.length - 1) {
              //   obj.props.colSpan = 0;
              // }
              if (record.editable) {
                return (
                  <MedicineSelect
                    style={{ border: highlight1 ? '1.1px solid red' : '1.1px solid #e8e8e8', width: '100%' }}
                    placeholder="Chọn tên thuốc"
                    value={record.medicinesId}
                    onChange={(value, medicines) => this.handleFieldChange(value, 'medicinesId', record.id, medicines, record)}
                  />
                )
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
            title: 'Đơn vị tính sỉ',
            dataIndex: null,
            children: [
              {
                title: 'Quy cách đóng gói',
                dataIndex: 'packages.name',
                key: 'packages.name',
                // width: '10%',
                render: (text, record, index) => {
                  const obj = {
                    children: text,
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 9;
                  //   obj.children = <h3 style={{ textAlign: 'center' }}>Tổng cộng</h3>
                  //   // return <h3 style={{ textAlign: 'center' }}>Tổng cộng</h3>
                  // }
                  if (record.editable) {
                    return <PakgateSelect
                      style={{ border: '1.1px solid #e8e8e8', width: '100%' }}
                      placeholder="Chọn quy cách đóng gói"
                      value={record.packagesId}
                      disabled
                    />
                  }
                  return obj;
                },
                onCell: record => ({
                  record,
                  inputType: 'text',
                  dataIndex: 'packages.name',
                  title: 'Đơn vị tính',
                  editing: this.isEditing(record),
                  index: 3
                }),
              },
              {
                title: 'Số lô',
                dataIndex: 'lotNumber',
                key: 'lotNumber',
                // width: '20%',
                render: (text, record, index) => {
                  const obj = {
                    children: text,
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return (
                      <Input value={text} style={{ border: highlight2 ? '1.1px solid red' : '1.1px solid #e8e8e8' }} placeholder="Nhập số lô" onChange={value => this.handleFieldChange(value, 'lotNumber', record.id)} />
                    );
                  }
                  return obj
                },
                onCell: record => ({
                  record,
                  inputType: 'text',
                  dataIndex: 'lotNumber',
                  title: 'Số lotNumber',
                  editing: this.isEditing(record),
                  index: 4
                }),
              },
              {
                title: 'NSX',
                dataIndex: 'manufacturingDate',
                key: 'manufacturingDate',
                // width: '20%',
                render: (text, record, index) => {
                  const obj = {
                    children: moment(text).format("DD/MM/YYYY"),
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return (
                      <DatePicker value={text ? moment(text) : ''} style={{ border: highlight9 ? '1.1px solid red' : '1.1px solid white', width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày sản xuất" onChange={value => this.handleFieldChange(value, 'manufacturingDate', record.id)} />
                    );
                  }
                  return obj
                },
                onCell: record => ({
                  record,
                  inputType: 'text',
                  dataIndex: 'manufacturingDate',
                  title: 'Ngày sản xuất',
                  editing: this.isEditing(record),
                  index: 16
                }),
              },
              {
                title: 'HSD',
                dataIndex: 'expiredDate',
                key: 'expiredDate',
                // width: '20%',
                render: (text, record, index) => {
                  const obj = {
                    children: moment(text).format("DD/MM/YYYY"),
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return (
                      <DatePicker value={text ? moment(text) : ''} style={{ border: highlight3 ? '1.1px solid red' : '1.1px solid white', width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn hạn sử dụng" onChange={value => this.handleFieldChange(value, 'expiredDate', record.id)} />
                    );
                  }
                  return obj
                },
                onCell: record => ({
                  record,
                  inputType: 'text',
                  dataIndex: 'expiredDate',
                  title: 'SL thực',
                  editing: this.isEditing(record),
                  index: 15
                }),
              },
              {
                title: 'SL chứng từ',
                dataIndex: 'quantitiesRequest',
                key: 'quantitiesRequest',
                // width: '20%',
                render: (text, record, index) => {
                  const obj = {
                    children: formatNumber(text || 0),
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return (
                      <NumberInput min={0} style={{ border: highlight4 ? '1.1px solid red' : '1.1px solid #e8e8e8', width: '100%' }} value={text} placeholder="Nhập số lượng chứng từ" onChange={value => this.handleFieldChange(value, 'quantitiesRequest', record.id)} />
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
                title: 'SL nhập',
                dataIndex: 'quantitiesReceived',
                key: 'quantitiesReceived',
                // width: '30%',
                render: (text, record, index) => {
                  const obj = {
                    children: formatNumber(text || 0),
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return (
                      <NumberInput min={0} value={text} style={{ border: highlight5 ? '1.1px solid red' : '1.1px solid #e8e8e8', width: '100%' }} placeholder="Nhập số lượng nhập" onChange={value => this.handleFieldChange(value, 'quantitiesReceived', record.id, {}, record)} />
                    );
                  }
                  return obj
                },
                onCell: record => ({
                  record,
                  inputType: 'number',
                  dataIndex: 'quantitiesReceived',
                  title: 'Giá',
                  editing: this.isEditing(record),
                  index: 6
                }),
              },
              {
                title: 'Đơn vị tính',
                dataIndex: 'wholesaleUnits.name',
                key: 'wholesaleUnits.name',
                // width: '10%',
                render: (text, record, index) => {
                  const obj = {
                    children: text,
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return <UnitsSelect placeholder="Chọn đơn vị tính sỉ" style={{ border: '1.1px solid #e8e8e8', width: '100%' }} value={record.wholesaleUnitsId} disabled />
                  }
                  return obj;
                },
                onCell: record => ({
                  record,
                  inputType: 'text',
                  dataIndex: 'wholesaleUnits.name',
                  title: 'Đơn vị tính',
                  editing: this.isEditing(record),
                  index: 7
                }),
              },
              {
                title: 'Giá nhập',
                dataIndex: 'price',
                key: 'price',
                // width: '30%',
                render: (text, record, index) => {
                  const obj = {
                    children: formatNumber(text || 0),
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return (
                      <NumberInput min={0} style={{ border: highlight6 ? '1.1px solid red' : '1.1px solid #e8e8e8', width: '100%' }} value={text} onChange={value => this.handleFieldChange(value, 'price', record.id)} placeholder="Nhập giá nhập" />
                    );
                  }
                  return obj
                },
                onCell: record => ({
                  record,
                  inputType: 'number',
                  dataIndex: 'total',
                  title: 'Giá nhập',
                  editing: this.isEditing(record),
                  index: 8
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
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 6;
                  // }
                  if (record.editable) {
                    return (
                      <NumberInput value={text} style={{ border: '1.1px solid #e8e8e8', width: '100%' }} disabled placeholder="Nhập thành tiền" />
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
                  index: 9
                }),
              },
            ]
          },
          {
            title: 'Đơn vị tính lẻ',
            dataIndex: null,
            children: [
              {
                title: 'Số lượng',
                dataIndex: 'retailQuantities',
                key: 'retailQuantities',
                // width: '20%',
                render: (text, record, index) => {
                  const obj = {
                    children: formatNumber(text || 0),
                    props: {},
                  };
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return (
                      <NumberInput style={{ border: '1.1px solid #e8e8e8', width: '100%' }} value={text} placeholder="Nhập số lượng lẻ" onChange={value => this.handleFieldChange(value, 'retailQuantities', record.id)} disabled />
                    );
                  }
                  return obj
                },
                onCell: record => ({
                  record,
                  inputType: 'text',
                  dataIndex: 'retailQuantities',
                  title: 'Số lượng',
                  editing: this.isEditing(record),
                  index: 10
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
                  // if (index === dataArr.length - 1) {
                  //   obj.props.colSpan = 0;
                  // }
                  if (record.editable) {
                    return <UnitsSelect style={{ border: '1.1px solid #e8e8e8', width: '100%' }} placeholder="Chọn đơn vị tính lẻ" value={record.unitsId} disabled />
                  }
                  return obj;
                },
                onCell: record => ({
                  record,
                  inputType: 'text',
                  dataIndex: 'units.name',
                  title: 'Đơn vị tính',
                  editing: this.isEditing(record),
                  index: 11
                }),
              },
            ]
          }
        ]
      },
      {
        title: 'Cập nhật giá bán',
        dataIndex: null,
        children: [
          {

            title: 'Giá bán lẻ',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            // width: '20%',
            render: (text, record, index) => {
              const obj = {
                children: formatNumber(text || 0),
                props: {},
              };
              // if (index === dataArr.length - 1) {
              //   obj.props.colSpan = 0;
              // }
              if (record.editable) {
                return (
                  <NumberInput min={0} style={{ border: highlight7 ? '1.1px solid red' : '1.1px solid #e8e8e8', width: '100%' }} value={text} placeholder="Nhập giá bán lẻ" onChange={value => this.handleFieldChange(value, 'retailPrice', record.id)} />
                );
              }
              return obj
            },
            onCell: record => ({
              record,
              inputType: 'text',
              dataIndex: 'retailPrice',
              title: 'Số lượng',
              editing: this.isEditing(record),
              index: 12
            }),
          },
          {
            title: 'Giá bán sỉ',
            dataIndex: 'wholesalePrice',
            key: 'wholesalePrice',
            // width: '20%',
            render: (text, record, index) => {
              const obj = {
                children: formatNumber(text || 0),
                props: {},
              };
              // if (index === dataArr.length - 1) {
              //   obj.props.colSpan = 0;
              // }
              if (record.editable) {
                return (
                  <NumberInput min={0} value={text} style={{ border: highlight8 ? '1.1px solid red' : '1.1px solid #e8e8e8', width: '100%' }} placeholder="Nhập giá bán sỉ" onChange={value => this.handleFieldChange(value, 'wholesalePrice', record.id)} />
                );
              }
              return obj
            },
            onCell: record => ({
              record,
              inputType: 'text',
              dataIndex: 'wholesalePrice',
              title: 'Số lượng',
              editing: this.isEditing(record),
              index: 13
            }),
          },

        ]
      },
      {
        title: 'Nút lệnh',
        dataIndex: 'action',
        key: 'action',
        width: '5%',
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
          // if (index === dataArr.length - 1) {
          //   obj.props.colSpan = 0;
          // }
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
          index: 14
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
          dataSource={data || []}
          scroll={{ x: true, y: false }}
          pagination={false}
          bordered
          rowClassName={record => (record.editable ? styles.editable : '')}
          onRow={(record, index) => {
            log("onRow record: ", record)
            return {
              record,
              index,
              editing: record.editable
            }
          }}
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
