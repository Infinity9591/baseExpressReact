import { Route, Routes } from 'react-router-dom';
import UpdatePersonalData from '../site/updatePersonalData.jsx';
import IndexUser from '../routes/user/index.jsx';
import IndexAccount from '../routes/account/index.jsx';
import IndexRole from '../routes/role/index.jsx';
import ErrorPage from '../site/error.jsx';
import ChangePassword from '../site/changePassword.jsx';
import Home from '../routes/home/index.jsx';
import { theme } from 'antd';
import { Content } from 'antd/es/layout/layout.js';

function Main() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Routes>
                        <Route
                            path="/site/updatePersonalData"
                            element={<UpdatePersonalData />}
                        />
                        {/*<Route path="/user" element={<IndexUser />} />*/}
                        {/*<Route path="/account" element={<IndexAccount />} />*/}
                        {/*<Route path="/role" element={<IndexRole />} />*/}
                        <Route path="/site/error" element={<ErrorPage />} />
                        <Route
                            path="/site/changePassword"
                            element={<ChangePassword />}
                        />
                        <Route path="/home" element={<Home />} />
                        {/*<Route path="position" element={ <IndexPosition />}/>*/}
                        {/*<Route path="user" element={ <IndexUser />}/>*/}
                        {/*<Route path="account" element={ <IndexAccount />}/>*/}
                    </Routes>
                </div>
            </Content>
        </>
    );
}

export default Main;
