import {
    Button,
    Checkbox,
    Dropdown,
    Form,
    Input,
    Modal,
    notification,
    Select,
} from 'antd';
import { useState } from 'react';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';

const Create = (props) => {
    const [cookie, setCookie, removeCookie] = useCookies();

    const [data, setData] = useState({
        username: '',
        password: '',
        role_id: null,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleAddAccount = () => {
        try {
            axios
                .post('/account/create', data, {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                })
                .then(() => {
                    notification.success({
                        message: 'Success',
                        description: 'Cập nhật dữ liệu thành công.',
                    });
                    props.handleCancel();
                });
        } catch (e) {
            notification.error({
                message: 'Error',
                description: 'Lôi',
            });
            console.log(e);
        }
    };

    return (
        <>
            <Modal
                open={props.open}
                onCancel={props.handleCancel}
                title="Thêm tài khoản"
                onOk={() => {
                    handleAddAccount();
                }}
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
                        label="Repeat Password"
                        name="repeat_password"
                        rules={[
                            {
                                required: true,
                                message: 'Please repeat password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'Mật khẩu nhập lại không khớp!',
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label="Role" name="role_id">
                        <Select
                            style={{
                                width: 120,
                            }}
                            allowClear
                            options={props.dataRoles.map((role) => ({
                                value: role.id,
                                label: role.name,
                            }))}
                            placeholder="select it"
                            onChange={(e) => {
                                setData((prevData) => ({
                                    ...prevData,
                                    role_id: e,
                                }));
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Create;
