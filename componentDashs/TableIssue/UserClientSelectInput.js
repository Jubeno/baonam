/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Icon, Modal, Col, Row, Table, Button, message, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words'
import { /* defineMessages, */ injectIntl } from 'react-intl';
import cookie from 'js-cookie'
import moment from 'moment';
import getConfig from 'next/config'
import regexHelper from '@/utils/regexHelper'
// import { fetchUserClient, createUserClient } from '../../dataProvider';
// import log from '@/utils/log';

const { publicRuntimeConfig } = getConfig()
const { isfullNameNnumberAdd, isMobile } = regexHelper
const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, intl } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      // console.log("TableForm => CreateForm +> okHandle +> validateFields => err %o | fieldsValue: %o", err, fieldsValue)
      if (!err) {
        form.resetFields();
        handleAdd(fieldsValue);
      }
    });
  };

  return (
    <Modal
      destroyOnClose
      title="Thêm nhanh khách hàng"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="Tên khách hàng">
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
        })(<Input placeholder='Nhập tên khách hàng ' />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        label={
          <span>
            <span style={{ color: 'red' }}>*</span>&nbsp;Số điện thoại
          </span>
        }
      >
        {form.getFieldDecorator('mobile', {
          rules: [
            {
              required: true,
              message: intl.formatMessage({ id: 'app.common.crud.validate.input' })
            },
            {
              pattern: isMobile,
              message: intl.formatMessage({ id: 'app.common.crud.validate.phone' })
            },
          ],
        })(<Input placeholder='Nhập số điện thoại ' />)}
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} label="Địa chỉ">
        {form.getFieldDecorator('address', {
          initialValue: '',
          rules: [{
            required: true, message: intl.formatMessage({ id: 'app.common.crud.validate.input' }),
          }],
        })(
          <Input.TextArea
            maxLength={500}
            rows={1}
            placeholder='Nhập số nhà, đường...'
          />
        )}
      </FormItem>
    </Modal>
  );
});
@injectIntl
@connect(({ customers }) => ({
  customers,
}))
class UserClientSelectInput extends React.Component {
  state = {
    searchText: '',
    loading: false,
    data: [],
    pagination: {},
    value: this.props.value,
    userClient: this.props.userClient,
    fetching: false,
    visible: false,
    selectedRowKeys: [],
    modalVisible: false,
  }

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    // this.fetchUser = debounce(this.fetchUser, 800);
  }

  componentDidMount() {
    const queryString = {
      filter: JSON.stringify({ placesId: cookie.get("placeID") }),
      range: JSON.stringify([0, publicRuntimeConfig.PAGE_SIZE - 1]),
      sort: JSON.stringify(["createDate", "DESC"])
    };
    this.fetch(queryString);
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys: %o | selectedRows: ', selectedRowKeys, selectedRows);

    this.setState({
      selectedRowKeys: [selectedRowKeys[selectedRowKeys.length - 1]],
      selectedRows: [selectedRows[selectedRows.length - 1]],
      value: selectedRowKeys[selectedRowKeys.length - 1],
      userClient: selectedRows[selectedRows.length - 1],
    });

    this.props.onChange(selectedRowKeys[selectedRowKeys.length - 1]);
    this.handleCancel();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { searchText } = this.state
    const sort = [sorter && sorter.columnKey || "createDate", sorter && sorter.order === 'ascend' ? "ASC" : "DESC"]
    const queryName = {
      name: searchText,
      placesId: cookie.get("placeID"),
    }
    if (!searchText.trim()) { delete queryName.name }
    const query = {
      filter: JSON.stringify(queryName),
      range: JSON.stringify([
        pagination.current * pagination.pageSize - pagination.pageSize,
        pagination.current * pagination.pageSize - 1
      ]),
      sort: JSON.stringify(sort)
    }
    this.fetch(query);
  }

  fetch = (queryString) => {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    dispatch({
      type: 'customers/fetch',
      payload: queryString,
      callback: (result) => {
        // console.log("result ", result);
        this.setState({
          loading: false,
        });
        if (result && result.success === true) {
          this.setState({
            data: result.result && result.result.list,
            pagination: result.result && result.result.pagination,
          });
        } else if (result && result.success === false) {
          message.error(result && result.error && result.error.message);
        }
      }
    })
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleSearch = (selectedKeys) => {
    const queryName = {
      name: selectedKeys,
      placesId: cookie.get("placeID"),
    }
    if (!selectedKeys.trim()) { delete queryName.name }
    const queryString = {
      filter: JSON.stringify(queryName),
      range: JSON.stringify([0, publicRuntimeConfig.PAGE_SIZE - 1]),
      sort: JSON.stringify(["createDate", "DESC"])
    };
    this.fetch(queryString);
    this.setState({ searchText: selectedKeys });
  }

  handleReset = (clearFilters) => {
    const queryName = {
      placesId: cookie.get("placeID"),
    }
    const queryString = {
      filter: JSON.stringify(queryName),
      range: JSON.stringify([0, publicRuntimeConfig.PAGE_SIZE - 1]),
      sort: JSON.stringify(["createDate", "DESC"])
    };
    this.fetch(queryString);
    clearFilters()
    this.setState({ searchText: '' });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, clearFilters,
    }) =>
      (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => { this.searchInput = node; }}
            placeholder="Tìm kiếm theo tên khách hàng "
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys && selectedKeys[0] || "", dataIndex)}
            style={{ width: 250, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys && selectedKeys[0] || "", dataIndex)}
            icon="search"
            size="small"
            style={{ marginRight: 8 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
          >
            Hủy
          </Button>
        </div>
      ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const { intl, dispatch } = this.props
    const record = {
      email: '',
      groupCustomersId: 2,
      wardsId: '1',
      status: true,
      placesId: cookie.get("placeID"),
      ...fields
    }
    dispatch({
      type: 'customers/add',
      payload: record,
      callback: (result) => {
        // log("result ", result);
        if (result && result.success === true) {
          message.success(intl.formatMessage({ id: 'app.common.create.success' }, { name: 'khách hàng' }));
          this.setState({
            value: result.result && result.result.id,
            userClient: result.result,
            selectedRowKeys: [result.result && result.result.id],
            selectedRows: [result.result],
          });
          this.props.onChange(result.result && result.result.id)
        } else if (result && result.success === false) {
          message.error(result && result.error && result.error.message);
        }
        this.handleModalVisible();
      }
    });
    // createUserClient(record).then(results => {
    //   log("UserClientSelectInput => handleAdd => createUserClient => results: ", results);
    //   const { status, json } = results;
    //   if (status === 200) {
    //     message.success('Thêm thành công!');
    //     const { id } = json;
    //     this.setState({
    //       value: id,
    //       userClient: json,
    //     });
    //     this.props.onChange(id);
    //   } else {
    //     message.success('Thêm thất bại!');
    //   }

    //   this.handleModalVisible();
    // });
  };

  render() {
    const { data, pagination, loading, visible, userClient, modalVisible } = this.state;
    const { selectedRowKeys } = this.state;
    const { intl } = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      type: 'radio',
    };

    const columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
        sorter: () => { },
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'mobile',
        sorter: () => { },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        // ...this.getColumnSearchProps('email'),
        sorter: () => { },
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createDate',
        sorter: () => { },
        render: (value) => {
          const obj = {
            children: moment(value).format("DD/MM/YYYY"),
            props: {},
          };
          return obj;
        },
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const valueUserName = userClient ? ((userClient.name !== undefined || userClient.name !== null || userClient.name !== '') ? userClient.name : userClient.name) : '';

    return (
      <React.Fragment>
        <Row gutter={{ md: 6 }}>
          <Col span={18}>
            <Input
              style={{ width: '100%' }}
              value={valueUserName}
              disabled
              placeholder="Chọn khách hàng"
            />
          </Col>
          <Col span={3}>
            <Button type="primary" icon="user" onClick={this.showModal} />
          </Col>
          <Col span={3}>
            <Tooltip title="Thêm nhanh khách hàng">
              <Button type="ghost" icon="plus" onClick={() => this.handleModalVisible(true)} />
            </Tooltip>
          </Col>
        </Row>
        <Modal
          title={<div style={{ color: 'grey' }}>Chọn khách hàng</div>}
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          width="75%"
        >
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            rowKey={record => record.id}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </Modal>
        <CreateForm {...parentMethods} modalVisible={modalVisible} intl={intl} />
      </React.Fragment>
    );
  }
};

export default UserClientSelectInput;
