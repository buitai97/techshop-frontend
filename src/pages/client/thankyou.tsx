import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router';

const ThanksPage: React.FC = () => (
    <Result
        status="success"
        title="Successfully Purchased!"
        subTitle="Order number: 2017182818828182881"
        extra={[
            <Link type="primary" to="/">
                Go to homepage
            </Link>,
        ]}
    />
);

export default ThanksPage;