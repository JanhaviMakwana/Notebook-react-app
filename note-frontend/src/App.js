import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { withState } from './note-context';
import * as actionTypes from './store/actionTypes';
import './App.css';

function PrivateRoutes({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />}
    />
  );
};

function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to="/" />}
    />
  );
};

class App extends React.Component {

  componentDidMount() {
    const user = localStorage.getItem('user');
    user && this.props.dispatch({ type: actionTypes.SET_AUTH_DATA, user: user });
    window.onunload = () => {
      localStorage.clear();
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <PublicRoute path="/auth" isAuthenticated={this.props.state.user ? true : false} component={Auth} />
          <PrivateRoutes path="/" isAuthenticated={this.props.state.user ? true : false} component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withState(App);
