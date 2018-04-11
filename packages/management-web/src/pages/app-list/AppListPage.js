import './AppListPage.less';

import { Button, Card, Col, Icon, List, Row } from 'antd';
import React, { PureComponent } from 'react';

export class AppListPage extends PureComponent {
  state = {
    loading: false
  };
  render() {
    const list = [1, 2, 3];
    return (
      <div className="page-app-list">
        {/* 搜索栏 */}
        <Row>
          <Col span={10}>xxx</Col>
        </Row>
        <List
          rowKey="id"
          loading={this.state.loading}
          grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
          dataSource={[...list]}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card hoverable actions={[<a key="op1">操作一</a>, <a key="op2">操作二</a>]}>
                <Card.Meta
                  avatar={<img alt="" src={item.avatar} />}
                  title={<a href="#">{item.title}</a>}
                  description={<p>{item.description}</p>}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
