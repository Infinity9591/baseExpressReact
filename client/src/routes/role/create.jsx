import { useCookies } from 'react-cookie';
import { Form, Input, Modal, notification } from 'antd';
import { useState } from 'react';
import axios from '../../utils/axios.customize.js';

const Create = (props) => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [data, setData] = useState({
        id: '',
        name: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleAddRole = () => {
        try {
            axios
                .post('/role/create', data, {
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
                title="Thêm chức vụ"
                onOk={() => {
                    handleAddRole();
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
                        label="Mã"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input id!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => handleInputChange(e)} />
                    </Form.Item>
                    <Form.Item
                        label="Tên"
                        name="name"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input name!',
                        //     },
                        // ]}
                    >
                        <Input onChange={(e) => handleInputChange(e)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Create;
