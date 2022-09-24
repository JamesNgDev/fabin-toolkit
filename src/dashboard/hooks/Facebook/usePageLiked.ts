import { useCallback, useEffect, useState } from 'react';
import Facebook from '@helpers/facebook';
import { notification } from 'antd';

const facebook = new Facebook();
facebook.init();
const usePageLiked = (props = {}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<any[]>([]);

    useEffect(() => {
        facebook.init();
    }, []);

    const getLikedPage = useCallback(
        (facebookId: string) => {
            setIsLoading(true);
            facebook
                .getLikedPage(facebookId)
                .then(res => {
                    setPages(res);
                })
                .catch(err => {
                    notification.error({
                        message: 'Something is wrong',
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [setIsLoading],
    );

    return {
        isLoading,
        getLikedPage,
        pages,
    };
};

export default usePageLiked;
