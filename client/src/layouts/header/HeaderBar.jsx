import { Header } from 'antd/es/layout/layout.js';
import { Flex, Menu, theme } from 'antd';
import logo from '../../assets/React.png';
import SubMenu from 'antd/es/menu/SubMenu.js';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios.customize.js';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './HeaderBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMyVariable } from '../../redux/reducers/menuSlice.js';

const items = [
    {
        key: 1,
        label: 'Công việc',
        // path : '/work'
    },
    {
        key: 2,
        label: 'Phòng ban',
        // path : '/department'
    },
    {
        key: 3,
        label: 'Nhân viên',
        // path : '/user'
    },
    {
        key: 4,
        label: 'Quản lý tài khoản',
        path: '/account',
    },
    {
        key: 5,
        label: 'Phân quyền',
        // path : '/permission'
    },
    {
        key: 6,
        label: 'Chức vụ',
        // path : '/position'
    },
];

const HeaderBar = (props) => {
    const [cookie, setCookie, removeCookie] = useCookies(['access-token']);

    const [username, setUsername] = useState('');

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios
            .get('/site/getPersonalInformation', {
                headers: {
                    Authorization: 'Bearer ' + cookie['access-token'], //the token is a variable which holds the token
                },
            })
            .then((res) => {
                setDatas(res.data);
            });
    }, []);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const dispatch = useDispatch();
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleMenuClick = ({ key }) => {
        setSelectedKeys([key]);
        dispatch(setMyVariable(true));
    };

    return (
        <>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={logo}
                    alt={'logo google'}
                    style={{
                        width: '150px',
                    }}
                />
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{
                        display: 'flex',
                        flex: 1,
                    }}
                    onClick={handleMenuClick}
                    selectedKeys={!props.selected ? [] : selectedKeys}
                >
                    <SubMenu
                        key="user-menu"
                        title={datas.username} // The title of the dropdown
                        style={{
                            marginLeft: 'auto',
                        }}
                    >
                        <Menu.Item key="edit-info">
                            <Link
                                to="/site/editPersonalInformation"
                                data={datas}
                            >
                                Quản lý thông tin người dùng
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="amen">
                            <Link to="/site/changePassword" data={datas}>
                                Đổi mật khẩu
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key="logout"
                            onClick={() => {
                                removeCookie('access-token');
                            }}
                        >
                            Đăng xuất
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        </>
    );
};

export default HeaderBar;
