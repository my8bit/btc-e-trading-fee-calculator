'use strict';

import React, {Component} from 'react';

class Footer extends Component {

  render() {
    const footerStyle = {
      display: 'block',
      width: '100%',
      backgroundColor: 'red',
      textAlign: 'center',
      marginTop: '15px'
    };
    return (
      <footer style={footerStyle}>
      </footer>
    );
  }
}
// <span>{'\u00A9 2016 Howard.Zuo, All rights reserved.'}</span>
export default Footer;
