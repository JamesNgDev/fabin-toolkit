import { useCallback, useState } from 'react';
import Facebook, { FacebookUserInfo } from '@helpers/facebook';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';

const usePageLiked = (props = {}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<any[]>([]);
    const [percent, setPercent] = useState<number>(0);

    // @ts-ignore
    const facebook: Facebook = useSelector<RootState>(
        state => state.app.facebook,
    );

    const getLikedPage = useCallback(
        (facebookId: string) => {
            setIsLoading(true);
            facebook
                .getLikedPage(facebookId, percent => {
                    console.log({ percent });
                    setPercent(percent);
                })
                .then(res => {
                    setPages(res);
                })
                .catch(err => {
                    notification.error({
                        message:
                            "Can't get facebook info right now. Please try again",
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [setIsLoading, facebook, setPercent],
    );
    const onChangeFacebookId = useCallback(
        (facebookInfo: FacebookUserInfo) => {
            getLikedPage(facebookInfo.uid);
        },
        [getLikedPage],
    );

    return {
        isLoading,
        getLikedPage,
        onChangeFacebookId,
        pages,
        percent,
    };
};

export default usePageLiked;
