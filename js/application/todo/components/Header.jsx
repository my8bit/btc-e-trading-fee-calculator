'use strict';

import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends Component {

  render() {
    return (
      <AppBar
        title="BTC-E | Trading fee calculator"
        showMenuIconButton={false}
        titleStyle={{fontSize: '20px'}}
        />
    );
  }
}

export default Header;
