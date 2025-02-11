import { useCookies } from 'react-cookie';
import { Form, Modal } from 'antd';

const Create = (props) => {
    const [cookie, setCookie, removeCookie] = useCookies();

    return (
        <>
            <Modal
                open={props.open}
                onCancel={props.handleCancel}
                title="Thêm tài khoản"
                onOk={() => {
                    // handleAddAccount();
                }}
            >
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    autoComplete="off"
                ></Form>
            </Modal>
        </>
    );
};

export default Create;
