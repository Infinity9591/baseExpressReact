import React, { useEffect, useState } from 'react';
import { Button, notification, Space, Spin, Table, Tag } from 'antd';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import { redirect, useNavigate } from 'react-router-dom';
const { Column, ColumnGroup } = Table;

const Index = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [dataAccounts, setDataAccounts] = useState([]);
    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(false);

    const handleDelete = (id, is_active) => {
        try {
            if (is_active === 1){
                axios.post('/account/deactive', {id : id}, {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                }).then(() => {
                    notification.success({
                        message: 'Success',
                        // description: 'Failed to fetch user data',
                    });
                    setCount(prev => prev + 1);
                });
            } else if (is_active === 0){
                axios.post('/account/active', {id : id}, {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                }).then(() => {
                    notification.success({
                        message: 'Success',
                        // description: 'Failed to fetch user data',
                    });
                    setCount(prev => prev + 1);
                });
            }
        } catch (e) {
            notification.error({
                message: 'Error',
                // description: 'Failed to fetch user data',
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/account', {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                });
                setDataAccounts(response.data);
            } catch (error) {
                // notification.error({
                //     message: 'Error',
                //     description: 'Failed to fetch user data',
                // });
                navigate('/site/error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [count]);
    return (
        <>
            <Spin spinning={loading}>
                <Table
                    dataSource={dataAccounts}
                    columns={[
                        {
                            title: 'STT',
                            dataIndex: 'index',
                            key: 'index',
                            width: '1%',
                            render: (text, record, index) => index + 1,
                        },
                        {
                            title: 'Username',
                            dataIndex: 'username',
                            key: 'username',
                        },
                        {
                            title: 'Password',
                            dataIndex: 'password_hash',
                            key: 'password_hash',
                        },
                        {
                            title: 'is_active',
                            dataIndex: 'is_active',
                            key: 'is_active',
                        },
                        {
                            title: 'role_id',
                            dataIndex: 'role_id',
                            key: 'role_id',
                        },
                        {
                            title: 'Action',
                            width: '5%',
                            render: (text, record, index) => (
                                <Space>
                                    <Button
                                        onClick={() => {
                                            // console.log(
                                            //     dataAccounts.filter(
                                            //         (dataAccount) =>
                                            //             dataAccount.id ===
                                            //             record.account_id,
                                            //     )[0].username,
                                            // );
                                        }}
                                    >
                                        Detail
                                    </Button>
                                    <Button onClick={() => {}}>Edit</Button>
                                    <Button onClick={() => { handleDelete(record.id, record.is_active)}}>{record.is_active === 1 ? "Deactive" : "Active"}</Button>
                                </Space>
                            ),
                        },
                    ]}
                />
            </Spin>
        </>
    );
};

export default Index;
