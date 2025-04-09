import { useCookies } from 'react-cookie';
import { Form, Input, Modal, notification, Select } from 'antd';
import { useState } from 'react';
import axios from '../../utils/axios.customize.js';

const Create = (props) => {
    const [cookie, setCookie, removeCookie] = useCookies();

    const [data, setData] = useState({
        name: '',
        phone_number: '',
        email: '',
        address: '',
        account_id: null,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleAddUser = () => {
        // console.log(data);
        try {
            axios
                .post('/user/create', data, {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                })
                .then(() => {
                    notification.success({
                        message: 'Success',
                        description: 'Cập nhật dữ liệu thành công.',
                    });
                    props.handleCancelCreate();
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
                onCancel={props.handleCancelCreate}
                title="Thêm nhân viên"
                onOk={() => {
                    handleAddUser();
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
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => handleInputChange(e)} />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your username!',
                        //     },
                        // ]}
                    >
                        <Input onChange={(e) => handleInputChange(e)} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your username!',
                        //     },
                        // ]}
                    >
                        <Input onChange={(e) => handleInputChange(e)} />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your username!',
                        //     },
                        // ]}
                    >
                        <Input onChange={(e) => handleInputChange(e)} />
                    </Form.Item>
                    <Form.Item label="Tài khoản" name="account_id">
                        <Select
                            style={{
                                width: 120,
                            }}
                            allowClear
                            options={props.dataAccounts.map((account) => ({
                                value: account.id,
                                label: account.username,
                            }))}
                            placeholder="select it"
                            onChange={(e) => {
                                setData((prevData) => ({
                                    ...prevData,
                                    account_id: e,
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
