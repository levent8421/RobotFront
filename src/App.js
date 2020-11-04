import React, {Component} from 'react';
import './App.less';
import {HashRouter as Router} from 'react-router-dom';
import RootContent from './component/RootContent';


class App extends Component {
    render() {
        return (
            <Router>
                <RootContent/>
            </Router>
        );
    }
}

export default App;
