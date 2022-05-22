import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { useParams } from 'react-router-dom';

class UserProfile extends Component {
  componentDidMount() {
    if (this.props.UserId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(this.props.UserId));
    }
  }

  render() {
    const { error, success } = this.props.profile;
    console.log("helo",this.props.profile);

    if (error ==null) {
      return <h1>null</h1>;
    }
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">dev</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">ved</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile:state.profile,
    UserId: useParams(),
  };
}
export default connect(mapStateToProps)(UserProfile);
