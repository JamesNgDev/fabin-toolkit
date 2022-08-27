import React from 'react';
import { Card, Col, Row } from 'antd';
import './dashboard.scss';
// @ts-ignore
import personalImage from './../../assets/images/person-dashboard.png';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Row
                gutter={16}
                style={{
                    marginTop: 20,
                }}
            >
                <Col className="gutter-row" span={16}>
                    <Card bordered={false} className="welcome">
                        <div className="content">
                            <div className="text">
                                <h3>Congratulations John! 🎉</h3>
                                <span>
                                    You have done 68% 😎 more sales today. Check
                                    your new badge in your profile.
                                </span>
                            </div>
                            <img alt="Personal" src={personalImage} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
