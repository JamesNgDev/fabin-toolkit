import { Spin } from 'antd';
import React from 'react';
import './fullPageLoading.scss';

const FullPageLoading = () => {
    return (
        <div className="fullPageLoadingRoot">
            <Spin />
            <div className="icon">
                <img src="/icon128.png" alt="logo" />
                <span className="name">Fabin ToolKit</span>
            </div>
            <span>by JamesNguyen</span>
        </div>
    );
};

export default FullPageLoading;
