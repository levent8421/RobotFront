import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {renderRoutes} from 'react-router-config';
import {rootRouters} from '../router/routes';
import {withRouter} from 'react-router-dom';

const {Header, Sider, Content} = Layout;

class RootContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onMenuClick(e) {
        const {key} = e;
        const {history} = this.props;
        switch (key) {
            case 'basicControl':
                history.push({pathname: '/basic'});
                break;
            default:
                return;
        }
    }

    render() {
        return (
            <Layout className="App">
                <Header className="header">
                    <div className="logo">ROBOT</div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="sign_in">xx</Menu.Item>
                        <Menu.Item key="sign_up">xx</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider>
                        <Menu theme="dark" mode="inline" onClick={(...args) => this.onMenuClick(...args)}>
                            <Menu.Item key="basicControl">基础控制</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        {renderRoutes(rootRouters)}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(RootContent);
