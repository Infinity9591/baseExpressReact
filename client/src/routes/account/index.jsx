import React, { useEffect, useState } from 'react';
import {
    Button,
    Divider,
    Flex,
    Form,
    Input,
    notification,
    Popconfirm,
    Select,
    Space,
    Spin,
    Table,
    Tag,
} from 'antd';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import { redirect, useNavigate } from 'react-router-dom';
const { Column, ColumnGroup } = Table;
import Create from './create.jsx';


const Index = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [dataAccounts, setDataAccounts] = useState([]);
    const [dataRoles, setDataRoles] = useState([]);
    const [count, setCount] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [dataPersonal, setDataPersonal] = useState();

    const showModal = () => {
        setIsModalCreateOpen(true);
    };

    const handleCancel = () => {
        setIsModalCreateOpen(false);
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleDelete = (id, is_active) => {
        try {
            if (is_active === 1) {
                axios
                    .patch(
                        '/account/deactive',
                        { id: id },
                        {
                            headers: {
                                Authorization:
                                    'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                            },
                        },
                    )
                    .then(() => {
                        notification.success({
                            message: 'Success',
                            // description: 'Failed to fetch user data',
                        });
                        setCount((prev) => prev + 1);
                    });
            } else if (is_active === 0) {
                axios
                    .patch(
                        '/account/active',
                        { id: id },
                        {
                            headers: {
                                Authorization:
                                    'Bearer ' + cookie['access-token'],
                            },
                        },
                    )
                    .then(() => {
                        notification.success({
                            message: 'Success',
                            // description: 'Failed to fetch user data',
                        });
                        setCount((prev) => prev + 1);
                    });
            }
        } catch (e) {
            notification.error({
                message: 'Error',
                // description: 'Failed to fetch user data',
            });
        }
    };

    const handleEdit = (record) => {
        setEditingRow(record.id); // Bắt đầu chỉnh sửa hàng có ID là record.id
    };

    const handleRoleChange = (value, record) => {
        // Cập nhật giá trị role_id của hàng tương ứng
        const updatedData = dataAccounts.map((item) => {
            if (item.id === record.id) {
                return { ...item, role_id: value };
            }
            return item;
        });
        setDataAccounts(updatedData);
    };

    const handleSave = async (record) => {
        // console.log(record.id,record.role_id);
        try {
            await axios.patch(
                '/account/editRole',
                { id: record.id, role_id: record.role_id },
                {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'],
                    },
                },
            );
            notification.success({
                message: 'Success',
                description: 'Cập nhật role thành công!',
            });
            setEditingRow(null); // Kết thúc chỉnh sửa
            setCount((prev) => prev + 1); // Làm mới dữ liệu
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Cập nhật role thất bại!',
            });
        }
    };

    const handleCancelEdit = () => {
        setEditingRow(null); // Bắt đầu chỉnh sửa hàng có ID là record.id
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const responsePersonal = await axios.get(
                    '/site/getPersonalInformation',
                    {
                        headers: {
                            Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                        },
                    },
                );
                setDataPersonal(responsePersonal.data);

                const responseAccounts = await axios.get('/account', {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                });
                setDataAccounts(responseAccounts.data);
                const responseRoles = await axios.get('/role', {
                    headers: {
                        Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                    },
                });
                setDataRoles(responseRoles.data);
            } catch (error) {
                navigate('/site/error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [count, refreshKey]);
    return (
        <>
            <Divider
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Quản lý tài khoản
            </Divider>
            {dataPersonal?.role.role_name === 'admin' ? (
                <Button
                    onClick={() => {
                        showModal();
                    }}
                >
                    Thêm tài khoản
                </Button>
            ) : null}
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
                            title: 'Tên đăng nhập',
                            dataIndex: 'username',
                            key: 'username',
                        },
                        {
                            title: 'Hoạt động',
                            dataIndex: 'is_active',
                            key: 'is_active',
                            render : (text, record, index) => (
                                record === 0 ? "Deacti  ve" : "Active"
                            )
                        },
                        {
                            title: 'Chức vụ',
                            dataIndex: 'id_role',
                            key: 'id_role',
                            width: '20%',
                            render: (text, record, index) =>
                                editingRow === record.id ? (
                                    <Select
                                        defaultValue={text}
                                        options={dataRoles.map((role) => ({
                                            value: role.id,
                                            label: role.role_name,
                                        }))}
                                        onChange={(value) =>
                                            handleRoleChange(value, record)
                                        }
                                    />
                                ) : (
                                    dataRoles.filter(
                                        (role) => role.id === record.id_role,
                                    )[0]?.role_name
                                ),
                        },
                        dataPersonal?.role.role_name === 'admin'
                            ? {
                                  title: 'Hành động',
                                  width: '25%',
                                  render: (text, record, index) => (
                                      <Space>
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
                                          <Popconfirm
                                              title={
                                                  record.is_active === 1
                                                      ? 'Deactive?'
                                                      : 'Active?'
                                              }
                                              onConfirm={() => {
                                                  handleDelete(
                                                      record.id,
                                                      record.is_active,
                                                  );
                                              }}
                                              okText={
                                                  record.is_active === 1
                                                      ? 'Deactive'
                                                      : 'Active'
                                              }
                                              cancelText="Hủy"
                                          >
                                              <Button>
                                                  {record.is_active === 1
                                                      ? 'Deactive'
                                                      : 'Active'}
                                              </Button>
                                          </Popconfirm>
                                      </Space>
                                  ),
                              }
                            : {},
                    ]}
                />
                <Create
                    key={count}
                    open={isModalCreateOpen}
                    handleCancel={handleCancel}
                    dataRoles={dataRoles}
                />
            </Spin>
        </>
    );
};

export default Index;
