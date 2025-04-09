import Sider from 'antd/es/layout/Sider.js';
import { ConfigProvider, Layout, Menu, notification, theme } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setMyVariable } from '../../redux/reducers/menuSlice.js';

const SideBar = (props) => {
    const [cookie, setCookie, removeCookie] = useCookies();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    '/site/getPersonalInformation',
                    {
                        headers: {
                            Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                        },
                    },
                );
                setData(response.data);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch user data',
                });
            }
        };
        fetchData();
    }, []);

    const items = [
        // {
        //     key: 1,
        //     label: 'Công việc',
        //     // path : '/work'
        //     show : true
        //
        // },
        {
            key: 2,
            label: 'Home',
            path: '/home',
            show: true,
        },
        {
            key: 3,
            label: 'Nhân viên',
            path: '/user',
            show: true,
        },
        {
            key: 4,
            label: 'Quản lý tài khoản',
            path: '/account',
            show: true,
        },
        {
            key: 5,
            label: 'Chức vụ',
            path: '/role',
            show: data?.role.role_name === 'admin' ? true : false,
        },
    ];

    const dispatch = useDispatch();
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleMenuClick = ({ key }) => {
        setSelectedKeys([key]);
        dispatch(setMyVariable(false));
    };

    return (
        <Sider
            width={200}
            style={{
                background: colorBgContainer,
            }}
        >
            {/*<ConfigProvider*/}
            {/*    theme={{*/}
            {/*        components: {*/}
            {/*            Menu: {*/}
            {/*                itemHoverBg: "#52c41a", // Màu nền khi hover*/}
            {/*                itemHoverColor: "#ffffff", // Màu chữ khi hover*/}
            {/*                itemHover*/}
            {/*            },*/}
            {/*        },*/}
            {/*    }}*/}
            {/*>*/}
            <Menu
                mode="inline"
                onClick={handleMenuClick}
                selectedKeys={props.selected ? [] : selectedKeys}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
            >
                {items
                    .filter((item) => item.show)
                    .map((item) => (
                        <Menu.Item key={item.key}>
                            <Link to={item.path}>{item.label}</Link>
                        </Menu.Item>
                    ))}
            </Menu>
            {/*</ConfigProvider>*/}
        </Sider>
    );
};

export default SideBar;
