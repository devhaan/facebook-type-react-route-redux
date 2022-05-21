import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login , clearErrorAlert } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  
  componentWillMount() {
    this.props.dispatch(clearErrorAlert());
  }
  
  HandleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  HandlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('this.emailInputRef', this.emailInputRef);
    // console.log('this.passwordInputRef', this.passwordInputRef);
    console.log('this.state', this.state);
    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, inProgress ,isLoggedin} = this.props.auth;
    if (isLoggedin) {
      return <Navigate replace to="/" />;
    }
    return (
      <div>
        <form className="login-form">
          <span className="login-signup-header">Log In</span>
          {error && <div className="alert error-dailog">{error}</div>}
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={this.HandleEmailChange}
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={this.HandlePasswordChange}
            />
          </div>
          <div className="field">
            {inProgress ? (
              <button onClick={this.handleFormSubmit} disabled={inProgress}>
                Logging in...
              </button>
            ) : (
              <button onClick={this.handleFormSubmit} disabled={inProgress}>
                Log In
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
