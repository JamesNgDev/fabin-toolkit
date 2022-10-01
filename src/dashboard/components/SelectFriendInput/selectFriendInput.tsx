import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectFriendInput = (props: {}) => {
    return (
        <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                    (optionA!.children as unknown as string)
                        .toLowerCase()
                        .localeCompare(
                            (
                                optionB!.children as unknown as string
                            ).toLowerCase(),
                        )
                }
            >
                <Option value="1">Not Identified</Option>
                <Option value="2">Closed</Option>
                <Option value="3">Communicated</Option>
                <Option value="4">Identified</Option>
                <Option value="5">Resolved</Option>
                <Option value="6">Cancelled</Option>
            </Select>
        </div>
    );
};

export default SelectFriendInput;
