import './LoginPage.less';

import { Button, Checkbox, Form, Icon, Input } from 'antd';
import React, { PureComponent } from 'react';

import { bindSelf } from '../../utils';

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      remember: false
    };
  }
  componentDidMount() {
    document.body.classList.add('login-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page');
  }

  @bindSelf
  handleRememberChange(e) {
    e.preventDefault();
    this.setState({ remember: e.target.checked });
  }

  @bindSelf
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.setUserInfo(values).then(() => {
          this.props.history.push('/');
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
        <div className="login-box">
          <div className="login-logo text-center">
            <h2>
              <a href="">
                <b>登录到 Hot Push</b>
              </a>
            </h2>
          </div>
          <div className="login-box-body">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入账户！' }]
                })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码！' }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item key="other">
                <Checkbox name="remember" value={this.state.remember} onChange={this.handleRememberChange}>
                  记住账户
                </Checkbox>
                <a className="login-form-forgot pull-right" href="/forgot">
                  忘记密码？
                </a>
                <br />
                <Button type="primary" icon="login" htmlType="submit" className="btn-login">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage = Form.create()(LoginPage);

export { LoginPage };
