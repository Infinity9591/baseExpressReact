import React, { useEffect, useState } from 'react';
import { Button, notification, Space, Spin, Table, Tag } from 'antd';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
const { Column, ColumnGroup } = Table;
import UpdatePermission from './updatePermission.jsx';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    const [cookie, setCookie, removeCookie] = useCookies();
    const [dataRoles, setDataRoles] = useState([]);
    const [dataPermissions, setDataPermissions] = useState([]);
    const [dataRolesPermissions, setDataRolesPermissions] = useState([]);
    const [dataTableLogs, setDataTableLogs] = useState([]);
    const [dataRole, setDataRole] = useState([]);
    const [isModalPermissionOpen, setIsModalPermissionOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [dataPersonal, setDataPersonal] = useState();

    const showModal = () => {
        setIsModalPermissionOpen(true);
    };

    const handleCancel = () => {
        setIsModalPermissionOpen(false);
    };

    const handleOk = () => {
        setIsModalPermissionOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const responseRoles = await axios.get('/role', {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                });
                setDataRoles(responseRoles.data);

                const responsePermissions = await axios.get('/permission', {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                });
                setDataPermissions(responsePermissions.data);

                const responseRolesPermissions = await axios.get(
                    '/rolePermission',
                    {
                        headers: {
                            Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                        },
                    },
                );
                setDataRolesPermissions(responseRolesPermissions.data);

                const responseTableLogs = await axios.get(
                    '/tableLog/getTableLogs',
                    {
                        headers: {
                            Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                        },
                    },
                );
                setDataTableLogs(responseTableLogs.data);

                await axios.get(
                    '/site/getPersonalInformation',
                    {
                        headers: {
                            Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                        },
                    },
                );
                // setDataPersonal(responsePersonalData.data);
            } catch (error) {
                // notification.error({
                //     message: 'Error',
                //     description: 'Failed to fetch user data',
                // });
                navigate('/site/error')
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
                    dataSource={dataRoles}
                    columns={[
                        {
                            title: 'STT',
                            dataIndex: 'index',
                            key: 'index',
                            width: '1%',
                            render: (text, record, index) => index + 1,
                        },
                        {
                            title: 'Mã',
                            dataIndex: 'id',
                            key: 'id',
                        },
                        {
                            title: 'Tên',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: 'Action',
                            width: '5%',
                            render: (text, record, index) => (
                                <Space>
                                    <Button
                                        onClick={() => {
                                            setDataRole(record);
                                            showModal();
                                        }}
                                    >
                                        Quyền hạn
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            console.log(record);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button>Delete</Button>
                                </Space>
                            ),
                        },
                    ]}
                />
                <UpdatePermission
                    key={dataRole?.id}
                    open={isModalPermissionOpen}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    dataPermission={dataPermissions}
                    dataRolesPermission={dataRolesPermissions}
                    dataTableLogs={dataTableLogs}
                    dataRole={dataRole}
                />
            </Spin>
        </>
    );
};

export default Index;
