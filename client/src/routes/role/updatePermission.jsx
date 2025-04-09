import { Button, Checkbox, Modal, notification, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function capitalize(t, r, i) {
    return t ? t[0].toUpperCase() + t.slice(1) : ''
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
                    '/permissionsForRole/deletePermission',
                    deletePermissions.map((element) => ({
                        ...element,
                        id_role: props.dataRole.id,
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
                            '/permissionsForRole/addPermission',
                            addPermissions.map((element) => ({
                                ...element,
                                id_role: props.dataRole.id,
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
                            props.handleCancelPermission();
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
                const isChecked = props.dataPermissionForRole.some(
                    (rolePermission) =>
                        rolePermission.id_role === props.dataRole?.id &&
                        rolePermission.source_name === record.source_name &&
                        rolePermission.id_permission === element.id,
                );
                if (isChecked) {
                    defaultChecked.push({
                        source_name: record.source_name,
                        id_permission: element.id,
                    });
                }
            });
        });
        setCheckedPermissions(defaultChecked); // Cập nhật state
        setInitialCheckedPermissions(defaultChecked); // Cập nhật initial state
    }, [
        props.dataTableLogs,
        props.dataPermission,
        props.dataPermissionForRole,
        props.dataRole,
    ]);

    const handleCheckboxChange = (checked, source_name, id_permission) => {
        setCheckedPermissions((prev) => {
            if (checked) {
                return [...prev, { source_name, id_permission }];
            } else {
                return prev.filter(
                    (item) =>
                        item.source_name !== source_name ||
                        item.id_permission !== id_permission,
                );
            }
        });
    };

    return (
        <>
            <Modal
                open={props.open}
                title="Thêm phòng ban"
                onOk={() => {
                    handleOk(initialCheckedPermissions, checkedPermissions);
                }}
                onCancel={props.handleCancelPermission}
                // key={props.key}
            >
                <Table
                    dataSource={props.dataTableLogs}
                    columns={[
                        {
                            title: 'Nguồn tài nguyên',
                            dataIndex: 'source_name',
                            key: 'source_name',
                            render: (text, record, index) => capitalize(text),
                        },
                    ].concat(
                        props.dataPermission.map((element) => ({
                            title: capitalize(element.permission_name),
                            dataIndex: element.permission_name,
                            key: element.permission_name,
                            render: (text, record, index) => (
                                <Space>
                                    <Checkbox
                                        defaultChecked={
                                            props.dataPermissionForRole
                                                .filter(
                                                    (rolePermission) =>
                                                        rolePermission.id_role ===
                                                        props.dataRole.id,
                                                )
                                                .filter(
                                                    (_rolePermission) =>
                                                        _rolePermission.source_name ===
                                                        record.source_name,
                                                )
                                                .filter(
                                                    (__rolePermission) =>
                                                        __rolePermission.id_permission ===
                                                        element.id,
                                                ).length !== 0
                                                ? true
                                                : false
                                        }
                                        onChange={(e) => {
                                            handleCheckboxChange(
                                                e.target.checked,
                                                record.source_name,
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
