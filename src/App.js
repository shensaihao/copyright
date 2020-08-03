import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.styl';
import Tabbar from './pages/Tabbar';
import Footer from './pages/Footer';
import Home from './pages/home/Home';
import Certification from './pages/certificationome/Certification';
import Original from './pages/original/Original'


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
                        <Route path="/home" component={Home} />
                        <Route path="/certification" component={Certification} />
                        <Route path="/original" component={Original} />
                        <Route path="*" component={RedirectComponent} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default hot(App);
