import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider,
    Input,
    notification,
    Select,
    Space,
    Spin,
    Table,
    Tag,
} from 'antd';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
const { Column, ColumnGroup } = Table;
import UpdatePermission from './updatePermission.jsx';
import { useNavigate } from 'react-router-dom';
import Create from './create.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUser } from '../../redux/reducers/personalDataSlice.js';

const Index = () => {
    const navigate = useNavigate();

    const [cookie, setCookie, removeCookie] = useCookies();
    const [dataRoles, setDataRoles] = useState([]);
    const [dataPermissions, setDataPermissions] = useState([]);
    const [dataPermissionForRole, setDataPermissionForRole] = useState([]);
    const [dataTableLogs, setDataTableLogs] = useState([]);
    const [dataRole, setDataRole] = useState([]);
    const [isModalPermissionOpen, setIsModalPermissionOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingRow, setEditingRow] = useState(null);
    const [count, setCount] = useState(0);
    const [dataName, setDataName] = useState();

    const showModalPermission = () => {
        setIsModalPermissionOpen(true);
    };

    const showModalCreate = () => {
        setIsModalCreateOpen(true);
    };

    const handleCancelPermission = () => {
        setIsModalPermissionOpen(false);
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleCancelCreate = () => {
        setIsModalCreateOpen(false);
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleEdit = (record) => {
        setEditingRow(record.id); // Bắt đầu chỉnh sửa hàng có ID là record.id
        setDataName(record)
    };


    const handleSave = async (record) => {
        // console.log(dataName);
        try {
            await axios.post(
                '/role/update',
                dataName,
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

    const handleNameChange = (value, record) => {
        setDataName((prevData) => ({ ...prevData, [value.target.name]: value.target.value }));

    };

    const handleCancelEdit = () => {
        setEditingRow(null); // Bắt đầu chỉnh sửa hàng có ID là record.id
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
                    '/permissionsForRole',
                    {
                        headers: {
                            Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                        },
                    },
                );
                setDataPermissionForRole(responseRolesPermissions.data);

                const responseTableLogs = await axios.get(
                    '/site/getSourceName',
                    {
                        headers: {
                            Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                        },
                    },
                );
                setDataTableLogs(responseTableLogs.data);

                const responsePersonalData = await axios.get('/site/getPersonalInformation', {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                });
                // setDataPersonal(responsePersonalData?.data);
                if (responsePersonalData?.data?.role.role_name !== "admin") navigate('/site/error')
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
    }, [refreshKey, count]);
    return (
        <>
            <Divider
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Quản lý chức vụ
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
                            dataIndex: 'role_name',
                            key: 'role_name',
                            width: '40%',
                            render: (text, record, index) =>
                                editingRow === record.id ? (
                                    <Input
                                        defaultValue={text}
                                        name={"name"}
                                        onChange={(value) => {
                                            handleNameChange(value, record);
                                        }}
                                    />
                                ) : (
                                    text
                                ),
                        },
                        {
                            title: 'Action',
                            width: '25%',
                            render: (text, record, index) => (
                                <Space>
                                    <Button
                                        onClick={() => {
                                            setDataRole(record);
                                            showModalPermission();
                                        }}
                                    >
                                        Quyền hạn
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
                                            onClick={() => handleEdit(record)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    {/*<Button>Delete</Button>*/}
                                </Space>
                            ),
                        },
                    ]}
                />
                <UpdatePermission
                    key={dataRole?.id}
                    open={isModalPermissionOpen}
                    handleCancelPermission={handleCancelPermission}
                    dataPermission={dataPermissions}
                    dataPermissionForRole={dataPermissionForRole}
                    dataTableLogs={dataTableLogs}
                    dataRole={dataRole}
                />
                <Create
                    // key={count}
                    open={isModalCreateOpen}
                    handleCancelCreate={handleCancelCreate}
                    dataRoles={dataRoles}
                />
            </Spin>
        </>
    );
};

export default Index;
