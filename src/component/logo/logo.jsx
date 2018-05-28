import React, { Component } from 'react';
import logoSvg from "./logo.svg";
import './logo.scss'
export default class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logoSvg} alt=""/>
      </div>
    )
  }
};
