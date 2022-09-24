import React, { useMemo } from 'react';
import { Avatar, Input, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { SearchOutlined } from '@ant-design/icons';

import './likedPageStalk.scss';

const { Text } = Typography;

interface LikedPageStalkProps {
    pages?: any[];
    isLoading?: boolean;
}

const LikedPageStalkTable: React.FC = (props: LikedPageStalkProps) => {
    const { pages = [], isLoading } = props;
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
        <div className="likedPageContainer">
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
    );
};

export default LikedPageStalkTable;
