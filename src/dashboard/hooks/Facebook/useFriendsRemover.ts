import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Facebook, { FriendInfo } from '@helpers/facebook';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';

export const useFriendsRemover = (props = {}) => {
    const [friends, setFriends] = useState<FriendInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updatedAt, setUpdatedAt] = useState<number>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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

    const handleRemove = useCallback(() => {
        console.log('handle remove');
    }, []);

    const readyToRemoveFriends = useMemo(() => {
        return friends.filter(friend => selectedRowKeys.includes(friend.id));
    }, [friends]);

    return {
        isLoading,
        friends,
        updatedAt,
        rowSelection,
        handleScanFriends,
        handleRemove,
        readyToRemoveFriends,
    };
};
