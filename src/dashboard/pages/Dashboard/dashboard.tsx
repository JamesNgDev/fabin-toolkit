import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'antd';
import './dashboard.scss';
// @ts-ignore
import personalImage from './../../assets/images/person-dashboard.png';
import { SetPageTitle } from '@redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';

export default function Dashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SetPageTitle('Dashboard'));
    }, []);

    const facebook = useSelector<RootState>(state => state.app.facebook);

    return (
        <div className="dashboard">
            <Row
                gutter={16}
                style={{
                    marginTop: 20,
                }}
            >
                <Col className="gutter-row" span={24}>
                    <Card bordered={false} className="welcome">
                        <div className="content">
                            <div className="text">
                                <h3>Hi, {facebook?.userInfo?.name} 🎉</h3>
                                <span>
                                    Thanks for using <b>Fabin Toolkit</b>.{' '}
                                    <b>Fabin Toolkit</b> combines many tools
                                    help you using Facebook easily and always
                                    FREE for use.
                                </span>
                                <div
                                    className="mt-4 d-inline-flex"
                                    style={{
                                        gap: 10,
                                    }}
                                >
                                    <Button type="primary">Contribute</Button>
                                    <Button type="ghost">Donate</Button>
                                </div>

                                <div className="mt-4">
                                    <p className="text-danger">
                                        WARNING: Your account may get locked
                                        temporarily (checkpointed by Facebook)
                                        for using my extension.
                                    </p>
                                </div>
                            </div>
                            <img alt="Personal" src={personalImage} />
                        </div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={24} style={{ marginTop: 20 }}>
                    <Card bordered={false} title="Update history">
                        <p>
                            💥<b>14/10/2022: </b>{' '}
                            <i>
                                Interaction Stalk, Liked Page Stalk, Friend
                                Remove, Friend Request
                            </i>
                        </p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
