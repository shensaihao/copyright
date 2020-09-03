import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.styl';
import Tabbar from './pages/Tabbar';
import Footer from './pages/Footer';
import Works from './pages/home/Home';
import Dashboard from './pages/dashboard/Home'
import Certification from './pages/certificationome/Certification'
import Original from './pages/original/Original'
import Login from './pages/login/Login'
import OriginalList from './pages/originalList/OriginalList'
import CopyrightList from './pages/copyrightList/CopyrightList'
import CopyrightDetail from './pages/copyrightDetail/CopyrightDetail';
import OriginalDetail from './pages/copyrightDetail/OriginalDetail';
import ChangePhone from './pages/phone/ChangePhone'
import WorksList from './pages/works/WorksList';
import WorksDetail from './pages/copyrightDetail/WorksDetail';


const RedirectComponent = () => (
    <Redirect to="/home" />
);

function App() {
    return (
        <div className="main">
            <Router>
                <Tabbar />
                <div className="content">
                    <Switch>
                        {/* 作品授权 */}
                        <Route path="/works" component={Works} />
                        {/* 首页 */}
                        <Route path="/home" component={Dashboard} />
                        {/* 实名认证 */}
                        <Route path="/certification" component={Certification} />
                        {/* 登录 */}
                        <Route path="/login" component={Login} />
                        {/* 过程 */}
                        <Route path="/original" component={Original} />
                        {/* 原创登记列表 */}
                        <Route path="/originallist" component={OriginalList} />
                        {/* 作品登记列表 */}
                        <Route path="/copyrightlist" component={CopyrightList} />
                        {/* 原创登记详情 */}
                        <Route path="/worksdetail" component={WorksDetail} />
                        {/* 作品登记详情 */}
                        <Route path="/originaldetail" component={OriginalDetail} />
                        {/* 更改手机号 */}
                        <Route path="/userphone" component={ChangePhone} />
                        {/* 公开作品列表 */}
                        <Route path="/workslist" component={WorksList} />
                        {/* 其他 */}
                        <Route path="*" component={RedirectComponent} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default hot(App);
