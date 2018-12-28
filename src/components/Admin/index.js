import React, { Component } from "react";
import { compose } from "recompose";

import { withFirebase } from "../firebase";
import { withAuthorization } from "../session";
import * as ROLES from "../../roles";

class AdminPage extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    this.props.firebase.users().on("value", snapshot => {
      const usersObj = snapshot.val();

      const usersList = Object.keys(usersObj).map(key => ({
        ...usersObj[key],
        uid: key
      }));
      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Admin Page</h2>
        {loading && <div>Loaing ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID: </strong>
            {user.uid}
          </span>
          <span>
            <strong>Email: </strong>
            {user.email}
          </span>
          <span>
            <strong>Name: </strong>
            {user.firstName} {user.lastName}
          </span>
        </li>
      ))}
    </ul>
  );
};

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminPage);
