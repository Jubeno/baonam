import React, { PureComponent } from 'react';
// import { formatMessage, setLocale, getLocale } from 'umi/locale';
import { Table } from 'antd';
import styles from './index.less';

export default class TableAntd extends PureComponent {

  render() {
    const { loading, rowKey, components, dataSource, columns, onChange, condensed, bordered, pagination, style, scroll, size, emptyText, ...rest } = this.props;
    if (!pagination) {
      return (
        <Table
          loading={loading}
          rowKey={rowKey}
          dataSource={dataSource}
          columns={columns}
          components={components}
          size={size}
          onChange={onChange}
          className={styles.TableAntd}
          style={style}
          scroll={scroll}
          locale={{ emptyText: emptyText || 'Không có dữ liệu' }}
          condensed={condensed}
          bordered={bordered}
          {...rest}
        />
      );
    }
    if (pagination === 'none') {
      return (
        <Table
          loading={loading}
          rowKey={rowKey}
          dataSource={dataSource}
          columns={columns}
          components={components}
          size={size}
          onChange={onChange}
          className={styles.TableAntd}
          style={style}
          scroll={scroll}
          locale={{ emptyText: emptyText || 'Không có dữ liệu' }}
          condensed={condensed}
          bordered={bordered}
          pagination={false}
          {...rest}
        />
      );
    }
    return (
      <Table
        loading={loading}
        rowKey={rowKey}
        dataSource={dataSource}
        columns={columns}
        components={components}
        size={size}
        pagination={pagination}
        onChange={onChange}
        className={styles.TableAntd}
        style={style}
        scroll={scroll}
        locale={{ emptyText: emptyText || 'Không có dữ liệu' }}
        condensed={condensed}
        bordered={bordered}
        {...rest}
      />
    );
  }
}
