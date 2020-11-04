import React, {Component} from 'react';
import './BasicController.less';
import {Button, Card, Form, InputNumber, message, Switch} from 'antd';
import AngleController from '../control/AngleController';
import {postAngleAndSpeed, runAllDirTest, startOrStop} from '../api/BasicControlApi';

const MAX_SPEED = 1000;

class BasicController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            speed: 0,
            allDirTestSpeed: 0,
            allDirTestStepDelay: 0,
        };
        this.canvas = null;
        this.form = null;
    }

    onCanvasBind(canvas) {
        const _this = this;
        if ((!this.canvas) && canvas !== this.canvas && canvas != null) {
            this.angleController = new AngleController(canvas, {
                onAngleChanged(angle, length) {
                    _this.setSpeedAndDirection({angle, speed: length * MAX_SPEED});
                }
            });
            this.canvas = canvas;
        }
    }

    onFormBind(form) {
        if (this.form === null && this.form !== form && form != null) {
            this.form = form;
            const {angle, speed} = this.state;
            this.form.setFieldsValue({angle, speed});
        }
    }

    setSpeedAndDirection(data) {
        const stateData = {
            speed: data.speed,
            angle: data.angle,
        };
        this.setState(stateData);
        this.angleController.setData(data.angle, data.speed / MAX_SPEED);
        this.form.setFieldsValue(stateData);
        postAngleAndSpeed(stateData).then(() => {
            message.info('设置成功');
        });
    }

    startStop(state) {
        startOrStop(state).then(() => {
            message.info('启停成功');
        });
    }

    allDirTest() {
        const {allDirTestSpeed, allDirTestStepDelay} = this.state;
        runAllDirTest(allDirTestSpeed, allDirTestStepDelay).then(res => {
            message.info('启动成功');
        });
    }

    render() {
        const {angle, speed, allDirTestSpeed, allDirTestStepDelay} = this.state;
        return (
            <div className="basic">
                <canvas width="500" height="500" ref={canvas => this.onCanvasBind(canvas)}/>
                <div className="props">
                    <Form onFinish={data => this.setSpeedAndDirection(data)} ref={form => this.onFormBind(form)}>
                        <Form.Item label="角度" name="angle">
                            <InputNumber value={angle}/>
                        </Form.Item>
                        <Form.Item label="速度" name="speed">
                            <InputNumber value={speed}/>
                        </Form.Item>
                        <Form.Item label="启动开关">
                            <Switch onChange={state => this.startStop(state)}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                使用
                            </Button>
                        </Form.Item>
                    </Form>
                    <Card>
                        <InputNumber value={allDirTestSpeed}
                                     onChange={text => this.setState({allDirTestSpeed: text})}>速度</InputNumber>
                        <InputNumber value={allDirTestStepDelay}
                                     onChange={text => this.setState({allDirTestStepDelay: text})}>步进延时</InputNumber>
                        <Button type="primary" onClick={() => this.allDirTest()}>全向行走测试</Button>
                    </Card>
                </div>
            </div>
        );
    }
}

export default BasicController;
