import Login from './site/login.jsx';
import { Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Index from './layouts/index.jsx';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const App = () => {
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const token = cookie['access-token'];

    // useEffect(() => {
    //     const token = cookie['access-token'];
    //     if (!token) {
    //         navigate('/site/login'); // Chuyển hướng về trang đăng nhập nếu không có token
    //     }
    // }, [navigate]);

    return (
        <>
            <Routes>
                <Route
                    path="/site/login"
                    element={
                        !token ? <Login /> : <Navigate to="/home" replace />
                    }
                />
                <Route
                    path="/"
                    element={
                        token ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <Navigate to="/site/login" replace />
                        )
                    }
                />
                <Route
                    path="/*"
                    element={
                        token ? (
                            <Index />
                        ) : (
                            <Navigate to="/site/login" replace />
                        )
                    }
                />
            </Routes>
        </>
    );
};

export default App;
