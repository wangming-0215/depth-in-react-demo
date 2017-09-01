import React, { Component } from "react";
import Tabs from "./Tabs";
import TabPane from "./TabPane";
import Select from './Select';
import HOC from './HOC';
import './index.css';

export default class extends Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveIndex={0}>
                    <TabPane tab='tab 0' order='0'>123</TabPane>
                    <TabPane tab='tab 1' order='1'>345</TabPane>
                    <TabPane tab='tab 2' order='2'>678</TabPane>
                    <TabPane tab='tab 3' order='3'>890</TabPane>
                    <TabPane tab='tab 4' order='4'>235</TabPane>
                    <TabPane tab='tab 5' order='5'>674</TabPane>
                </Tabs>
                <br />
                <Select />
                <br />
                <HOC />
            </div>
        );
    }
}
