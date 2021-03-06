import { Button, notification, Tabs, Form, Input } from 'antd'
import firebase from 'firebase';
import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { UserContext } from '../context/UserContext';
import { googleAuthProvider } from '../firebase/FirebaseConfig';

const { TabPane } = Tabs;
interface UserAuth {
    email: string;
    password: string;
}

function Login() {

    const { user, setUser } = useContext(UserContext);

    const signInWithGoogle = () => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                    name: user?.displayName,
                    image: user?.photoURL
                }
                setUser(userData);
            }).catch((err) => {
                notification.error({ message: err.message });
            });
    }

    const registerUser = ({ email, password }: UserAuth) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                    name: user?.email,
                    image: ""
                }
                setUser(userData);
            })
            .catch(e => {
                notification.error({ message: e.message });
            })
    }

    const loginUser = ({ email, password }: UserAuth) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                    name: user?.email,
                    image: ""
                }
                setUser(userData);
            })
            .catch(e => {
                notification.error({ message: e.message });
            })
    }

    return (
        <>
            {user?.uid !== undefined && <Redirect to="/home" />}

            <Tabs defaultActiveKey="1">
                <TabPane tab="Iniciar Sesi??n Con Google" key="1">
                    <Button type="primary" onClick={() => signInWithGoogle()}>Sign In Google</Button>
                </TabPane>
                <TabPane tab="Iniciar Sesi??n Usuario y Contrase??a" key="2">
                    <Form onFinish={loginUser}>
                        <Form.Item name="email">
                            <Input placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input.Password placeholder="password" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">Iniciar Sesi??n</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Registrarme" key="2">
                    <Form onFinish={registerUser}>
                        <Form.Item name="email">
                            <Input placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input.Password placeholder="password" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">Registrar Usuario</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </>
    )
}

export default Login
