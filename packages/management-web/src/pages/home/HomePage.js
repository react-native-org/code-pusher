import { Card, Col, Row, Spin } from 'antd';
import React, { Component } from 'react';

export class HomePage extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={6}>
            <Card bodyStyle={{ padding: '20px 24px 8px 24px' }}>{<Spin spinning={true}>xxxx</Spin>}</Card>
          </Col>
        </Row>
      </div>
    );
  }
}
