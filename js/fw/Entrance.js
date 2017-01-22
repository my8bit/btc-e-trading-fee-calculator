/**
 *  Entrance.js launch the application.
 *
 *  @author  my8bit
 *  @date    Jan 21, 2017
 *
 */
import {Splash} from 'splash-screen';
import React from 'react';
import ReactDOM from 'react-dom';
import Application from 'js/application/Application.jsx';

class Entrance {

  destroySplash() {
    Splash.destroy();
    require('splash-screen/dist/splash.min.css').unuse();
    setTimeout(() => {
      if (Splash.isRunning()) {
        this.destroySplash();
      }
    }, 100);
  }

  launch() {
    ReactDOM.render(<Application/>, document.querySelector('#view'));
  }

  run() {
    this.destroySplash();
    this.launch();
  }
}

export default Entrance;
