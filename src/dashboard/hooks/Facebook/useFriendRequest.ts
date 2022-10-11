import Facebook, { FriendRequest } from '@helpers/facebook';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { useCallback, useState } from 'react';

export const useFriendRequest = () => {
    // @ts-ignore
    const facebook: Facebook = useSelector<RootState>(
        state => state.app.facebook,
    );

    const [isLoading, setIsLoading] = useState<boolean>();
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

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

    return {
        handleScanFriendRequest,
        isLoading,
        friendRequests,
    };
};
