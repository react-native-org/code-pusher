import { Col, Icon, Row, Spin, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';
import numeral from 'numeral';
import React, { Component } from 'react';
import { ChartCard, Field, MiniArea } from '../../components/charts';

@inject('analysisStore')
@observer
export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.analysisStore.setAnalysisData();
  }

  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 }
    };

    const { propsLoading } = this.props;
    const { stateLoading } = this.state;
    const loading = propsLoading || stateLoading;
    let { visitData } = this.props.analysisStore.chartData;
    if (visitData && visitData.length) {
      // mobx的obseverable数组，Array.isArray返回为false，需重新转换为真正的数组
      visitData = visitData.slice();
    }
    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              title={'更新成功数'}
              action={
                <Tooltip title="了解详情">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={<Field label="日推送量" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }
}
