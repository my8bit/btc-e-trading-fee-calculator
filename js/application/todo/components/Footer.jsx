'use strict';

import React, {Component} from 'react';

class Footer extends Component {

  render() {
    const footerStyle = {
      display: 'block',
      width: '100%',
      textAlign: 'center',
      marginTop: '15px'
    };
    return (
      <footer style={footerStyle}>
        <span>© 2017 <a href="https://github.com/my8bit">@my8bit</a>, <a href="https://icons8.com/web-app/for/all/bitcoin">Icons8</a></span>
      </footer>
    );
  }
}
export default Footer;
