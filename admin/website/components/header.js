import React, { Component } from "react";

import logout from "../api/admin-user/logout.js";

export default class extends Component {
    requestLogout = () => {
        logout(function () {
            window.location.href = "/login";
        });
    };

    render() {
        return (
          <div className="header-wrapper">
            <div className="header-logo">
              <a href="/">
                <span>Admin Dashboard</span>
              </a>
            </div>
            <div
              onClick={() => this.requestLogout()}
              className="header-log-out">
              <span>Logout</span>
            </div>
          </div>
        );
    }
}
