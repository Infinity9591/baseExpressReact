import Sider from 'antd/es/layout/Sider.js';
import { ConfigProvider, Layout, Menu, notification, theme } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {useDispatch, useSelector} from 'react-redux';
import { setMyVariable } from '../../redux/reducers/menuStateSlice.js';
import { setSideBarState } from '../../redux/reducers/sideBarStateSlice.js';
import {getPersonalData} from '../../redux/reducers/getPersonalDataSlice.js'

const SideBar = (props) => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const menuState = useSelector((store) => store.menuState.state);
    const personalData = useSelector((store) => store.personalData);
    const sideBarState = useSelector((store) => store.sideBarState.state);

    useEffect(() => {
        async () => {
            try {
                dispatch(getPersonalData());
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch user data',
                });
            }
        };

    }, [dispatch]);

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
            show: personalData?.data?.role?.role_name === 'admin' ? true : false,
        },
    ];
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleMenuClick = ({ key }) => {
        dispatch(setSideBarState(key));
        dispatch(setMyVariable(false));
        setSelectedKeys(sideBarState);
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

                selectedKeys={menuState ? [] : sideBarState }
                // menuState === '' ? ["2"] :
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
