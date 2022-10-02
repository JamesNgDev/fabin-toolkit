import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Facebook, { FriendInfo } from '@helpers/facebook';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';

export const useFriendsRemover = (props = {}) => {
    const [friends, setFriends] = useState<FriendInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updatedAt, setUpdatedAt] = useState<number>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [removedUsers, setRemovedUsers] = useState<FriendInfo[]>([]);

    // @ts-ignore
    const facebook: Facebook = useSelector<RootState>(
        state => state.app.facebook,
    );

    const scanFriends = useCallback(
        async (isGetFromLocal: boolean) => {
            setIsLoading(true);
            const { data, createdAt } = await facebook.getFriends(
                isGetFromLocal,
            );
            setFriends(data);
            setIsLoading(false);
            setUpdatedAt(createdAt);
        },
        [setFriends, setIsLoading, setUpdatedAt],
    );

    useEffect(() => {
        scanFriends(true);
    }, [scanFriends]);

    const handleScanFriends = () => {
        scanFriends(false);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const readyToRemoveFriends = useMemo(() => {
        return friends.filter(friend => selectedRowKeys.includes(friend.id));
    }, [friends, selectedRowKeys]);

    const handleRemove = useCallback(async () => {
        for (const friend of friends) {
            if (selectedRowKeys.includes(friend.id)) {
                await new Promise(resolve => {
                    setTimeout(resolve, 500);
                });
                setFriends(_friends => {
                    return _friends.filter(fr => friend.id !== fr.id);
                });
                setRemovedUsers(prev => [friend, ...prev]);
            }
        }
    }, [readyToRemoveFriends, setRemovedUsers, friends, selectedRowKeys]);

    return {
        isLoading,
        friends,
        updatedAt,
        rowSelection,
        removedUsers,
        handleScanFriends,
        handleRemove,
        readyToRemoveFriends,
    };
};
