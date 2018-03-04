/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Menu
 */

import React, { Component } from "react";
import { Link } from "react-router";

import MenuItem from "../components/widgets/MenuItem";
var shallowCompare = require("react-addons-shallow-compare");

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  toggleShowHide() {
    this.setState({ open: !this.state.open });
  }

  render() {
    var classes = "bg-black aside-md hidden-print";
    var navClasses = "nav-primary";
    if (!this.state.open) {
      classes += " nav-xs";
      navClasses += " hidden-xs";
    }

    const { apps, schema, blocks, selectedAppIndex } = this.props;

      return <aside className={classes} id="nav">
          <section className="vbox">
              <header className="header bg-danger brand-header lock-header pos-stat clearfix">
                  <a
                      className="btn btn-link visible-xs"
                      onClick={() => this.toggleShowHide()}
                      data-toggle="class:nav-off-screen,open"
                      data-target="#nav,html"
                  >
                      <i className="fa fa-bars"/>
                  </a>
                  <div className="text-center tophead">
                      <img width="25" src="/dist/images/LOGOWHITE.png"/><br/>
                      <span className="text-center" style={{lineHeight: "21px", fontWeight: "bold"}}>
                Admin
              </span>
                  </div>
              </header>
              <section className="w-f scrollable">
                  <div className="slimScrollDiv">
                      <div
                          className="slim-scroll"
                          data-height="auto"
                          data-disable-fade-out="true"
                          data-distance="0"
                          data-size="5px"
                          data-color="#333333"
                      >
                          <nav className={navClasses}>
                              <ul className="nav">
                                  <MenuItem
                                      link={"/"}
                                      icon="fa-home"
                                      color="bg-danger"
                                      linkText="Dashboard"
                                      currentPage={this.props.currentPage}
                                  />
                                  <MenuItem
                                      link={"/newclient"}
                                      icon="fa-user-plus"
                                      color="bg-success"
                                      linkText="New Client"
                                      currentPage={this.props.currentPage}
                                  />
                                  <MenuItem
                                      link={"/client"}
                                      icon="fa-users"
                                      color="bg-success"
                                      linkText="Existing Client"
                                      currentPage={this.props.currentPage}
                                  />
                                  <MenuItem
                                      link={"/analytics"}
                                      icon="fa-line-chart"
                                      color="bg-success"
                                      linkText="Analytics"
                                      currentPage={this.props.currentPage}
                                  />
                              </ul>
                          </nav>
                      </div>
                      <div className="slimScrollBar scrollBar"/>
                      <div className="slimScrollRail scrollRail"/>
                  </div>
              </section>
          </section>
      </aside>;
  }
}

class SubMenuItem extends Component {
  render() {
    var badge = this.props.badgeText
      ? <b className="badge bg-danger pull-right">{this.props.badgeText}</b>
      : null;
    return (
      <li>
        {" "}<Link to={this.props.link}>
          {" "}<i className="fa fa-angle-right" /> {badge}<span>{this.props.linkText}</span>
          {" "}
        </Link>
        {" "}
      </li>
    );
  }
}
