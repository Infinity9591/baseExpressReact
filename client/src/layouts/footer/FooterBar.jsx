import { Footer } from 'antd/es/layout/layout.js';
import logo from '../../assets/Node.js.png';

const FooterBar = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Base Express + React Created by
            <img
                src={logo}
                alt={'logo google'}
                style={{
                    width: '50px',
                }}
            />
        </Footer>
    );
};

export default FooterBar;
