import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider,
    notification,
    Popconfirm,
    Space,
    Spin,
    Table,
    Tag,
} from 'antd';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';

const Index = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [dataUsers, setDataUsers] = useState([]);
    const [dataAccounts, setDataAccounts] = useState([]);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(false);

    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    const handleCancelCreate = () => {
        setIsModalCreateOpen(false);
        setRefreshKey((prevKey) => prevKey + 1);
    };

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
    }, [refreshKey]);
    return (
        <>
            <Divider
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Quản lý nhân viên
            </Divider>
            <Button
                onClick={() => {
                    showModalCreate();
                }}
            >
                Thêm chức vụ
            </Button>
            <Divider
                style={{
                    borderColor: '#7cb305',
                    borderWidth: '1px',
                }}
            />
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
                        // {
                        //     title: 'Account',
                        //     dataIndex: 'account_id',
                        //     key: 'account_id',
                        //     render: (text, record, index) =>
                        //         dataAccounts.filter(
                        //             (dataAccount) =>
                        //                 dataAccount.id === record.account_id,
                        //         )[0]?.username,
                        // },
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
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa?"
                                        // onConfirm={() => handleDelete(record.key)}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <Button>Delete</Button>
                                    </Popconfirm>
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
