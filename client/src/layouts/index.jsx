import { Layout } from 'antd';
import HeaderBar from './header/HeaderBar.jsx';
import FooterBar from './footer/FooterBar.jsx';
import Main from '../routes/main.jsx';
import SideBar from './sidebar/SideBar.jsx';
import { useSelector } from 'react-redux';

const Index = () => {
    const myVariable = useSelector((state) => state.myState.state);

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <HeaderBar selected={myVariable} />
            <Layout>
                <SideBar selected={myVariable} />
                <Layout>
                    <Main />
                </Layout>
            </Layout>
            <FooterBar />
        </Layout>
    );
};

export default Index;
