import React, {Component} from "react";
import Head from "next/head";

import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";

import authUser from "../api/admin-user/auth.js";

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //update sitemap
            updateSitemapLoading: false,
            updateSitemapError: false,
            updateSitemapSuccess: false,
            //restart pm2
            restartPm2Loading: false,
            restartPm2Error: false,
            restartPm2Success: false,
            //send ping to search engines
            pingLoading: false,
            pingError: false,
            pingSuccess: false
        }
    }

    static async getInitialProps({req, res}) {
        let authResult = await authUser(req);

        if(!authResult.success) {
            res.writeHead(302, {Location: "/login"});
            res.end();
        }

        return {}
    }

    updateSitemapRequest = () => {
        this.setState({updateSitemapLoading: true, updateSitemapError: false, updateSitemapSuccess: false});

        // call update sitemap function
    }

    restartPm2Request = () => {
        this.setState({restartPm2Loading: true, restartPm2Error: false, restartPm2Success: false})

        // call restart PM2 function
    }

    pingSearchEnginesRequest = () => {
        this.setState({pingLoading: true, pingError: false, pingSuccess: false})

        // call ping search engines function
    }

    render() {
        return (
          <div className="layout-wrapper">
            <Head>
              <title>Sitemap | Admin</title>
            </Head>
            <Header />
            <Sidebar page="sitemap" />
            <div className="layout-content-container">
              <div className="sitemap-content">
                <div className="sitemap-header">
                  <span>Manage Sitemap</span>
                </div>
                <div className="sitemap-form-container">
                  <div className="sitemap-form-section">
                    <div className="sitemap-form-title">
                      <span>Update Sitemap XML File</span>
                    </div>
                    <div className="sitemap-form-description">
                      <span>This will write new content to the sitemap.xml file hosted by the fronted website.</span>
                    </div>
                    <div className="sitemap-form-btn-container">
                      {
                        !this.state.updateSitemapLoading ?
                          <div onClick={this.updateSitemapRequest} className="sitemap-form-btn">
                            <span>Update Sitemap</span>
                          </div> :
                          <div className="sitemap-form-btn loading">
                            <span>Loading</span>
                          </div>
                      }
                    </div>
                    {
                      this.state.updateSitemapSuccess ?
                        <div className="sitemap-success-msg">
                          <span>Success!</span>
                        </div> : null
                    }
                    {
                      this.state.updateSitemapError ?
                        <div className="sitemap-error-msg">
                          <span>An error occurred.</span>
                        </div> : null
                    }
                  </div>
                  <div className="sitemap-form-section">
                    <div className="sitemap-form-title">
                      <span>Restart Frontend Website PM2 Process</span>
                    </div>
                    <div className="sitemap-form-description">
                      <span>This will make any sitemap updates live in production by restarting the PM2 process.</span>
                    </div>
                    <div className="sitemap-form-btn-container">
                      {
                        !this.state.restartPm2Loading ?
                          <div onClick={this.restartPm2Request} className="sitemap-form-btn">
                            <span>Restart PM2</span>
                          </div> :
                          <div className="sitemap-form-btn loading">
                            <span>Loading</span>
                          </div>
                      }
                    </div>
                    {
                      this.state.restartPm2Success ?
                        <div className="sitemap-success-msg">
                          <span>Success!</span>
                        </div> : null
                    }
                    {
                      this.state.restartPm2Error ?
                        <div className="sitemap-error-msg">
                          <span>An error occurred.</span>
                        </div> : null
                    }
                  </div>
                  <div className="sitemap-form-section">
                    <div className="sitemap-form-title">
                      <span>Ping Search Engines</span>
                    </div>
                    <div className="sitemap-form-description">
                      <span>This will ping Google and Bing to let them know updates to the sitemap have been made.</span>
                    </div>
                    <div className="sitemap-form-btn-container">
                      {
                        !this.state.pingLoading ?
                          <div onClick={this.pingSearchEnginesRequest} className="sitemap-form-btn">
                            <span>Send Ping</span>
                          </div> :
                          <div className="sitemap-form-btn loading">
                            <span>Loading</span>
                          </div>
                      }
                    </div>
                    {
                      this.state.pingSuccess ?
                        <div className="sitemap-success-msg">
                          <span>Success!</span>
                        </div> : null
                    }
                    {
                      this.state.pingError ?
                        <div className="sitemap-error-msg">
                          <span>An error occurred.</span>
                        </div> : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}


