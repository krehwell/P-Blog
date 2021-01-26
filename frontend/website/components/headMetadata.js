import {Component} from "react";

import Head from "next/head";

export default class extends Component {

  render() {
    return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.metaDescription} />
      </Head>
    )
  }

}
