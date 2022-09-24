import React, { useEffect, useMemo } from 'react';
import {
    Avatar,
    Card,
    Col,
    Divider,
    Input,
    Row,
    Table,
    Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { SearchOutlined } from '@ant-design/icons';
import usePageLiked from '@hooks/Facebook/usePageLiked';
import { useDispatch } from 'react-redux';
import { SetPageTitle } from '@redux/actions';

import './likedPageStalk.scss';

const { Text } = Typography;

const LikedPageStalk: React.FC = () => {
    const talonProps = usePageLiked();
    const { isLoading, getLikedPage, pages } = talonProps;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SetPageTitle('Like page stalk'));
    }, []);

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'title',
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
            onFilter: (value: string, record: any) => {
                return record?.title?.text
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
            render: (text: string, row: any) => (
                <div className="profile">
                    <Avatar src={row?.image?.uri} size={'large'} />
                    <Text>
                        <a href={row?.url} target="_blank">
                            {row?.title?.text}
                        </a>
                    </Text>
                </div>
            ),
        },
    ];

    const tableColumns = useMemo(() => {
        return columns.map(col => col);
    }, [pages]);

    return (
        <div className="page likedPageContainer">
            <Row
                gutter={16}
                style={{
                    marginTop: '20px',
                }}
            >
                <Col className="gutter-row" span={24}>
                    <Card bordered={false}>
                        <div className="friends-remover">
                            <div className="top">
                                <div className="left">
                                    <Input.Search
                                        placeholder="Facebook ID"
                                        enterButton="Search"
                                        size="large"
                                        onSearch={getLikedPage}
                                        loading={isLoading}
                                    />
                                </div>
                                <div className="right">
                                    <Text>Total: {pages?.length || 0}</Text>
                                </div>
                            </div>

                            <Divider />

                            <Table
                                columns={tableColumns}
                                dataSource={pages}
                                rowKey="id"
                                loading={isLoading}
                                pagination={{
                                    defaultPageSize: 100,
                                }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LikedPageStalk;
