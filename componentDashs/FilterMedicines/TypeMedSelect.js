import React, { Component } from 'react';
import { Select, Spin, message, Col, Row, Tooltip, Button, Form, Modal, Input } from 'antd';
import { /* defineMessages, */ injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import regexHelper from '@/utils/regexHelper'
import { fnKhongDau } from '@/utils/utils';

const FormItem = Form.Item;
const { isfullNameNnumberAdd } = regexHelper
@connect(({ medTypes: { dataAll } }) => ({
  medTypes: dataAll
}))
@Form.create()
@injectIntl
class Index extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: `${this.props.value}`,
    loading: false,
    dataArr: [],
    dataOrigin: [],
    modalVisible: false,
    spinning: false
  }

  componentDidMount() {
    this.fetch()
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    if (nextProps.value !== value)
      this.setState({ value: `${nextProps.value}` })
  }

  fetch = () => {
    const { dispatch } = this.props;
    setTimeout(() => {
      const params = {
        filter: {
          status: true
        }
      };
      dispatch({
        type: 'medTypes/fetchAll',
        payload: params,
        callback: (result) => {
          // console.log("result",result.success)
          if (result && result.success === true) {
            const data = result && result.result.map(user => ({
              text: `${user.name}`,
              value: user.id,
            }));
            this.setState({
              dataArr: data,
              dataOrigin: data
            })
          } else {
            message.error(result.messages);
          }

        }
      });
      this.setState({ loading: false });
    }, 2000);
    this.setState({ loading: true });
  }

  renderData = data =>
    // log("renderTreeNodes data: ", data)
    (data || []).map((item) => (
      <Select.Option value={`${item.value}`} key={item.value}>{item.text.trim()}</Select.Option>
    ))

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
      //   log('handleSubmit err %o', !err);
      if (!err) {
        this.setState({
          spinning: true
        });
        const addItem = {
          ...values,
          status: true
        };
        dispatch({
          type: 'medTypes/add',
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
              message.success(intl.formatMessage({ id: 'app.common.create.success' }, { name: 'loại thuốc' }));
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
    const { key, placeholder, form, intl } = this.props;
    const { loading, value, dataArr, modalVisible, spinning } = this.state;
    // console.log('dsaas',dataArr)
    // console.log("dataArr", dataArr)
    // const data = this.renderData(dataArr || []);
    return (
      <React.Fragment>
        <Row gutter={{ md: 6 }}>
          <Col span={21}>
            <Select
              key={key}
              showSearch
              value={value || undefined}
              notFoundContent={loading ? <Spin size="small" /> : null}
              onChange={this.onChange}
              onSearch={this.search}
              filterOption={false}
              // onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder={placeholder}
              // style={{ maxWidth: '336px' }}
              // style={{ width: '830px' }}
              loading={loading}
            >
              {dataArr.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
            </Select>
          </Col>
          <Col span={3}>
            <Tooltip title="Thêm nhanh loại thuốc">
              <Button type="ghost" icon="plus" onClick={this.handleModalVisible} />
            </Tooltip>
          </Col>
        </Row>
        <Spin spinning={spinning}>
          <Modal
            destroyOnClose
            title="Thêm nhanh loại thuốc"
            visible={modalVisible}
            onOk={this.handleSubmit}
            onCancel={this.handleModalCancel}
          >
            <FormItem
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 15 }}
              label={
                <span>
                  Tên loại thuốc
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
              })(<Input placeholder='Nhập tên loại thuốc' />)}
            </FormItem>
          </Modal>
        </Spin>
      </React.Fragment>
    );
  }
}

export default Index;
