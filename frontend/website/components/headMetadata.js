import {Component} from "react";

import Head from "next/head";

export default class extends Component {
    render() {
      return (
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="google-site-verification" content="0SQVjTXy2XKkBxYO0-MlaohLaPAIGnOk5PsyPMDguA0" />
          <meta name="msvalidate.01" content="63987749E77CB757DE18F80521B66F0A" />
          <title>{this.props.title}</title>
          <meta name="description" content={this.props.metaDescription} />
        </Head>
      )
    }
}
