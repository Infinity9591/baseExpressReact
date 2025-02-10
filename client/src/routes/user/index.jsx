import React, { useEffect, useState } from 'react';
import { Button, notification, Space, Spin, Table, Tag } from 'antd';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';

const Index = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [dataUsers, setDataUsers] = useState([]);
    const [dataAccounts, setDataAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responseUsers = await axios.get('/user', {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                });
                setDataUsers(responseUsers.data);
                // const responseAccounts = await axios.get('/account', {
                //     headers: {
                //         Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                //     },
                // });
                // setDataAccounts(responseAccounts.data);
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
    }, []);
    return (
        <>
            <Spin spinning={loading}>
                <Table
                    dataSource={dataUsers}
                    columns={[
                        {
                            title: 'STT',
                            dataIndex: 'index',
                            key: 'index',
                            width: '1%',
                            render: (text, record, index) => index + 1,
                        },
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Phone Number',
                            dataIndex: 'phone_number',
                            key: 'phone_number',
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email',
                            key: 'email',
                        },
                        {
                            title: 'Address',
                            dataIndex: 'address',
                            key: 'address',
                        },
                        {
                            title: 'Account',
                            dataIndex: 'account_id',
                            key: 'account_id',
                            render: (text, record, index) =>
                                dataAccounts.filter(
                                    (dataAccount) =>
                                        dataAccount.id === record.account_id,
                                )[0]?.username,
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
                                    <Button>Delete</Button>
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
