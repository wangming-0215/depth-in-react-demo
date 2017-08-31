import React, { Component } from "react";
import Tabs from "./Tabs";
import TabPane from "./TabPane";
import './index.css';

export default class extends Component {
    render() {
        return (
            <Tabs>
                <TabPane tab={'tab 1'} order={'0'}>123</TabPane>
                <TabPane tab={'tab 1'} order={'0'}>123</TabPane>
                <TabPane tab={'tab 1'} order={'0'}>123</TabPane>
                <TabPane tab={'tab 1'} order={'0'}>123</TabPane>
                <TabPane tab={'tab 1'} order={'0'}>123</TabPane>
                <TabPane tab={'tab 1'} order={'0'}>123</TabPane>
            </Tabs>
        );
    }
}
