import React, { Component } from "react";

export default class extends Component {
    requestLogout = () => {
        window.alert("this functionality is not implemented due to vercel suck!");
    };

    render() {
        return (
            <div className="header-wrapper">
                <div className="header-logo">
                    <a href="/">
                        <span>Admin Dashboard</span>
                    </a>
                </div>
                <div onClick={() => this.requestLogout()} className="header-log-out">
                    <span>Logout</span>
                </div>
            </div>
        );
    }
}
