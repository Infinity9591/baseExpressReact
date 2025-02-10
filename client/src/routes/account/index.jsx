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

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {

    }

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
    }, []);
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
                                    <Button onClick={() => {}}>Delete</Button>
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
