/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Dashboard
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import Slider from "react-slick";
import Profile from "../components/widgets/Profile";

import { selectApp, logout } from "../actions";

import ReduxOutlet from "../outlets/ReduxOutlet";
import moment from "moment";
import ModalFactory from "../components/modals/factory";

let Factory = ModalFactory.modalFromFactory;

import LineChart from "../components/charts/LineChart";
import EasyPie from "../components/charts/EasyPie";
import ProgressBar from "../components/charts/ProgressBar";

import { I, Panel, Button } from "../components/ui/";
import { Row, Col, Page } from "../components/ui/Layout";

var shallowCompare = require("react-addons-shallow-compare");

class Dashboard extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };
    let carouselData = [
      {
        img:
          "/dist/images/carousel/1.jpg",
        desc: "Coming soon"
      },
      {
        img:
          "/dist/images/carousel/2.jpg",
        desc: "Coming soon"
      },
      {
        img:
          "/dist/images/carousel/3.jpg",
        desc: "Coming soon"
      },
      {
        img:
          "/dist/images/carousel/4.jpg",
        desc: "Enclosed Spaces"
      },
      {
        img:
          "/dist/images/carousel/5.jpg",
        desc: "Enclosed Spaces"
      },
      {
        img:
          "/dist/images/carousel/6.jpg",
        desc: "Enclosed Spaces"
      },
      {
        img:
          "/dist/images/carousel/1.jpg",
        desc: "Coming soon"
      },
      {
        img:
          "/dist/images/carousel/2.jpg",
        desc: "Coming soon"
      },
      {
        img:
          "/dist/images/carousel/3.jpg",
        desc: "Coming soon"
      }
    ];

    const { dispatch } = this.props;
    let i = 0;
    return (
      <Page>
        <Row>
          <Col size={4}>
            <a href="/newclient">
              <Panel classes={"flex"}>
                <div className="flex align-center">
                  <i className="fa fa-user-plus fa-4x text-orangered" />
                  <div>
                    <h2 className="m-n font-bold">New User</h2>
                    <small>Enter Details</small>
                  </div>
                </div>
                <div className="align-center flex">
                  <i className="fa fa-chevron-circle-right fa-4x m-r-none text-orangered" />
                </div>
              </Panel>
            </a>
          </Col>
          <Col size={4}>
            <a href="/client">
              <Panel classes={"flex"}>
                <div className="flex align-center">
                  <i className="fa fa-search fa-4x text-orangered" />
                  <div>
                    <h2 className="m-n font-bold">Existing User</h2>
                    <small>Search by id / email</small>
                  </div>
                </div>
                <div className="flex align-center">
                  <i className="fa fa-chevron-circle-right fa-4x m-r-none text-orangered" />
                </div>
              </Panel>
            </a>
          </Col>

          <Col size={4}>
            <Panel classes={"flex"}>
              <div className="flex gray">
                <i className="fa fa-line-chart fa-4x text-muted" />
                <div>
                  <h2 className="m-n font-bold">Analytics</h2>
                  <small>Coming soon</small>
                </div>
              </div>
              <div className="align-center flex">
                <i className="fa fa-chevron-circle-right fa-4x m-r-none text-muted" />
              </div>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col size={12}>
            <Panel classes={"no-padder"}>
              <div className="col-md-3 summaryItem">
                <h2 className="font-bold"> 3 </h2>
                <p> Clients </p>
              </div>
              <div className="col-md-3 summaryItem">
                <h2 className="font-bold"> 5 </h2>
                <p> VR Scenarios </p>
              </div>
              <div className="col-md-3 summaryItem">
                <h2 className="font-bold"> 3 </h2>
                <p> Clients Treated </p>
              </div>
              <div className="col-md-3 summaryItem">
                <h2 className="font-bold"> 3 </h2>
                <p> Returning Clients </p>
              </div>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col size={12}>
            <Panel classes={("no-padder", "carousel")}>
              <h2 className="font-bold m-n">VR Scenarios</h2>
              <div className="separator" />
              <div
                style={{
                  position: "relative",
                  height: "230px",
                  marginRight: "40px",
                  marginLeft: "40px"
                }}
              >
                <div style={{ position: "absolute", width: "100%" }}>
                  <Slider {...settings}>
                    {carouselData.map((item, index) => {
                      return (
                        <div key={index} className="carouselItem">
                            <div
                              style={{
                                background: `url(${item.img})`,
                                height: "140px",
                                backgroundSize: "cover"
                              }}
                            />
                          <h4>{item.desc}</h4>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </Panel>
          </Col>
        </Row>

        <footer id="footer">
          <div className="bg-dark dker wrapper">
            <div className="container text-center m-t-lg">
              <div className="m-t-xl m-b-xl">
                <h4>Absolute Marmot</h4>
                <p>&copy;Copyright Absolute Marmot 2018-present. All rights reserved.</p>
                <p>
                  <a href="#top" className="btn btn-icon btn-rounded btn-dark b-dark bg-empty m-sm text-muted">
                    <i className="fa fa-angle-up"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.app.token,
    user: state.user,
    app: state.app
  };
}

export default connect(mapStateToProps)(Dashboard);
