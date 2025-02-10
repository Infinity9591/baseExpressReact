import { Button, Checkbox, Flex, Form, Input, notification } from 'antd';
import { useState } from 'react';
import axios from '../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const changePassword = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        try {
            axios
                .post('/site/changePassword', formData, {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                })
                .then((data) => {
                    notification.success({
                        message: 'Success',
                        description: data.statusUpdate,
                    });
                    navigate('/user');
                });
        } catch (e) {
            notification.error({
                message: 'Error',
                description: e,
            });
        }
    };

    return (
        <>
            {/*<Flex gap="middle" align="start" vertical>*/}
            {/*    <Flex*/}
            {/*        style={{*/}
            {/*            height: '100vh',*/}
            {/*            width: '100%',*/}
            {/*        }}*/}
            {/*        justify={'center'}*/}
            {/*        align={'center'}*/}
            {/*    >*/}
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
                // onFinish={handleSubmit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Old Password"
                    name="old_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input old password!',
                        },
                    ]}
                >
                    <Input.Password
                        name="old_password"
                        onChange={(e) => handleInputChange(e)}
                    />
                </Form.Item>

                <Form.Item
                    label="Repeat old password"
                    name="repeat_old_password"
                    dependencies={['old_password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please repeat old password',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('old_password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('Mật khẩu nhập lại không khớp!'),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input new password!',
                        },
                    ]}
                >
                    <Input.Password
                        name="new_password"
                        onChange={(e) => handleInputChange(e)}
                    />
                </Form.Item>

                <Form.Item label={null}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {/*    </Flex>*/}
            {/*</Flex>*/}
        </>
    );
};
export default changePassword;
