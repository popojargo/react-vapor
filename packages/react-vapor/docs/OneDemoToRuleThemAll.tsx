import * as React from 'react';
import {HashRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';

import {Components} from './src/components/Components';
import {Styles} from './src/styles/Styles';

function TopNav() {
    return (
        <div>
            <Link to="/styles" className="btn">
                Styles
            </Link>
            <Link to="/components" className="btn">
                Components
            </Link>
        </div>
    );
}

function Header() {
    return (
        <div id="header" className="header flex flex-center space-between p2" style={{minHeight: '65px'}}>
            <h1 className="h1">React Vapor</h1>
            <TopNav />
        </div>
    );
}

function Demo() {
    return (
        <Router>
            <Header />
            <div className="container flex-auto overflow-auto" style={{height: 'calc(100% - 65px)'}}>
                <Switch>
                    <Route path="/components" component={Components} />
                    <Route path="/styles" component={Styles} />
                    <Route exact path="/" component={() => <Redirect to="/components" />} />
                </Switch>
            </div>
        </Router>
    );
}

export const App = Demo;
