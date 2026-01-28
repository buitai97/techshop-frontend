import type { FormProps } from 'antd';
import { App, Button, Divider, Form, Input, Typography } from 'antd';
import { fetchAccountAPI, loginAPI } from '../../services/api';
import { Link, useNavigate } from 'react-router';
import { useAppContext } from '@/context/app.provider';

type FieldType = {
    username: string;
    password: string;
};



const LoginPage = () => {
    const { notification } = App.useApp()
    const navigate = useNavigate()
    const { setUser, setIsAuthenticated } = useAppContext();
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { password, username } = values

        try {
            const res = await loginAPI(username, password)
            if (res?.data) {
                const accessToken = res.data.accessToken
                localStorage.setItem("accessToken", accessToken)
                const currentUser = await fetchAccountAPI()
                const user = currentUser?.data?.data?.user
                setUser(user as IUser)
                setIsAuthenticated(true)
                navigate("/")
            }
        }
        catch (error: any) {
            const message = error?.response?.data?.message ?? "unknown"

            notification.error({
                message: "Something happened!",
                description: message
            })
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "60px" }}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout='vertical'
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='form-container p-5!'
            >
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    Login
                </Typography.Title>
                <Divider />
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item className='text-center'>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
                <Divider>OR</Divider>
                <div style={{ textAlign: "center" }}><Link to="/register">Create new account</Link></div>

            </Form>
        </div>

    )

};

export default LoginPage;