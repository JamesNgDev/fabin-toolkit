import Facebook, { FriendRequest } from '@helpers/facebook';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import React, { useCallback, useState } from 'react';
import { sleep } from '@helpers/sleep';
import { message } from 'antd';

export const useFriendRequest = () => {
    // @ts-ignore
    const facebook: Facebook = useSelector<RootState>(
        state => state.app.facebook,
    );

    const [isLoading, setIsLoading] = useState<boolean>();
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const handleScanFriendRequest = useCallback(() => {
        setIsLoading(true);
        facebook
            .getFriendRequests()
            .then(nodes => {
                setFriendRequests(nodes);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [setFriendRequests, facebook, setIsLoading]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleProcess = useCallback(
        async (action: 'confirm' | 'delete') => {
            setIsLoading(true);
            for (const request of friendRequests) {
                if (selectedRowKeys.includes(request.id)) {
                    await sleep(500);
                    try {
                        await facebook.processFriendRequest(request.id, action);
                        setFriendRequests(_friends => {
                            return _friends.filter(fr => request.id !== fr.id);
                        });
                        message.success(
                            `${action.toUpperCase()} ${request.name}`,
                        );
                    } catch (e) {
                        message.error(e.message);
                    }
                }
            }
            setIsLoading(false);
        },
        [selectedRowKeys, friendRequests, setFriendRequests, setIsLoading],
    );

    return {
        handleScanFriendRequest,
        isLoading,
        friendRequests,
        rowSelection,
        handleProcess,
    };
};
