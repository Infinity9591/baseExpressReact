import { useEffect, useState } from 'react';
import axios from '../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import { Button, Checkbox, Form, Input, notification, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getPersonalData} from '../redux/reducers/getPersonalDataSlice.js'

const UpdatePersonalData = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    let datas = {};
    const [formData, setFormData] = useState();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.accounts);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleOk = () => {
        try {
            axios
                .post('/site/updatePersonalInformation', formData, {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                })
                .then((data) => {
                    notification.success({
                        message: 'Success',
                        description: data.statusUpdate,
                    });
                    navigate('/site/error');
                });
        } catch (e) {
            notification.error({
                message: 'Error',
                description: e,
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getPersonalData());
                datas = Array.isArray(state.data) ? state.data : [];
                setFormData({
                    person_name: datas.person_name,
                    phone_number: datas.phone_number,
                    email: datas.email,
                    address: datas.address,
                });
                form.setFieldsValue({
                    person_name: datas.person_name,
                    phone_number: datas.phone_number,
                    email: datas.email,
                    address: datas.address,
                });
                // console.log(formData);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch user data',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [form]);

    return (
        <>
            <Spin spinning={state.isLoading}>
                <Form
                    form={form}
                    name="basic"
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
                        name="person_name"
                        onChange={(e) => handleInputChange(e)}
                    >
                        <Input name="person_name" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone_number"
                        onChange={(e) => handleInputChange(e)}
                    >
                        <Input name="phone_number" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        onChange={(e) => handleInputChange(e)}
                    >
                        <Input name="email" />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        onChange={(e) => handleInputChange(e)}
                    >
                        <Input name="address" />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleOk}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>

            {/*<div>*/}
            {/*    <li>{datas.id}</li>*/}
            {/*    <li>{datas.username}</li>*/}
            {/*    /!*<li>{data.password_hash}</li>*!/*/}
            {/*    /!*<li>{data.is_active}</li>*!/*/}
            {/*</div>*/}
        </>
    );
};

export default UpdatePersonalData;
