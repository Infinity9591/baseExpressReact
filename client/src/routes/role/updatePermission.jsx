import { Button, Checkbox, Modal, notification, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function capitalize(t, r, i) {
    return String(t[0]).toUpperCase() + String(t).slice(1);
}

function UpdatePermission(props) {
    const navigate = useNavigate();

    const [cookie, setCookie, removeCookie] = useCookies();

    const [checkedPermissions, setCheckedPermissions] = useState([]);
    const [initialCheckedPermissions, setInitialCheckedPermissions] = useState(
        [],
    );

    const handleOk = (initial, current) => {
        const deletePermissions = initial.filter(
            (object) => !current.includes(object),
        );
        const addPermissions = current.filter(
            (object) => !initial.includes(object),
        );

        try {
            // const addPermissions = [];
            // const deletePermissions = [];

            // addPermissions

            axios
                .post(
                    '/rolePermission/deletePermission',
                    deletePermissions.map((element) => ({
                        ...element,
                        role_id: props.dataRole.id,
                    })),
                    {
                        headers: {
                            Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                        },
                    },
                )
                .then(() => {
                    axios
                        .post(
                            '/rolePermission/addPermission',
                            addPermissions.map((element) => ({
                                ...element,
                                role_id: props.dataRole.id,
                            })),
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
                                description: 'Cập nhật dữ liệu thành công.',
                            });
                            props.handleCancel();
                        });
                });
        } catch (err) {
            notification.error({
                message: 'Error',
                description: 'Lôi',
            });
            console.log(err);
        }
    };

    useEffect(() => {
        const defaultChecked = [];
        props.dataTableLogs.forEach((record) => {
            props.dataPermission.forEach((element) => {
                const isChecked = props.dataRolesPermission.some(
                    (rolePermission) =>
                        rolePermission.role_id === props.dataRole?.id &&
                        rolePermission.table_name === record.table_name &&
                        rolePermission.permission_id === element.id,
                );
                if (isChecked) {
                    defaultChecked.push({
                        table_name: record.table_name,
                        permission_id: element.id,
                    });
                }
            });
        });
        setCheckedPermissions(defaultChecked); // Cập nhật state
        setInitialCheckedPermissions(defaultChecked); // Cập nhật initial state
    }, [
        props.dataTableLogs,
        props.dataPermission,
        props.dataRolesPermission,
        props.dataRole,
    ]);

    const handleCheckboxChange = (checked, table_name, permission_id) => {
        setCheckedPermissions((prev) => {
            if (checked) {
                return [...prev, { table_name, permission_id }];
            } else {
                return prev.filter(
                    (item) =>
                        item.table_name !== table_name ||
                        item.permission_id !== permission_id,
                );
            }
        });
    };

    return (
        <>
            <Modal
                open={props.open}
                title="Thêm phòng ban"
                onCancel={props.handleCancel}
                onOk={() => {
                    handleOk(initialCheckedPermissions, checkedPermissions);
                }}
            >
                <Table
                    dataSource={props.dataTableLogs}
                    columns={[
                        {
                            title: 'Nguồn tài nguyên',
                            dataIndex: 'table_name',
                            key: 'table_name',
                            render: (text, record, index) => capitalize(text),
                        },
                    ].concat(
                        props.dataPermission.map((element) => ({
                            title: capitalize(element.action_name),
                            dataIndex: element.action_name,
                            key: element.action_name,
                            render: (text, record, index) => (
                                <Space>
                                    <Checkbox
                                        defaultChecked={
                                            props.dataRolesPermission
                                                .filter(
                                                    (rolePermission) =>
                                                        rolePermission.role_id ===
                                                        props.dataRole.id,
                                                )
                                                .filter(
                                                    (_rolePermission) =>
                                                        _rolePermission.table_name ===
                                                        record.table_name,
                                                )
                                                .filter(
                                                    (__rolePermission) =>
                                                        __rolePermission.permission_id ===
                                                        element.id,
                                                ).length !== 0
                                                ? true
                                                : false
                                        }
                                        onChange={(e) => {
                                            handleCheckboxChange(
                                                e.target.checked,
                                                record.table_name,
                                                element.id,
                                            );
                                        }}
                                    />
                                </Space>
                            ),
                        })),
                    )}
                />
            </Modal>
        </>
    );
}

export default UpdatePermission;
