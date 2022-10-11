import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SetPageTitle } from '@redux/actions';
import { Avatar, Button, Card, Col, Input, Row, Table, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFriendRequest } from '@hooks/Facebook/useFriendRequest';
import { ColumnsType } from 'antd/lib/table';
import { FriendInfo, FriendRequest } from '@helpers/facebook';
import { getMutualFriend } from '@helpers/utils';
import './friendRequest.scss';

const { Text } = Typography;

function FriendRequest(props: any) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SetPageTitle('Friend reqest'));
    }, []);

    const talonProps = useFriendRequest();
    const { handleScanFriendRequest, friendRequests, isLoading } = talonProps;

    const columns: ColumnsType<FriendRequest> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Search..."
                        value={selectedKeys[0]}
                        onChange={e => {
                            const value = [e.target.value] || [];
                            setSelectedKeys(value);
                        }}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                );
            },
            filterIcon: () => <SearchOutlined />,
            onFilter: (value: string, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase());
            },
            render: (text: string, row: FriendInfo) => (
                <div className="profile">
                    <Avatar src={row?.profile_picture?.uri} />
                    <Text>
                        <a href={row.url} target="_blank">
                            {text}
                        </a>
                    </Text>
                </div>
            ),
        },
        {
            title: 'Mutual Friend',
            dataIndex: 'social_context',
            sorter: (a, b) => {
                return (
                    getMutualFriend(a?.social_context?.text) -
                    getMutualFriend(b?.social_context?.text)
                );
            },
            render: (socialContext: any) => {
                return <Text>{getMutualFriend(socialContext?.text)}</Text>;
            },
        },
    ];

    return (
        <div className="page friend-request">
            <Row
                gutter={16}
                style={{
                    marginTop: '20px',
                }}
            >
                <Col className="gutter-row" span={24}>
                    <Card bordered={false} title="Friend request">
                        <div className="d-flex justify-content-between">
                            <div className="left">
                                <Button
                                    type="primary"
                                    icon={<SearchOutlined />}
                                    onClick={() => handleScanFriendRequest()}
                                    loading={isLoading}
                                >
                                    Scan friend request
                                </Button>
                            </div>
                            <div className="right">
                                <Button type="default">
                                    Scan Friend Request
                                </Button>
                                <Button type="default">Delete</Button>
                            </div>
                        </div>

                        <Table
                            columns={columns}
                            dataSource={friendRequests}
                            rowKey="id"
                            loading={isLoading}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default FriendRequest;
