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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getAccounts} from '../../redux/reducers/getAccountsSlice.js'

const Index = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingRow, setEditingRow] = useState(null);
    const [dataEdit, setDataEdit] = useState();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.accounts);

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
        try {
            const {username, ...data} = dataEdit;
            await axios.patch(
                '/account/editInformation',
                data,
                {
                    // headers: {
                    //     Authorization: 'Bearer ' + cookie['access-token'],
                    // },
                },
            );
            notification.success({
                message: 'Success',
                description: 'Cập nhật tên thành công!',
            });
            setEditingRow(null); // Kết thúc chỉnh sửa
            setCount((prev) => prev + 1); // Làm mới dữ liệu
            // console.log(data)
        } catch (error) {
            console.log(error);
            notification.error({
                message: 'Error',
                description: 'Cập nhật tên thất bại!',
            });
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                dispatch(getAccounts());
            } catch (error) {
                console.log(error)
                navigate('/site/error');
                // notification.error({
                //     message: 'Error',
                //     description: 'Failed to fetch user data',
                // });
            }
        };
        fetchData();
    }, [refreshKey, count, dispatch]);

    return (
        <>
            <Divider
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Quản lý nhân viên
            </Divider>

            <Spin spinning={state.isLoading}>
                <Table
                    dataSource={Array.isArray(state.data) ? state.data : []}
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
            </Spin>
        </>
    );
};

export default Index;
