import { Avatar, Collapse, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { InteractionMapValue, InteractPost } from '@helpers/facebook';
import { getFacebookAvatar } from '@helpers/image';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Text } = Typography;

const columns: ColumnsType<InteractionMapValue> = [
    {
        title: 'Name',
        dataIndex: 'info',
        key: 'info',
        render: (text: string, row: InteractionMapValue) => (
            <div className="avatar-container">
                <Avatar src={getFacebookAvatar(row.info.id)} />
                <Text>
                    <a href={`https://fb.me/${row.info.id}`} target="_blank">
                        {row.info.name}
                    </a>
                </Text>
            </div>
        ),
    },
    {
        title: 'Comment',
        dataIndex: 'interaction',
        key: 'interaction',
        render: (text: string, row: InteractionMapValue) => (
            <Text>{row.interaction.comment}</Text>
        ),
    },
    {
        title: 'Posts',
        dataIndex: 'interactIn',
        key: 'interactIn',
        render: (interactIn: InteractPost) => {
            return (
                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                >
                    <Panel
                        header="View"
                        key="1"
                        className="site-collapse-custom-panel"
                    >
                        {interactIn.comments.map(comment => {
                            return (
                                <a
                                    style={{
                                        display: 'block',
                                    }}
                                    href={`https://www.facebook.com/${comment}`}
                                >
                                    {comment}
                                </a>
                            );
                        })}
                    </Panel>
                </Collapse>
            );
        },
    },
];

interface TopReactorsProps {
    data: InteractionMapValue[];
    isLoading: boolean;
}

export default function TopCommentors(props: TopReactorsProps) {
    return (
        <Table
            columns={columns}
            dataSource={props.data}
            pagination={false}
            loading={props.isLoading}
        />
    );
}
