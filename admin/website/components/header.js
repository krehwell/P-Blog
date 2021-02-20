import React, { Component } from "react";

export default class extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <div className="header-logo">
          <a href="/">
            <span>Admin Dashboard</span>
          </a>
        </div>
        <div className="header-log-out">
          <span>Logout</span>
        </div>
      </div>
    );
  }
}
