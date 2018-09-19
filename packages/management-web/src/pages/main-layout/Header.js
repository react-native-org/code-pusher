import './Header.less';

import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import React, { PureComponent } from 'react';
import GlobalHeader from '../../components/globalHeader';

const { Header } = Layout;

class HeaderView extends PureComponent {
  state = {
    visible: true
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleNoticeClear = type => {
    message.success(`清空了${type}`);
  };

  handleMenuClick = ({ key }) => {};

  handleNoticeVisibleChange = visible => {
    if (visible) {
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true
          });
          this.scrollTop = scrollTop;
          return;
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
    this.ticking = false;
  };

  render() {
    const { handleMenuCollapse, setting } = this.props;
    const { fixedHeader } = setting;
    const width = this.getHeadWidth();
    const HeaderDom = (
      <Header style={{ padding: 0, width }} className={fixedHeader ? fixedHeader : ''}>
        <GlobalHeader
          onCollapse={handleMenuCollapse}
          onNoticeClear={this.handleNoticeClear}
          onMenuClick={this.handleMenuClick}
          onNoticeVisibleChange={this.handleNoticeVisibleChange}
          {...this.props}
        />
      </Header>
    );
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default HeaderView;

