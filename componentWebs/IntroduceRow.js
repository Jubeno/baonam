import React, { memo } from 'react';
import { Row, Col, Card } from 'antd';
// import { FormattedMessage } from 'umi/locale';
import router from 'next/router'
import numeral from 'numeral';

import { ChartCard, MiniProgress, } from '../componentsDash/Charts/index';

const IntroduceRow = memo(({ loading = [], dataIndex }) => (
  <Card bordered={false}>
    <Row gutter={24}>
      <Col sm={6} xs={24}>
        <ChartCard
          bordered={false}
          title='Tổng số site'
          loading={loading}
          total={`${numeral(dataIndex.TotalSize).format('0,0')}`}
          footer={
            <a onClick={() => router.push(`/Site/list`, `/site/site_list`)}>Chi tiết</a>
          }
          contentHeight={46}
        >
          <MiniProgress percent={100} strokeWidth={8} target={100} color="#716ACA" />
        </ChartCard>
      </Col>
      <Col sm={6} xs={24}>
        <ChartCard
          bordered={false}
          title='Tổng bandwidth'
          loading={loading}
          total={`${numeral(dataIndex.TotalBandwitch * 1000).format('0,0')}`}
          footer={
            <a onClick={() => router.push(`/Report/transaction_log`, `/report/transaction-log`)}>Chi tiết</a>
          }
          contentHeight={46}
        >
          <MiniProgress percent={100} strokeWidth={8} target={100} color="#36A2F7" />
        </ChartCard>
      </Col>
      <Col sm={6} xs={24}>
        <ChartCard
          bordered={false}
          title='Số tiền đã dùng'
          loading={loading}
          total={`${numeral(dataIndex.UsedMoney).format('0,0')} VND`}
          footer={
            <a onClick={() => router.push(`/Report/transaction_log`, `/report/transaction-log`)}>Chi tiết</a>
          }
          contentHeight={46}
        >
          <MiniProgress percent={100} strokeWidth={8} target={100} color="#F4516C" />
        </ChartCard>
      </Col>
      <Col sm={6} xs={24}>
        <ChartCard
          bordered={false}
          title='Số tiền còn lại'
          loading={loading}
          total={`${numeral(dataIndex.HaveMoney).format('0,0')} VND`}
          footer={
            <a href='#'>Chi tiết</a>
          }
          contentHeight={46}
        >
          <MiniProgress percent={100} strokeWidth={8} target={100} color="#34BFA3" />
        </ChartCard>
      </Col>
    </Row>
  </Card>
));

export default IntroduceRow;
