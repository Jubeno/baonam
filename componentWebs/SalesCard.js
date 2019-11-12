import React, { memo } from 'react';
import { Row, Card, Tabs } from 'antd';
// import dynamic from 'next/dynamic'

import { Bar } from '../componentsDash/Charts';
/* const Bar = dynamic(() => import('../../components/Charts'), {
  ssr: false, loading: () => <p>...</p>
}); */

const { TabPane } = Tabs;
const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const SalesCard = memo(
  ({ loading }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <Tabs
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane
          tab='Gigabytes'
          key="1"
        >
          <Row>
            <Bar
              height={290}
              data={salesData}
            />
          </Row>
        </TabPane>
        <TabPane
          tab='Megabytes'
          key="2"
        >
          <Row>
            <Bar
              height={292}
              data={salesData}
            />
          </Row>
        </TabPane>
        <TabPane
          tab='Kilobytes'
          key="3"
        >
          <Row>
            <Bar
              height={292}
              data={salesData}
            />
          </Row>
        </TabPane>
        <TabPane
          tab='Bytes'
          key="4"
        >
          <Row>
            <Bar
              height={292}
              data={salesData}
            />
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  )
);

export default SalesCard;
