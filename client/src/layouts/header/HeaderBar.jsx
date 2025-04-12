import { Header } from 'antd/es/layout/layout.js';
import {Button, Flex, Menu, theme} from 'antd';
import logo from '../../assets/React.png';
import SubMenu from 'antd/es/menu/SubMenu.js';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {data, Link} from 'react-router-dom';
import './HeaderBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMyVariable } from '../../redux/reducers/menuStateSlice.js';
import {getPersonalData} from '../../redux/reducers/getPersonalDataSlice.js'
import {setHeaderBarState} from '../../redux/reducers/headerBarStateSlice.js'
import {setSideBarState} from '../../redux/reducers/sideBarStateSlice.js'

const HeaderBar = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['access-token']);
    const dispatch = useDispatch();
    const menuState = useSelector((store) => store.menuState.state);
    const personalData = useSelector((store) => store.personalData);
    const headerBarState = useSelector((store) => store.headerBarState.state);
    const sideBarState = useSelector((store) => store.sideBarState.state);

    useEffect(() => {
        dispatch(getPersonalData());
    }, []);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleMenuClick = ({ key }) => {
        dispatch(setHeaderBarState(key));
        dispatch(setMyVariable(true));
        // setSelectedKeys(headerBarState);
    };

    return (
        <>
            <Button onClick={() => {
                console.log(menuState);
                console.log(personalData);
                console.log(headerBarState);
                console.log(sideBarState);
            }}/>

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
                    selectedKeys={!menuState ? [] : headerBarState}
                >
                    <SubMenu
                        key="user-menu"
                        title={personalData.data.person_name}
                        style={{
                            marginLeft: 'auto',
                        }}
                    >
                        <Menu.Item key="edit-info">
                            <Link
                                to="/site/updatePersonalData"
                                data={personalData.data}
                            >
                                Quản lý thông tin người dùng
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="amen">
                            <Link to="/site/changePassword" data={personalData.data}>
                                Đổi mật khẩu
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key="logout"
                            onClick={() => {
                                localStorage.clear();
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
