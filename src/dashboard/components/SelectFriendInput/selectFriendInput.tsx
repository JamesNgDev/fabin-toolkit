import React, { useCallback, useState } from 'react';
import { Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Facebook, { FacebookUserInfo } from '@helpers/facebook';

const facebook = new Facebook();

export interface IFacebookURLInput {
    onChange: (info: FacebookUserInfo) => void;
}

const FacebookURLInput = (props: IFacebookURLInput) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onChangeProfile = useCallback(
        async (url: string) => {
            setIsLoading(true);
            facebook
                .getUserInfoByUrl(url)
                .then(facebookInfo => {
                    if (typeof props?.onChange === 'function') {
                        props.onChange(facebookInfo);
                    }
                })
                .catch(() => {
                    message.warn("Can't get Facebook ID");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [facebook, setIsLoading, props],
    );

    return (
        <div className="item">
            <Input
                placeholder="Facebook Profile URL"
                prefix={<UserOutlined />}
                onChange={e => onChangeProfile(e?.target?.value)}
                allowClear
                disabled={isLoading}
            />
        </div>
    );
};

export default FacebookURLInput;
