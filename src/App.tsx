import "./App.css";
import AllCards from "./components/AllCards";
import CardDetail from "./components/CardDetail";
import NotFoundComponent from "./components/NotFoundComponent";
import Nav from "./components/Nav";
import { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import 'antd/dist/antd.css'
import FavoriteList from "./components/FavoriteList";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";

const { Header, Content, Footer } = Layout;

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        <Layout className="layout">
          <Header>
            <Nav />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Switch>
                <Route path="/home">
                  {user?.uid !== undefined ? <FavoriteList /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/list" component={AllCards} />
                <Route path="/list/:id" component={CardDetail} />
                <Route path="/login" component={Login}/>
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ borderTop: '1px solid #e8e8e8',
                  position: 'fixed',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  backgroundColor: 'white',
                  textAlign: 'center'}} >Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Router>
    </>
  );
}

export default App;
