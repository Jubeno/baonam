import React, { Component } from 'react';
import { TreeSelect, Spin, message, Col, Row, Tooltip, Button, Form, Modal, Input } from 'antd';
import { /* defineMessages, */ injectIntl } from 'react-intl';
import cookie from 'js-cookie'
import { connect } from 'react-redux';
import regexHelper from '@/utils/regexHelper'
import { fnKhongDau } from '@/utils/utils';
import log from '@/utils/log';
import AddSelect from '@/componentWebs/common/AddSelect'

const { TreeNode } = TreeSelect;


const FormItem = Form.Item;
const { isfullNameNnumberAdd } = regexHelper
@connect(({ groupMedicines: { dataAll } }) => ({
  groupMedicines: dataAll
}))
@Form.create()
@injectIntl
class ShortCutSelectGroupMedicines extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: `${this.props.value}`,
    loading1: false,
    // dataArr: [],
    // dataOrigin: [],
    // modalVisible: false,
    spinning: false
  }

  componentDidMount() {
    this.fetch()
  }

  // componentWillReceiveProps(nextProps) {
  //   const { value } = this.state;
  //   if (nextProps.value !== value)
  //     this.setState({ value: `${nextProps.value}` })
  // }

  renderTreeNodes = data =>
    // log("renderTreeNodes data: ", data)
    data.map((item) => {
      if (item && item.children) {
        return (
          <TreeNode value={item.id} title={item.name && item.name.trim()} key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      if (item)
        return <TreeNode value={item.id} title={item.name && item.name.trim()} key={item.id} />;
      return null;
    })
    ;

  filterTreeNode = (inputValue, treeNode) => {
    // log("search filterTreeNode inputValue: %o | treeNode: %o", inputValue, treeNode);
    const { props: { title } } = treeNode;
    // log("search filterTreeNode title: %o | inputValue: %o", fn_khongdau(title), fn_khongdau(inputValue));
    if (fnKhongDau(title).indexOf(fnKhongDau(inputValue)) !== -1) {
      return true;
    }
    return false;
  }

  fetch = () => {
    const { dispatch } = this.props;
    setTimeout(() => {
      let params = {
        filter: {
          placesId: cookie.get("placeID")
        }
      };
      const { filter } = params;
      params = {
        filter: JSON.stringify(filter)
      }
      dispatch({
        type: 'groupMedicines/fetchAll',
        payload: params,
        callback: (result) => {
          // console.log("result",result.success)
          if (result && result.success === true) {
            // log('result', result)
            this.setState({ loading1: false });
          } else {
            message.error(result.messages);
          }

        }
      });
      this.setState({ loading1: false });
    }, 2000);
    // this.setState({ loading1: true });
  }

  // renderData = data =>
  //   // log("renderTreeNodes data: ", data)
  //   (data || []).map((item) => (
  //     <Select.Option value={`${item.value}`} key={item.value}>{item.text.trim()}</Select.Option>
  //   ))

  handleSubmit = e => {
    const {
      dispatch,
      form,
      intl,
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err,
      values
    ) => {
      // log('handleSubmit err %o', !err);
      if (!err) {
        this.setState({
          spinning: true
        });
        const addItem = {
          ...values,
          status: true,
          placesId: cookie.get("placeID")
        };
        dispatch({
          type: 'groupMedicines/add',
          payload: addItem,
          callback: (result) => {
            if (result && result.success === true) {
              this.fetch()
              const { onChange } = this.props;
              if (onChange)
                onChange(`${result && result.result && result.result.id}`);
              this.setState({
                value: `${result && result.result && result.result.id}`
              });
              message.success(intl.formatMessage({ id: 'app.common.create.success' }, { name: 'nhóm thuốc' }));
              setTimeout(() => {
                this.setState({
                  modalVisible: false,
                  spinning: false
                });
              }, 1000)
            } else if (result && result.success === false) {
              message.error(result && result.error && result.error.message);
            }
          }
        });
      }
    });
  };

  handleModalVisible = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  onChange = (value) => {
    this.setState({
      value
    });
    const { onChange } = this.props;
    if (onChange)
      onChange(value);
  }

  // search = value => {
  //   // log.group("PRODUCT SELECT INPUT")
  //   // log("search value: ", value);
  //   const { dataOrigin } = this.state;
  //   const dataTemp = dataOrigin.filter(item => fnKhongDau(item.text).indexOf(fnKhongDau(value)) !== -1);
  //   this.setState({ dataArr: dataTemp });
  //   // log("search data: ", dataTemp);
  //   // log.groupEnd();
  // }

  render() {
    const { key, placeholder, form, intl, groupMedicines, idCategory, haveParent } = this.props;
    const { loading1, value, modalVisible, spinning } = this.state;
    let arr = groupMedicines && groupMedicines.list
    if (idCategory) {
      arr = groupMedicines && groupMedicines.list && groupMedicines.list.filter(item => item.id !== idCategory)
    }
    const data = this.renderTreeNodes(arr || []);
    log('loading', this.state, placeholder)
    // console.log('dsaas',dataArr)
    // console.log("dataArr", dataArr)
    // const data = this.renderData(dataArr || []);
    return (
      <React.Fragment>
        <Row gutter={{ md: 6 }}>
          <Col span={21}>
            <TreeSelect
              key={`${key}_out`}
              style={{ width: '100%' }}
              placeholder={placeholder}
              value={value}
              notFoundContent={loading1 ? <Spin size="small" /> : null}
              filterOption={false}
              showSearch
              filterTreeNode={this.filterTreeNode}
              onChange={this.onChange}
              // onSearch={this.search}
              // onKeyPress={e => this.handleKeyPress(e, record.key)}
              // style={{ width: '830px' }}
              loading={loading1}

            >
              {!haveParent ?
                <TreeNode value="0" title="Nhóm thuốc cha" key="0">
                  {data}
                </TreeNode> : data}
            </TreeSelect>
          </Col>
          <Col span={1}>
            <Tooltip title="Thêm nhanh nhóm thuốc">
              <Button type="ghost" icon="plus" onClick={this.handleModalVisible} />
            </Tooltip>
          </Col>
        </Row>
        <Spin spinning={spinning}>
          <Modal
            destroyOnClose
            title="Thêm nhanh nhóm thuốc"
            visible={modalVisible}
            onOk={this.handleSubmit}
            onCancel={this.handleModalCancel}
          >
            <FormItem
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 14 }}
              label={
                <span>
                  Tên nhóm thuốc
                </span>
              }
            >
              {form.getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'app.common.crud.validate.input' })
                  },
                  {
                    pattern: isfullNameNnumberAdd,
                    message: intl.formatMessage({ id: 'app.common.crud.validate.fomat' })
                  },
                ],
              })(<Input placeholder='Nhập tên nhóm thuốc' />)}
            </FormItem>

            <FormItem
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 14 }}
              label={
                <span>
                  Tên nhóm thuốc cha
                </span>
              }
            >
              {form.getFieldDecorator('parentId', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'app.common.crud.validate.select' })
                  },

                ],
              })(<AddSelect key={`${key}_model`} placeholder='Chọn tên nhóm thuốc' />)}
            </FormItem>
          </Modal>
        </Spin>
      </React.Fragment>
    );
  }
}

export default ShortCutSelectGroupMedicines;
