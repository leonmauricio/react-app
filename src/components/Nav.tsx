import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useHistory } from "react-router-dom";

const { Item } = Menu;

function Nav() {
    const { setUser } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        setUser({});
        history.push("/home");
    }

    return (
        <>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Item key={1}>
                    <NavLink to="/home">Home
                    </NavLink>
                </Item>
                <Item key={2}>
                    <NavLink to="/list">All Cards</NavLink>
                </Item>
                {user?.uid !== undefined && <Item key={3}>
                    <span onClick={() => logout()}> Logout </span>
                </Item>}
            </Menu>
        </>
    )
}

export default Nav
