import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    Space,
    Tabs,
    message,
    theme,
    Button,
    Form,
    Input,
    Checkbox,
    Flex,
} from 'antd';
import { useEffect, useState } from 'react';
import axios from '../utils/axios.customize.js';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';

const Login = () => {
    const { token } = theme.useToken();

    const [cookie, setCookie, removeCookie] = useCookies(['access-token']);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        // console.log(e.target.name, e.target.value);
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    let navigate = useNavigate();

    const routeChange = (path) => {
        navigate(path);
    };

    const handleLogin = () => {
        axios.post('/site/login', formData).then((data) => {
            // console.log(data.data);
            // if (data?.data) {
            //     routeChange('/home/account');
            // }
            // if ()

            setCookie('access-token', data.data.token, {
                // httpOnly : true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 86400,
            });
            routeChange('/account');
        });
    };

    return (
        <>
            <Flex gap="middle" align="start" vertical>
                <Flex
                    style={{
                        height: '100vh',
                        width: '100%',
                    }}
                    justify={'center'}
                    align={'center'}
                >
                    <Form
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        // initialValues={{
                        //     remember: true,
                        // }}
                        onFinish={handleLogin}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => handleInputChange(e)} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            label={null}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </>
    );
};

export default Login;
