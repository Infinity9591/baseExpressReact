import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider, Input,
    notification,
    Popconfirm,
    Space,
    Spin,
    Table,
    Tag,
} from 'antd';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import Create from '../user/create.jsx';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    // const [dataUsers, setDataUsers] = useState([]);
    const [dataAccounts, setDataAccounts] = useState([]);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [dataEdit, setDataEdit] = useState({
        id : "",
        name: "",
        phone_number: "",
        email: "",
        address: "",
        account_id: null,
    });

    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    const handleCancelCreate = () => {
        setIsModalCreateOpen(false);
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleEdit = (record) => {
        setEditingRow(record.id); // Bắt đầu chỉnh sửa hàng có ID là record.id
        setDataEdit(record)
    };

    const handleCancelEdit = () => {
        setEditingRow(null); // Bắt đầu chỉnh sửa hàng có ID là record.id
    };

    const handleInputChange = (value, record) => {
        setDataEdit((prevData) => ({ ...prevData, [value.target.name]: value.target.value }));

    };
    const handleSave = async (record) => {
        // console.log(dataEdit);
        try {
            await axios.post(
                '/user/update',
                dataEdit,
                {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'],
                    },
                },
            );
            notification.success({
                message: 'Success',
                description: 'Cập nhật tên thành công!',
            });
            setEditingRow(null); // Kết thúc chỉnh sửa
            setCount((prev) => prev + 1); // Làm mới dữ liệu
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Cập nhật tên thất bại!',
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // const responseUsers = await axios.get('/', {
                //     headers: {
                //         Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                //     },
                // });
                // setDataUsers(responseUsers.data);
                const responseAccounts = await axios.get('/account', {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                });
                setDataAccounts(responseAccounts.data);
            } catch (error) {
                console.log(error)
                navigate('/site/error');
                // notification.error({
                //     message: 'Error',
                //     description: 'Failed to fetch user data',
                // });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [refreshKey, count]);
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
                Thêm nhân viên
            </Button>
            <Divider
                style={{
                    borderColor: '#7cb305',
                    borderWidth: '1px',
                }}
            />
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
                            title: 'Name',
                            dataIndex: 'person_name',
                            key: 'person_name',
                            render: (text, record, index) =>
                                editingRow === record.id ? (
                                    // <Select
                                    //     defaultValue={text}
                                    //     options={dataRoles.map((role) => ({
                                    //         value: role.id,
                                    //         label: role.name,
                                    //     }))}
                                    //     onChange={(value) =>
                                    //         handleRoleChange(value, record)
                                    //     }
                                    // />
                                    <Input
                                        defaultValue={text}
                                        name={'name'}
                                        onChange={(value) => {
                                            handleInputChange(value, record);
                                        }}
                                    />
                                ) : (
                                    text
                                ),
                        },
                        {
                            title: 'Birthday',
                            dataIndex: 'birthday',
                            key: 'birthday',
                            render: (text, record, index) =>
                                editingRow === record.id ? (
                                    // <Select
                                    //     defaultValue={text}
                                    //     options={dataRoles.map((role) => ({
                                    //         value: role.id,
                                    //         label: role.name,
                                    //     }))}
                                    //     onChange={(value) =>
                                    //         handleRoleChange(value, record)
                                    //     }
                                    // />
                                    <Input
                                        defaultValue={text}
                                        name={'birthday'}
                                        onChange={(value) => {
                                            handleInputChange(value, record);
                                        }}
                                    />
                                ) : (
                                    text
                                ),
                        },
                        {
                            title: 'Phone Number',
                            dataIndex: 'phone_number',
                            key: 'phone_number',
                            render: (text, record, index) =>
                                editingRow === record.id ? (
                                    // <Select
                                    //     defaultValue={text}
                                    //     options={dataRoles.map((role) => ({
                                    //         value: role.id,
                                    //         label: role.name,
                                    //     }))}
                                    //     onChange={(value) =>
                                    //         handleRoleChange(value, record)
                                    //     }
                                    // />
                                    <Input
                                        defaultValue={text}
                                        name={'phone_number'}
                                        onChange={(value) => {
                                            handleInputChange(value, record);
                                        }}
                                    />
                                ) : (
                                    text
                                ),
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email',
                            key: 'email',
                            render: (text, record, index) =>
                                editingRow === record.id ? (
                                    // <Select
                                    //     defaultValue={text}
                                    //     options={dataRoles.map((role) => ({
                                    //         value: role.id,
                                    //         label: role.name,
                                    //     }))}
                                    //     onChange={(value) =>
                                    //         handleRoleChange(value, record)
                                    //     }
                                    // />
                                    <Input
                                        name={'email'}
                                        defaultValue={text}
                                        onChange={(value) => {
                                            handleInputChange(value, record);
                                        }}
                                    />
                                ) : (
                                    text
                                ),
                        },
                        {
                            title: 'Address',
                            dataIndex: 'address',
                            key: 'address',
                            render: (text, record, index) =>
                                editingRow === record.id ? (
                                    // <Select
                                    //     defaultValue={text}
                                    //     options={dataRoles.map((role) => ({
                                    //         value: role.id,
                                    //         label: role.name,
                                    //     }))}
                                    //     onChange={(value) =>
                                    //         handleRoleChange(value, record)
                                    //     }
                                    // />
                                    <Input
                                        name={'address'}
                                        defaultValue={text}
                                        onChange={(value) => {
                                            handleInputChange(value, record);
                                        }}
                                    />
                                ) : (
                                    text
                                ),
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
                                    {editingRow === record.id ? (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    handleSave(record)
                                                }
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleCancelEdit()
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                handleEdit(record)
                                            }
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    {/*<Popconfirm*/}
                                    {/*    title="Bạn có chắc chắn muốn xóa?"*/}
                                    {/*    // onConfirm={() => handleDelete(record.key)}*/}
                                    {/*    okText="Xóa"*/}
                                    {/*    cancelText="Hủy"*/}
                                    {/*>*/}
                                    {/*    <Button>Delete</Button>*/}
                                    {/*</Popconfirm>*/}
                                </Space>
                            ),
                        },
                    ]}
                />
                <Create
                    key={count}
                    open={isModalCreateOpen}
                    handleCancelCreate={handleCancelCreate}
                    dataAccounts={dataAccounts}
                />
            </Spin>
        </>
    );
};

export default Index;
