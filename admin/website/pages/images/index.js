import React, { Component } from "react"
import Head from "next/head"

import Header from "../../components/header.js"
import Sidebar from "../../components/sidebar.js"

export default class extends Component {

    render() {
        return (
          <div className="layout-wrapper">
            <Head>
              <title>All Image | Admin</title>
            </Head>

            <Header/>
            <Sidebar page="images"/>

            <div className="layout-content-container">

            {/*
              * IMPORTANT:
            */}
            <h1 className="images-upload-error-msg">THIS PAGE IS CURRENTLY NOT WORKING</h1>

              {
                <div className="images-content">
                  <div className="images-top-header">
                    <div className="images-page-header-label">
                      <span>All Images</span>
                    </div>
                    <div className="images-add-new-btn-container">
                      <a href="/images/upload">
                        <div className="images-add-new-btn">
                          <span>+ Upload</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="images-list-container">
                    <div className="images-list-items-table">
                      <div className="images-list-items-table-header">
                        <div className="images-list-items-table-header-item filename">
                          <span>Filename</span>
                        </div>
                        <div className="images-list-items-table-header-item link">
                          <span>Link</span>
                        </div>
                        <div className="images-list-items-table-header-item edit">
                          <span></span>
                        </div>
                      </div>
                      <div className="images-list-items-table-item">
                        <div className="images-list-items-table-item-data filename">
                          <span>Image Filename</span>
                        </div>
                        <div className="images-list-items-table-item-data link">
                          {
                            process.env.NODE_ENV === "development" ?
                              <a href={`${process.env.DEV_ADMIN_API_URL}/assets/image-filename`}>
                                <span>Link</span>
                              </a> :
                              <a href={`${process.env.PRODUCTION_FRONTEND_API_URL}/assets/image-filename`}>
                                <span>Link</span>
                              </a>
                          }
                        </div>
                        <div className="images-list-items-table-item-data edit">
                          <a href="/images/edit/filename.png">
                            <span>Edit</span>
                          </a>
                          <span> &gt;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        )
    }

}
