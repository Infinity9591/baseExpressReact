import { Layout } from 'antd';
import HeaderBar from './header/HeaderBar.jsx';
import FooterBar from './footer/FooterBar.jsx';
// import Main from '../routes/main.jsx';
import SideBar from './sidebar/SideBar.jsx';
import { useSelector } from 'react-redux';
import Main from "../routes/main.jsx";

const Index = () => {

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <HeaderBar  />
            <Layout>
                <SideBar  />
                {/*<Layout>*/}
                {/*    <Main />*/}
                {/*</Layout>*/}
            </Layout>
            <FooterBar />
        </Layout>
    );
};

export default Index;
