import { registerAPI } from "services/api";
import { App, Button, Divider, Form, Input } from "antd"
import type { FormProps } from 'antd';
import { Typography } from 'antd';
import { useState } from "react";
import { Link, useNavigate } from "react-router";

type FieldType = {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string
};

const RegisterPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const { message } = App.useApp()
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setIsSubmit(true)
            if (values.email && values.name && values.password && values.confirmPassword && values.username) {
                const res = await registerAPI(values.name, values.username, values.email, values.password, values.confirmPassword)
                if (res?.data) {
                    message.success('Registered Successfully!');
                    navigate("/login")
                }
                else {
                    message.error("Something Happened!");
                }
            }
        } catch (res: any) {

            const errors = res.response.data.errors
            errors.forEach((err: string) => {
                message.error(err);
            })
        }
        setIsSubmit(false)
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        message.error(errorInfo.errorFields[0].errors[0]);
    };
    return (
        <Form
            className="form-container p-5!"
            name="basic"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 400 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
        >
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Register
            </Typography.Title>
            <Divider />
            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm Password"
                name="confirmPassword"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, { type: "email", message: "Not a valid email!" }]}
            >
                <Input />
            </Form.Item>


            <Form.Item className="text-center">
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                    Register
                </Button>
            </Form.Item>
            <Divider> OR </Divider>
            <div className="text text-normal" style={{ textAlign: "center" }}>Already registered? <Link to="/login">Login</Link></div>
        </Form>
    )
}

export default RegisterPage