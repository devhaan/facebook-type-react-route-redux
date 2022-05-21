import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { fetchPosts } from '../actions/post';
import { Navbar, Home, Page404, Login, SignUp } from './index';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

const Settings = () => <div>Setting</div>;

const PrivateRoute = ({ isLoggedin }) => {
  return isLoggedin ? <Outlet /> : <Navigate replace to="/login" />;
};
class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user.id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts, auth } = this.props;

    console.log('apps me hai ', this.props);
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}

          <Routes>
            <Route index exact path="/" element={<Home posts={posts} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* isme v6 har routes ka to way is new */}
            <Route element={<PrivateRoute isLoggedin={auth.isLoggedin} />}>
              <Route path="/settings" element={<Settings />} />
            </Route>
            {/* isme v6 har routes ka to way is new */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
//hi
export default connect(mapStateToProps)(App);
